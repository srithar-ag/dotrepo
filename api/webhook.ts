// API: POST /api/webhook
// Authoritative Razorpay Webhook processor with raw signature verification

import { verifyWebhookSignature } from '../server/razorpay.ts';
import { getRegistrationByOrderOrId, markPaymentVerified } from '../server/supabase.ts';
import { sendPaymentVerifiedEmail } from '../server/email.ts';
import { CONFIG } from '../server/config.ts';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const signature = req.headers['x-razorpay-signature'] as string;

  // Obtain raw body
  let rawBody = '';
  if (typeof req.body === 'string') {
    rawBody = req.body;
  } else if (Buffer.isBuffer(req.body)) {
    rawBody = req.body.toString('utf-8');
  } else if (req.rawBody) {
    rawBody = req.rawBody;
  } else {
    rawBody = JSON.stringify(req.body);
  }

  // Cryptographic Signature Verification
  if (CONFIG.RAZORPAY_WEBHOOK_SECRET) {
    if (!signature) {
      return res.status(400).json({ success: false, message: 'Missing x-razorpay-signature header' });
    }

    const isValid = verifyWebhookSignature({ rawBody, signature });
    if (!isValid) {
      console.warn('[Webhook] Invalid Razorpay webhook signature');
      return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
    }
  }

  try {
    const payload = typeof req.body === 'object' && !Buffer.isBuffer(req.body)
      ? req.body
      : JSON.parse(rawBody);

    const event = payload.event;
    console.info(`[Webhook Received] Event: ${event}, Event ID: ${payload.id || 'N/A'}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;

      const orderId = paymentEntity?.order_id || orderEntity?.id;
      const paymentId = paymentEntity?.id || ('pay_wh_' + payload.id);
      const amountPaise = paymentEntity?.amount || CONFIG.REGISTRATION_FEE_PAISE;
      const currency = paymentEntity?.currency || CONFIG.CURRENCY;

      if (!orderId) {
        return res.status(200).json({ success: true, message: 'No order_id in webhook entity' });
      }

      // Check registration
      const reg = await getRegistrationByOrderOrId({ orderId });
      if (reg) {
        const result = await markPaymentVerified({
          registrationId: reg.id,
          orderId,
          paymentId,
          amountPaise,
          currency,
          webhookEventId: payload.id,
          rawPayload: payload,
        });

        if (!result.alreadyVerified && reg.applicants?.email) {
          await sendPaymentVerifiedEmail({
            to: reg.applicants.email,
            applicantName: reg.applicants.full_name || 'Intern',
            registrationCode: reg.registration_code,
            trackTitle: reg.track_title,
            paymentId,
            amount: Math.round(amountPaise / 100),
          });
        }
      }
    }

    return res.status(200).json({ success: true, message: 'Webhook processed successfully' });
  } catch (err: any) {
    console.error('[Webhook Processing Error]:', err);
    return res.status(500).json({ success: false, message: err.message || 'Webhook processing failed' });
  }
}
