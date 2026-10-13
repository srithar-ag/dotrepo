// API: POST /api/register
// Validates applicant info, creates pending registration, and creates Razorpay Order for fixed 199 INR

import { validateRegisterInput } from '../server/validation';
import { getTrack } from '../server/tracks';
import { createApplicantAndRegistration, recordInitialPayment } from '../server/supabase';
import { createRazorpayOrder, getRazorpayClient } from '../server/razorpay';
import { CONFIG } from '../server/config';

export default async function handler(req: any, res: any) {
  // CORS Handling
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Use POST.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // 1. Strict Input Validation
    const validation = validateRegisterInput(body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid registration details',
        errors: validation.errors,
      });
    }

    // 2. Verified Track
    const track = getTrack(body.trackId);
    if (!track) {
      return res.status(400).json({
        success: false,
        message: 'Selected track does not exist.',
      });
    }

    // 3. Create Applicant and Pending Registration in Database
    const { applicantId, registrationId, registrationCode } = await createApplicantAndRegistration(
      {
        fullName: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        college: body.college.trim(),
        degreeBranch: body.degreeBranch.trim(),
        academicYear: body.academicYear.trim(),
        gradYear: Number(body.gradYear),
        linkedinUrl: body.linkedinUrl?.trim(),
        githubUrl: body.githubUrl?.trim(),
        portfolioUrl: body.portfolioUrl?.trim(),
        consentGiven: true,
      },
      {
        trackId: track.id,
        trackTitle: track.title,
        feeInr: CONFIG.REGISTRATION_FEE_INR,
      }
    );

    // 4. Create Razorpay Order (Authoritative Fixed 199 INR = 19900 paise)
    let orderId = '';
    const hasRazorpay = Boolean(getRazorpayClient());

    if (hasRazorpay) {
      const order = await createRazorpayOrder({
        receipt: registrationCode,
        notes: {
          registration_id: registrationId,
          registration_code: registrationCode,
          track_id: track.id,
          applicant_email: body.email.trim().toLowerCase(),
        },
      });
      orderId = order.id;
    } else {
      // In development mode when keys are not yet configured
      orderId = 'order_dev_' + Math.random().toString(36).substring(2, 12);
      console.warn(
        '[Payment] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET missing. Generated development order ID:',
        orderId
      );
    }

    // 5. Record Initial Payment State
    await recordInitialPayment({
      registrationId,
      orderId,
      amountPaise: CONFIG.REGISTRATION_FEE_PAISE,
      currency: CONFIG.CURRENCY,
    });

    return res.status(200).json({
      success: true,
      data: {
        registrationId,
        registrationCode,
        orderId,
        amount: CONFIG.REGISTRATION_FEE_PAISE, // 19900 paise
        amountInr: CONFIG.REGISTRATION_FEE_INR, // 199 INR
        currency: CONFIG.CURRENCY,
        razorpayKeyId: CONFIG.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        applicant: {
          name: body.fullName.trim(),
          email: body.email.trim().toLowerCase(),
          phone: body.phone.trim(),
        },
        track: {
          id: track.id,
          title: track.title,
        },
      },
      message: 'Registration initiated successfully. Proceed to Razorpay checkout.',
    });
  } catch (error: any) {
    console.error('[API /api/register error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while initiating registration',
    });
  }
}
