// Supabase Server-Authoritative Database Service

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CONFIG } from './config.ts';
import { getTrack } from './tracks.ts';
import { getRazorpayClient } from './razorpay.ts';

export function isValidUuid(id: any): boolean {
  if (typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  if (!supabaseClient) {
    try {
      supabaseClient = createClient(
        CONFIG.SUPABASE_URL,
        CONFIG.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      );
    } catch (err) {
      console.warn('[Supabase] Failed to initialize client, using local store fallback:', err);
      return null;
    }
  }
  return supabaseClient;
}

// Local fallback store for offline development when Supabase keys are pending
const LOCAL_DB_PATH = path.resolve(process.cwd(), '.data', 'internship_store.json');

function getLocalStore() {
  try {
    if (!fs.existsSync(path.dirname(LOCAL_DB_PATH))) {
      fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      fs.writeFileSync(
        LOCAL_DB_PATH,
        JSON.stringify(
          {
            applicants: [],
            registrations: [],
            payments: [],
            communication_logs: [],
          },
          null,
          2
        )
      );
    }
    const content = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading local fallback store:', err);
    return { applicants: [], registrations: [], payments: [], communication_logs: [] };
  }
}

function saveLocalStore(data: any) {
  try {
    if (!fs.existsSync(path.dirname(LOCAL_DB_PATH))) {
      fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving local fallback store:', err);
  }
}

// Generate human-friendly registration code
export function generateRegistrationCode(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `DR-INT-${year}-${randomChars}${randomDigits}`;
}

export interface CreateApplicantParams {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degreeBranch: string;
  academicYear: string;
  gradYear: number;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  consentGiven: boolean;
}

export interface CreateRegistrationParams {
  applicantId: string;
  trackId: string;
  trackTitle: string;
  feeInr: number;
  metadata?: any;
}

/**
 * Persists an applicant and a pending registration record.
 */
export async function createApplicantAndRegistration(
  applicantData: CreateApplicantParams,
  trackData: { trackId: string; trackTitle: string; feeInr: number }
): Promise<{
  applicantId: string;
  registrationId: string;
  registrationCode: string;
}> {
  const client = getSupabaseAdmin();
  const registrationCode = generateRegistrationCode();

  if (client) {
    try {
      // 1. Insert or update Applicant
      let applicantId: string | null = null;
      const { data: applicant, error: applicantError } = await client
        .from('applicants')
        .insert({
          full_name: applicantData.fullName,
          email: applicantData.email,
          mobile: applicantData.phone,
          college: applicantData.college,
          degree: applicantData.degreeBranch,
          graduation_year: applicantData.gradYear,
          linkedin_url: applicantData.linkedinUrl || null,
          github_url: applicantData.githubUrl || null,
          portfolio_url: applicantData.portfolioUrl || null,
        })
        .select('id')
        .single();

      if (applicant && applicant.id) {
        applicantId = applicant.id;
      } else {
        const { data: existing } = await client
          .from('applicants')
          .select('id')
          .eq('email', applicantData.email)
          .single();

        if (existing && existing.id) {
          applicantId = existing.id;
          await client
            .from('applicants')
            .update({
              full_name: applicantData.fullName,
              mobile: applicantData.phone,
              college: applicantData.college,
              degree: applicantData.degreeBranch,
              graduation_year: applicantData.gradYear,
              linkedin_url: applicantData.linkedinUrl || null,
              github_url: applicantData.githubUrl || null,
              portfolio_url: applicantData.portfolioUrl || null,
            })
            .eq('id', applicantId);
        }
      }

      if (applicantId) {
        // 2. Insert Registration with pending status
        const { data: reg, error: regError } = await client
          .from('registrations')
          .insert({
            applicant_id: applicantId,
            track_id: trackData.trackId,
            payment_status: 'pending',
            onboarding_status: 'applied',
          })
          .select('id')
          .single();

        if (reg && reg.id) {
          const generatedCode = `DOT-${reg.id.slice(0, 8).toUpperCase()}`;

          // Keep local store mirrored for offline resilience
          try {
            const store = getLocalStore();
            store.applicants.push({
              id: applicantId,
              full_name: applicantData.fullName,
              email: applicantData.email,
              phone: applicantData.phone,
              college: applicantData.college,
              degree_branch: applicantData.degreeBranch,
              academic_year: applicantData.academicYear,
              grad_year: applicantData.gradYear,
              linkedin_url: applicantData.linkedinUrl || null,
              github_url: applicantData.githubUrl || null,
              portfolio_url: applicantData.portfolioUrl || null,
              consent_given: applicantData.consentGiven,
              consent_timestamp: new Date().toISOString(),
              created_at: new Date().toISOString(),
            });
            store.registrations.push({
              id: reg.id,
              registration_code: generatedCode,
              applicant_id: applicantId,
              track_id: trackData.trackId,
              track_title: trackData.trackTitle,
              processing_fee_inr: trackData.feeInr,
              payment_status: 'pending',
              onboarding_status: 'applied',
              created_at: new Date().toISOString(),
            });
            saveLocalStore(store);
          } catch (_) {}

          return {
            applicantId: applicantId,
            registrationId: reg.id,
            registrationCode: generatedCode,
          };
        }
      }

      console.warn(
        '[Database] Supabase applicant/registration insertion error:',
        applicantError?.message,
        '- Falling back to resilient local database'
      );
    } catch (err: any) {
      console.warn(
        '[Database] Supabase caught exception:',
        err?.message,
        '- Falling back to resilient local database'
      );
    }
  }

  // Fallback local store when Supabase tables/schema cache is reloading or offline
  const store = getLocalStore();
  const applicantId = crypto.randomUUID();
  const registrationId = crypto.randomUUID();

  const newApplicant = {
    id: applicantId,
    full_name: applicantData.fullName,
    email: applicantData.email,
    phone: applicantData.phone,
    college: applicantData.college,
    degree_branch: applicantData.degreeBranch,
    academic_year: applicantData.academicYear,
    grad_year: applicantData.gradYear,
    linkedin_url: applicantData.linkedinUrl || null,
    github_url: applicantData.githubUrl || null,
    portfolio_url: applicantData.portfolioUrl || null,
    consent_given: applicantData.consentGiven,
    consent_timestamp: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  const newRegistration = {
    id: registrationId,
    registration_code: registrationCode,
    applicant_id: applicantId,
    track_id: trackData.trackId,
    track_title: trackData.trackTitle,
    processing_fee_inr: trackData.feeInr,
    payment_status: 'pending',
    onboarding_status: 'applied',
    created_at: new Date().toISOString(),
  };

  store.applicants.push(newApplicant);
  store.registrations.push(newRegistration);
  saveLocalStore(store);

  return {
    applicantId,
    registrationId,
    registrationCode,
  };
}

/**
 * Records an initial payment record associated with a Razorpay Order
 */
export async function recordInitialPayment(params: {
  registrationId: string;
  orderId: string;
  amountPaise: number;
  currency: string;
}) {
  const client = getSupabaseAdmin();

  if (client) {
    try {
      const { error } = await client.from('payments').insert({
        registration_id: params.registrationId,
        provider_order_id: params.orderId,
        amount_paise: params.amountPaise,
        status: 'pending',
      });
      if (error) {
        console.warn('[Database] Supabase initial payment insert warning:', error.message);
      }
    } catch (err: any) {
      console.warn('[Database] Supabase payment exception:', err?.message);
    }
  }

  // Always mirror into local store as well
  try {
    const store = getLocalStore();
    store.payments.push({
      id: 'pay_' + Math.random().toString(36).substring(2, 10),
      registration_id: params.registrationId,
      razorpay_order_id: params.orderId,
      amount_paise: params.amountPaise,
      currency: params.currency,
      status: 'created',
      created_at: new Date().toISOString(),
    });
    saveLocalStore(store);
  } catch (_) {}
}

/**
 * Finds registration and payment details by Razorpay order ID or Registration ID.
 * Robust 3-tier lookup:
 * 1. Authoritative Supabase lookup (with strict UUID validation & order ID linkage)
 * 2. Local resilient store lookup
 * 3. Authoritative Razorpay API Order/Payment lookup & auto-recovery (so no paid user is ever lost)
 */
export async function getRegistrationByOrderOrId(params: {
  orderId?: string;
  registrationId?: string;
}) {
  const client = getSupabaseAdmin();
  const orderId = params.orderId?.trim();
  const regId = params.registrationId?.trim();

  // 1. Supabase Lookup
  if (client) {
    try {
      let targetRegId: string | null = null;

      // Primary: Look up by Razorpay order ID in payments table
      if (orderId) {
        const { data: payment } = await client
          .from('payments')
          .select('registration_id')
          .eq('provider_order_id', orderId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (payment?.registration_id && isValidUuid(payment.registration_id)) {
          targetRegId = payment.registration_id;
        }
      }

      // Secondary: Check if regId is a valid UUID
      if (!targetRegId && regId && isValidUuid(regId)) {
        targetRegId = regId;
      }

      if (targetRegId) {
        const { data: reg, error } = await client
          .from('registrations')
          .select(`
            id,
            track_id,
            payment_status,
            onboarding_status,
            applicant_id,
            created_at,
            applicants (
              id,
              full_name,
              email,
              mobile,
              college,
              degree,
              graduation_year
            )
          `)
          .eq('id', targetRegId)
          .single();

        if (reg && !error) {
          const applicant: any = reg.applicants || {};
          const track = getTrack(reg.track_id);
          return {
            id: reg.id,
            registration_code: `DOT-${reg.id.slice(0, 8).toUpperCase()}`,
            track_id: reg.track_id,
            track_title: track?.title || reg.track_id,
            processing_fee_inr: 199,
            payment_status: reg.payment_status,
            onboarding_status: reg.onboarding_status,
            applicant_id: reg.applicant_id,
            created_at: reg.created_at,
            applicants: {
              id: applicant.id,
              full_name: applicant.full_name,
              email: applicant.email,
              phone: applicant.mobile || '',
              college: applicant.college,
              degree_branch: applicant.degree || '',
              academic_year: '3rd Year',
              grad_year: applicant.graduation_year || 2026,
            },
          };
        }
      }
    } catch (err: any) {
      console.warn('[Database] getRegistrationByOrderOrId Supabase query error:', err?.message);
    }
  }

  // 2. Local Store Lookup
  try {
    const store = getLocalStore();
    let reg: any = null;

    if (orderId) {
      const payment = store.payments.find((p: any) => p.razorpay_order_id === orderId);
      if (payment) {
        reg = store.registrations.find((r: any) => r.id === payment.registration_id);
      }
    }

    if (!reg && regId) {
      reg = store.registrations.find((r: any) => r.id === regId);
    }

    if (reg) {
      const applicant = store.applicants.find((a: any) => a.id === reg.applicant_id);
      return {
        ...reg,
        applicants: applicant,
      };
    }
  } catch (err: any) {
    console.warn('[Database] getRegistrationByOrderOrId local store error:', err?.message);
  }

  // 3. Authoritative Razorpay API Lookup & Auto-Recovery
  // If order was created in Razorpay, auto-reconstruct and persist the registration immediately!
  if (orderId) {
    try {
      const rzp = getRazorpayClient();
      if (rzp) {
        const order = await rzp.orders.fetch(orderId);
        if (order && order.id) {
          const notes: any = order.notes || {};
          const trackId = notes.track_id || 'ai-fluency-intern';
          const track = getTrack(trackId);
          let email = (notes.applicant_email || '').toLowerCase().trim();
          const regCode = notes.registration_code || order.receipt || generateRegistrationCode();

          let applicantPhone = '';
          let applicantFullName = '';
          let paymentStatus = order.status === 'paid' ? 'paid' : 'pending';

          try {
            const payList = await rzp.orders.fetchPayments(orderId);
            if (payList?.items && payList.items.length > 0) {
              const latestPay = payList.items[0];
              if (latestPay.contact) applicantPhone = latestPay.contact;
              if (latestPay.email && !email) email = latestPay.email.toLowerCase().trim();
              if (latestPay.status === 'captured') paymentStatus = 'paid';
            }
          } catch (_) {}

          let applicantId = crypto.randomUUID();
          let registrationId = crypto.randomUUID();

          if (client) {
            try {
              if (email) {
                const { data: existingApp } = await client
                  .from('applicants')
                  .select('id, full_name, mobile, college, degree, graduation_year')
                  .eq('email', email)
                  .single();

                if (existingApp?.id) {
                  applicantId = existingApp.id;
                  applicantFullName = existingApp.full_name || applicantFullName;
                  applicantPhone = existingApp.mobile || applicantPhone;
                }
              }

              if (!applicantFullName) {
                applicantFullName = email ? email.split('@')[0] : 'Applicant';
              }

              if (!applicantId) {
                const { data: newApp } = await client
                  .from('applicants')
                  .insert({
                    id: applicantId,
                    full_name: applicantFullName,
                    email: email || 'applicant@dotrepo.com',
                    mobile: applicantPhone || '+91 9999999999',
                    college: 'Engineering College',
                    degree: 'B.Tech',
                    graduation_year: 2026,
                  })
                  .select('id')
                  .single();
                if (newApp?.id) applicantId = newApp.id;
              }

              const { data: newReg } = await client
                .from('registrations')
                .insert({
                  id: registrationId,
                  applicant_id: applicantId,
                  track_id: track?.id || trackId,
                  payment_status: paymentStatus,
                  onboarding_status: 'applied',
                })
                .select('id')
                .single();

              if (newReg?.id) {
                registrationId = newReg.id;
              }

              await client.from('payments').insert({
                registration_id: registrationId,
                provider_order_id: orderId,
                amount_paise: order.amount || 19900,
                status: paymentStatus,
              });
            } catch (supaErr: any) {
              console.warn('[Database] Auto-recovery Supabase insert error:', supaErr?.message);
            }
          }

          // Mirror in local store
          try {
            const store = getLocalStore();
            store.registrations.push({
              id: registrationId,
              registration_code: regCode,
              applicant_id: applicantId,
              track_id: track?.id || trackId,
              track_title: track?.title || 'Internship',
              processing_fee_inr: 199,
              payment_status: paymentStatus,
              onboarding_status: 'applied',
              created_at: new Date().toISOString(),
            });
            store.payments.push({
              id: 'pay_' + Math.random().toString(36).substring(2, 10),
              registration_id: registrationId,
              razorpay_order_id: orderId,
              amount_paise: order.amount || 19900,
              currency: 'INR',
              status: paymentStatus,
              created_at: new Date().toISOString(),
            });
            saveLocalStore(store);
          } catch (_) {}

          return {
            id: registrationId,
            registration_code: regCode,
            track_id: track?.id || trackId,
            track_title: track?.title || 'Internship Track',
            processing_fee_inr: 199,
            payment_status: paymentStatus,
            onboarding_status: 'applied',
            applicant_id: applicantId,
            created_at: new Date().toISOString(),
            applicants: {
              id: applicantId,
              full_name: applicantFullName || 'Intern',
              email: email,
              phone: applicantPhone,
              college: 'Engineering College',
              degree_branch: 'B.Tech',
              academic_year: '3rd Year',
              grad_year: 2026,
            },
          };
        }
      }
    } catch (rzpErr: any) {
      console.warn('[Database] Auto-recovery Razorpay API error:', rzpErr?.message);
    }
  }

  return null;
}

/**
 * Authoritatively marks a registration and payment as verified/paid.
 * Idempotent: Never downgrades an already paid registration.
 */
export async function markPaymentVerified(params: {
  registrationId: string;
  orderId: string;
  paymentId: string;
  signature?: string;
  amountPaise: number;
  currency: string;
  webhookEventId?: string;
  rawPayload?: any;
}) {
  const client = getSupabaseAdmin();
  const now = new Date().toISOString();

  if (client) {
    try {
      // Find actual registration ID if registrationId is not a UUID
      let regUuid = isValidUuid(params.registrationId) ? params.registrationId : null;

      if (!regUuid && params.orderId) {
        const { data: payRow } = await client
          .from('payments')
          .select('registration_id')
          .eq('provider_order_id', params.orderId)
          .limit(1)
          .single();
        if (payRow?.registration_id && isValidUuid(payRow.registration_id)) {
          regUuid = payRow.registration_id;
        }
      }

      if (regUuid) {
        // 1. Check current registration status
        const { data: currentReg } = await client
          .from('registrations')
          .select('payment_status')
          .eq('id', regUuid)
          .single();

        if (currentReg?.payment_status === 'paid') {
          return { alreadyVerified: true };
        }

        // 2. Update registration status to 'paid'
        await client
          .from('registrations')
          .update({ payment_status: 'paid' })
          .eq('id', regUuid);

        // 3. Update payment record to 'paid' by provider_order_id
        const { data: existingPay } = await client
          .from('payments')
          .select('id')
          .eq('provider_order_id', params.orderId)
          .limit(1)
          .single();

        if (existingPay) {
          await client
            .from('payments')
            .update({
              provider_payment_id: params.paymentId,
              status: 'paid',
              verified_at: now,
            })
            .eq('id', existingPay.id);
        } else {
          await client.from('payments').insert({
            registration_id: regUuid,
            provider_order_id: params.orderId,
            provider_payment_id: params.paymentId,
            amount_paise: params.amountPaise,
            status: 'paid',
            verified_at: now,
          });
        }

        return { alreadyVerified: false };
      }
    } catch (err: any) {
      console.warn('[Database] markPaymentVerified Supabase error:', err?.message);
    }
  }

  // Local fallback
  const store = getLocalStore();
  const reg = store.registrations.find((r: any) => r.id === params.registrationId);
  if (reg) {
    if (reg.payment_status === 'paid') {
      return { alreadyVerified: true };
    }
    reg.payment_status = 'paid';
    reg.updated_at = now;
  }

  const existingPay = store.payments.find(
    (p: any) => p.razorpay_payment_id === params.paymentId || p.razorpay_order_id === params.orderId
  );
  if (existingPay) {
    existingPay.razorpay_payment_id = params.paymentId;
    existingPay.razorpay_signature = params.signature;
    existingPay.status = 'verified';
    existingPay.verified_at = now;
    existingPay.updated_at = now;
  } else {
    store.payments.push({
      id: 'pay_' + Math.random().toString(36).substring(2, 10),
      registration_id: params.registrationId,
      razorpay_order_id: params.orderId,
      razorpay_payment_id: params.paymentId,
      razorpay_signature: params.signature,
      amount_paise: params.amountPaise,
      currency: params.currency,
      status: 'verified',
      verified_at: now,
      created_at: now,
    });
  }
  saveLocalStore(store);

  return { alreadyVerified: false };
}

/**
 * Admin: Fetch registrations with filters, pagination, and KPI counts
 */
export async function getAdminRegistrations(filters: {
  search?: string;
  trackId?: string;
  paymentStatus?: string;
  onboardingStatus?: string;
  limit?: number;
  offset?: number;
}) {
  const client = getSupabaseAdmin();

  if (client) {
    let query = client.from('registrations').select(
      `
      id,
      track_id,
      payment_status,
      onboarding_status,
      created_at,
      applicants (
        id,
        full_name,
        email,
        mobile,
        college,
        degree,
        graduation_year,
        linkedin_url,
        github_url,
        portfolio_url
      ),
      payments (
        id,
        provider_order_id,
        provider_payment_id,
        status,
        amount_paise,
        verified_at
      )
    `,
      { count: 'exact' }
    );

    if (filters.paymentStatus) {
      query = query.eq('payment_status', filters.paymentStatus);
    }
    if (filters.trackId) {
      query = query.eq('track_id', filters.trackId);
    }
    if (filters.onboardingStatus) {
      query = query.eq('onboarding_status', filters.onboardingStatus);
    }

    query = query.order('created_at', { ascending: false });

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    try {
      const { data, count, error } = await query;
      if (error) {
        console.warn(`[Database] Supabase getAdminRegistrations query error: ${error.message} - falling back to local store.`);
      } else {
        const formattedItems = (data || []).map((r: any) => {
          const applicant = r.applicants || {};
          const track = getTrack(r.track_id);
          const paymentList = (r.payments || []).map((p: any) => ({
            id: p.id,
            razorpay_order_id: p.provider_order_id || '',
            razorpay_payment_id: p.provider_payment_id || '',
            status: p.status,
            amount_paise: p.amount_paise || 19900,
            verified_at: p.verified_at,
          }));

          return {
            id: r.id,
            registration_code: `DOT-${r.id.slice(0, 8).toUpperCase()}`,
            track_id: r.track_id,
            track_title: track?.title || r.track_id,
            processing_fee_inr: 199,
            payment_status: r.payment_status,
            onboarding_status: r.onboarding_status,
            created_at: r.created_at,
            applicants: {
              id: applicant.id,
              full_name: applicant.full_name,
              email: applicant.email,
              phone: applicant.mobile || '',
              college: applicant.college,
              degree_branch: applicant.degree || '',
              academic_year: '3rd Year',
              grad_year: applicant.graduation_year || 2026,
              linkedin_url: applicant.linkedin_url,
              github_url: applicant.github_url,
              portfolio_url: applicant.portfolio_url,
            },
            payments: paymentList,
          };
        });

        // Calculate metrics
        const { data: allRegs } = await client
          .from('registrations')
          .select('payment_status');

        const total = allRegs?.length || 0;
        const paid = allRegs?.filter((r) => r.payment_status === 'paid').length || 0;
        const pending = allRegs?.filter((r) => r.payment_status === 'pending').length || 0;
        const failed = allRegs?.filter((r) => r.payment_status === 'failed').length || 0;
        const grossCollectionsInr = paid * 199;

        return {
          items: formattedItems,
          totalCount: count || 0,
          metrics: {
            total,
            paid,
            pending,
            failed,
            grossCollectionsInr,
          },
        };
      }
    } catch (err: any) {
      console.warn('[Database] Exception during Supabase admin query:', err?.message, '- falling back to local store.');
    }
  }

  // Fallback store
  const store = getLocalStore();
  let items = store.registrations.map((reg: any) => {
    const applicant = store.applicants.find((a: any) => a.id === reg.applicant_id);
    const payments = store.payments.filter((p: any) => p.registration_id === reg.id);
    return {
      ...reg,
      applicants: applicant,
      payments,
    };
  });

  if (filters.paymentStatus) {
    items = items.filter((i: any) => i.payment_status === filters.paymentStatus);
  }
  if (filters.trackId) {
    items = items.filter((i: any) => i.track_id === filters.trackId);
  }
  if (filters.onboardingStatus) {
    items = items.filter((i: any) => i.onboarding_status === filters.onboardingStatus);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    items = items.filter(
      (i: any) =>
        i.registration_code?.toLowerCase().includes(s) ||
        i.applicants?.full_name?.toLowerCase().includes(s) ||
        i.applicants?.email?.toLowerCase().includes(s) ||
        i.applicants?.phone?.toLowerCase().includes(s)
    );
  }

  const total = store.registrations.length;
  const paid = store.registrations.filter((r: any) => r.payment_status === 'paid').length;
  const pending = store.registrations.filter((r: any) => r.payment_status === 'pending').length;
  const failed = store.registrations.filter((r: any) => r.payment_status === 'failed').length;

  return {
    items,
    totalCount: items.length,
    metrics: {
      total,
      paid,
      pending,
      failed,
      grossCollectionsInr: paid * 199,
    },
  };
}

/**
 * Admin: Update onboarding status
 */
export async function updateOnboardingStatus(registrationId: string, newStatus: string) {
  const client = getSupabaseAdmin();
  if (client) {
    try {
      const { error } = await client
        .from('registrations')
        .update({ onboarding_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', registrationId);
      if (!error) return;
      console.warn('[Database] Supabase updateOnboardingStatus error:', error.message);
    } catch (err: any) {
      console.warn('[Database] Supabase updateOnboardingStatus exception:', err?.message);
    }
  }

  const store = getLocalStore();
  const reg = store.registrations.find((r: any) => r.id === registrationId);
  if (reg) {
    reg.onboarding_status = newStatus;
    reg.updated_at = new Date().toISOString();
    saveLocalStore(store);
  }
}
