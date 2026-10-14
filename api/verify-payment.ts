// API: POST /api/verify-payment
// Cryptographically verifies Razorpay payment signature and updates database to paid

import { verifyPaymentSignature, getRazorpayClient } from '../server/razorpay.ts';
import { getRegistrationByOrderOrId, markPaymentVerified } from '../server/supabase.ts';
import { sendPaymentVerifiedEmail } from '../server/email.ts';
import { CONFIG } from '../server/config.ts';

export default async function handler(req: any, res: any) {
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
    const { registrationId, orderId, paymentId, signature } = body;

    if (!registrationId || !orderId || !paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification parameters (registrationId, orderId, paymentId).',
      });
    }

    // 1. Verify Registration Existence
    const registration = await getRegistrationByOrderOrId({ registrationId, orderId });
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration record not found or does not match order ID.',
      });
    }

    // 2. Cryptographic Signature Verification & Razorpay API Confirmation
    if (CONFIG.RAZORPAY_KEY_SECRET) {
      let isValid = false;
      if (signature) {
        isValid = verifyPaymentSignature({
          orderId,
          paymentId,
          signature,
        });
      }

      // If HMAC verification didn't pass, verify directly with Razorpay's authoritative API
      if (!isValid) {
        try {
          const rzp = getRazorpayClient();
          if (rzp) {
            const pay = await rzp.payments.fetch(paymentId);
            if (
              pay &&
              pay.order_id === orderId &&
              (pay.status === 'captured' || pay.status === 'authorized')
            ) {
              isValid = true;
              console.info(`[Payment] Authoritatively verified via Razorpay API for ${paymentId}`);
            }
          }
        } catch (apiErr: any) {
          console.warn('[Payment] Direct Razorpay API verification check error:', apiErr?.message);
        }
      }

      if (!isValid) {
        console.warn(`[Payment Verification Failed] Invalid signature for order ${orderId}, payment ${paymentId}`);
        return res.status(400).json({
          success: false,
          message: 'Invalid payment signature. Verification failed.',
        });
      }
    } else {
      console.warn('[Payment] RAZORPAY_KEY_SECRET not set; running in local sandbox verification mode.');
    }

    // 3. Authoritatively Mark Payment Verified in Database (Idempotent)
    const result = await markPaymentVerified({
      registrationId: registration.id,
      orderId,
      paymentId,
      signature,
      amountPaise: CONFIG.REGISTRATION_FEE_PAISE,
      currency: CONFIG.CURRENCY,
    });

    // 4. Send Confirmation Email if not already verified
    if (!result.alreadyVerified && registration.applicants?.email) {
      await sendPaymentVerifiedEmail({
        to: registration.applicants.email,
        applicantName: registration.applicants.full_name || 'Intern',
        registrationCode: registration.registration_code,
        trackTitle: registration.track_title,
        paymentId,
        amount: CONFIG.REGISTRATION_FEE_INR,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        registrationId: registration.id,
        registrationCode: registration.registration_code,
        trackTitle: registration.track_title,
        paymentStatus: 'paid',
        paymentId,
        orderId,
        amount: CONFIG.REGISTRATION_FEE_INR,
        currency: CONFIG.CURRENCY,
        applicantName: registration.applicants?.full_name,
        applicantEmail: registration.applicants?.email,
      },
      message: 'Payment authoritatively verified and registration confirmed.',
    });
  } catch (error: any) {
    console.error('[API /api/verify-payment error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while verifying payment',
    });
  }
}
