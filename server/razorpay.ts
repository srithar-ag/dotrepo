// Razorpay Integration and Cryptographic Signature Verification

import Razorpay from 'razorpay';
import crypto from 'crypto';
import { CONFIG } from './config.ts';

let razorpayInstance: Razorpay | null = null;

export function getRazorpayClient(): Razorpay | null {
  if (!CONFIG.RAZORPAY_KEY_ID || !CONFIG.RAZORPAY_KEY_SECRET) {
    return null;
  }
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: CONFIG.RAZORPAY_KEY_ID,
      key_secret: CONFIG.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
}

/**
 * Creates an authoritative Razorpay order for the fixed 199 INR registration fee.
 */
export async function createRazorpayOrder(params: {
  receipt: string;
  notes?: Record<string, string>;
}): Promise<{
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}> {
  const client = getRazorpayClient();
  if (!client) {
    throw new Error(
      'Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are not configured on the server.'
    );
  }

  // Authoritative fixed amount: 19900 paise = 199 INR
  const orderOptions = {
    amount: CONFIG.REGISTRATION_FEE_PAISE,
    currency: CONFIG.CURRENCY,
    receipt: params.receipt,
    notes: {
      ...params.notes,
      purpose: 'DotRepo Official Internship Registration Fee',
      platform: 'dotrepo.com',
    },
  };

  const order = await client.orders.create(orderOptions);
  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    receipt: order.receipt as string,
  };
}

/**
 * Cryptographically verifies Razorpay Checkout payment signature using HMAC SHA256.
 * Formula: HMAC_SHA256(order_id + "|" + payment_id, secret) === signature
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!CONFIG.RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured on the server.');
  }

  const { orderId, paymentId, signature } = params;
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac('sha256', CONFIG.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  } catch {
    return false;
  }
}

/**
 * Cryptographically verifies Razorpay Webhook signature using HMAC SHA256 against raw payload.
 */
export function verifyWebhookSignature(params: {
  rawBody: string | Buffer;
  signature: string;
}): boolean {
  if (!CONFIG.RAZORPAY_WEBHOOK_SECRET) {
    throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured on the server.');
  }

  const { rawBody, signature } = params;
  if (!rawBody || !signature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac('sha256', CONFIG.RAZORPAY_WEBHOOK_SECRET)
    .update(typeof rawBody === 'string' ? rawBody : rawBody.toString('utf-8'))
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, 'utf-8'),
      Buffer.from(signature, 'utf-8')
    );
  } catch {
    return false;
  }
}
