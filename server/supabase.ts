// Supabase Server-Authoritative Database Service

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { CONFIG } from './config';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  if (!supabaseClient) {
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
    // 1. Insert Applicant
    const { data: applicant, error: applicantError } = await client
      .from('applicants')
      .insert({
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
      })
      .select('id')
      .single();

    if (applicantError || !applicant) {
      throw new Error(`Failed to save applicant: ${applicantError?.message || 'Database error'}`);
    }

    // 2. Insert Registration with pending status
    const { data: reg, error: regError } = await client
      .from('registrations')
      .insert({
        registration_code: registrationCode,
        applicant_id: applicant.id,
        track_id: trackData.trackId,
        track_title: trackData.trackTitle,
        processing_fee_inr: trackData.feeInr,
        payment_status: 'pending',
        onboarding_status: 'applied',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (regError || !reg) {
      throw new Error(`Failed to create registration: ${regError?.message || 'Database error'}`);
    }

    return {
      applicantId: applicant.id,
      registrationId: reg.id,
      registrationCode,
    };
  }

  // Fallback local store when Supabase keys are not yet configured in environment
  const store = getLocalStore();
  const applicantId = 'app_' + Math.random().toString(36).substring(2, 10);
  const registrationId = 'reg_' + Math.random().toString(36).substring(2, 10);

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
    const { error } = await client.from('payments').insert({
      registration_id: params.registrationId,
      razorpay_order_id: params.orderId,
      amount_paise: params.amountPaise,
      currency: params.currency,
      status: 'created',
    });
    if (error) {
      console.error('Error inserting initial payment record in Supabase:', error);
    }
    return;
  }

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
}

/**
 * Finds registration and payment details by Razorpay order ID or Registration ID
 */
export async function getRegistrationByOrderOrId(params: {
  orderId?: string;
  registrationId?: string;
}) {
  const client = getSupabaseAdmin();

  if (client) {
    let regQuery = client.from('registrations').select(`
      id,
      registration_code,
      track_id,
      track_title,
      processing_fee_inr,
      payment_status,
      onboarding_status,
      applicant_id,
      applicants (
        id,
        full_name,
        email,
        phone,
        college,
        degree_branch
      )
    `);

    if (params.registrationId) {
      regQuery = regQuery.eq('id', params.registrationId);
      const { data, error } = await regQuery.single();
      if (error || !data) return null;
      return data;
    }

    if (params.orderId) {
      const { data: payment } = await client
        .from('payments')
        .select('registration_id')
        .eq('razorpay_order_id', params.orderId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!payment) return null;

      const { data, error } = await client
        .from('registrations')
        .select(`
          id,
          registration_code,
          track_id,
          track_title,
          processing_fee_inr,
          payment_status,
          onboarding_status,
          applicant_id,
          applicants (
            id,
            full_name,
            email,
            phone,
            college,
            degree_branch
          )
        `)
        .eq('id', payment.registration_id)
        .single();

      if (error || !data) return null;
      return data;
    }
  }

  // Local store fallback
  const store = getLocalStore();
  let reg = null;

  if (params.registrationId) {
    reg = store.registrations.find((r: any) => r.id === params.registrationId);
  } else if (params.orderId) {
    const payment = store.payments.find((p: any) => p.razorpay_order_id === params.orderId);
    if (payment) {
      reg = store.registrations.find((r: any) => r.id === payment.registration_id);
    }
  }

  if (!reg) return null;
  const applicant = store.applicants.find((a: any) => a.id === reg.applicant_id);

  return {
    ...reg,
    applicants: applicant,
  };
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
    // 1. Check current registration status
    const { data: currentReg } = await client
      .from('registrations')
      .select('payment_status')
      .eq('id', params.registrationId)
      .single();

    if (currentReg?.payment_status === 'paid') {
      // Already verified, return early (idempotent)
      return { alreadyVerified: true };
    }

    // 2. Update registration status to 'paid'
    await client
      .from('registrations')
      .update({
        payment_status: 'paid',
        updated_at: now,
      })
      .eq('id', params.registrationId);

    // 3. Insert or update payment record
    await client.from('payments').upsert(
      {
        registration_id: params.registrationId,
        razorpay_order_id: params.orderId,
        razorpay_payment_id: params.paymentId,
        razorpay_signature: params.signature || null,
        amount_paise: params.amountPaise,
        currency: params.currency,
        status: 'verified',
        verified_at: now,
        webhook_event_id: params.webhookEventId || null,
        raw_payload: params.rawPayload || {},
        updated_at: now,
      },
      { onConflict: 'razorpay_payment_id' }
    );

    return { alreadyVerified: false };
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
      registration_code,
      track_id,
      track_title,
      processing_fee_inr,
      payment_status,
      onboarding_status,
      created_at,
      applicants (
        id,
        full_name,
        email,
        phone,
        college,
        degree_branch,
        academic_year,
        grad_year,
        linkedin_url,
        github_url,
        portfolio_url
      ),
      payments (
        id,
        razorpay_order_id,
        razorpay_payment_id,
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

    const { data, count, error } = await query;
    if (error) {
      throw new Error(`Admin query error: ${error.message}`);
    }

    // Calculate metrics
    const { data: allRegs } = await client
      .from('registrations')
      .select('payment_status, processing_fee_inr');

    const total = allRegs?.length || 0;
    const paid = allRegs?.filter((r) => r.payment_status === 'paid').length || 0;
    const pending = allRegs?.filter((r) => r.payment_status === 'pending').length || 0;
    const failed = allRegs?.filter((r) => r.payment_status === 'failed').length || 0;
    const grossCollectionsInr = paid * 199;

    return {
      items: data || [],
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
    const { error } = await client
      .from('registrations')
      .update({ onboarding_status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', registrationId);
    if (error) throw new Error(error.message);
    return;
  }

  const store = getLocalStore();
  const reg = store.registrations.find((r: any) => r.id === registrationId);
  if (reg) {
    reg.onboarding_status = newStatus;
    reg.updated_at = new Date().toISOString();
    saveLocalStore(store);
  }
}
