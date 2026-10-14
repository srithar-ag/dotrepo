// DotRepo Internship Registration & Razorpay Integration Automated Test Suite

import { validateRegisterInput } from '../server/validation';
import { SERVER_TRACKS, getTrack } from '../server/tracks';
import { CONFIG } from '../server/config';
import crypto from 'crypto';
import { verifyPaymentSignature, verifyWebhookSignature } from '../server/razorpay';
import {
  createApplicantAndRegistration,
  recordInitialPayment,
  getRegistrationByOrderOrId,
  markPaymentVerified,
  getAdminRegistrations,
} from '../server/supabase';
import { verifyAdminRequest } from '../server/adminAuth';

async function runTests() {
  console.log('â–¶ï¸ STARTING TEST SUITE: DotRepo Internship & Razorpay Integration\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  âœ… PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  âŒ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. Authoritative Pricing Enforcement
  assert(
    CONFIG.REGISTRATION_FEE_INR === 199,
    'Fixed registration fee is exactly â‚¹199 INR'
  );
  assert(
    CONFIG.REGISTRATION_FEE_PAISE === 19900,
    'Fixed registration fee in paise is exactly 19,900 paise'
  );

  // 2. Official 13 Tracks Verification
  const trackCount = Object.keys(SERVER_TRACKS).length;
  assert(
    trackCount === 13,
    `Trusted server-side registry contains exactly 13 tracks (Found: ${trackCount})`
  );
  assert(
    getTrack('frontend-intern') !== null,
    'Recognizes valid track "frontend-intern"'
  );
  assert(
    getTrack('sde-intern') !== null,
    'Recognizes valid track "sde-intern"'
  );
  assert(
    getTrack('gen-ai-intern') !== null,
    'Recognizes valid track "gen-ai-intern"'
  );
  assert(
    getTrack('fake-track-999') === null,
    'Strictly rejects invalid track "fake-track-999"'
  );

  // 3. Form Validation Tests
  const validForm = {
    fullName: 'Allen Julles',
    email: 'allen@dotrepo.com',
    phone: '+91 9876543210',
    college: 'Indian Institute of Technology',
    degreeBranch: 'B.Tech Computer Science',
    academicYear: '3rd Year',
    gradYear: 2026,
    trackId: 'frontend-intern',
    linkedinUrl: 'https://linkedin.com/in/allenjulles',
    githubUrl: 'https://github.com/allenjulles',
    portfolioUrl: 'https://allen.dev',
    consentGiven: true,
  };

  const validResult = validateRegisterInput(validForm);
  assert(
    validResult.isValid === true,
    'Valid registration payload passes validation'
  );

  const missingConsent = validateRegisterInput({ ...validForm, consentGiven: false });
  assert(
    missingConsent.isValid === false && Boolean(missingConsent.errors.consentGiven),
    'Rejects submission without mandatory terms and pricing consent'
  );

  const invalidEmail = validateRegisterInput({ ...validForm, email: 'not-an-email' });
  assert(
    invalidEmail.isValid === false && Boolean(invalidEmail.errors.email),
    'Rejects malformed email address'
  );

  const invalidPhone = validateRegisterInput({ ...validForm, phone: '123' });
  assert(
    invalidPhone.isValid === false && Boolean(invalidPhone.errors.phone),
    'Rejects incomplete phone number'
  );

  const invalidTrack = validateRegisterInput({ ...validForm, trackId: 'non-existent-track' });
  assert(
    invalidTrack.isValid === false && Boolean(invalidTrack.errors.trackId),
    'Rejects submission with unverified track ID'
  );

  // 4. Registration Creation & DB Persistence Test
  const testReg = await createApplicantAndRegistration(
    {
      fullName: 'Allen Julles Test',
      email: 'allen.test@dotrepo.com',
      phone: '+91 9988776655',
      college: 'Tech University',
      degreeBranch: 'Information Technology',
      academicYear: '3rd Year',
      gradYear: 2026,
      consentGiven: true,
    },
    {
      trackId: 'frontend-intern',
      trackTitle: 'Frontend Intern',
      feeInr: 199,
    }
  );

  assert(
    Boolean(testReg.registrationId) && Boolean(testReg.registrationCode),
    `Generated unique registration ID (${testReg.registrationCode})`
  );

  const testOrderId = 'order_test_' + Math.random().toString(36).substring(2, 10);
  await recordInitialPayment({
    registrationId: testReg.registrationId,
    orderId: testOrderId,
    amountPaise: 19900,
    currency: 'INR',
  });

  const retrieved = await getRegistrationByOrderOrId({ orderId: testOrderId });
  assert(
    retrieved !== null && retrieved.id === testReg.registrationId,
    'Associated Razorpay Order ID matches registration record in database'
  );

  // 5. Cryptographic Signature Verification Logic
  const dummySecret = 'test_secret_key_12345';
  process.env.RAZORPAY_KEY_SECRET = dummySecret;
  CONFIG.RAZORPAY_KEY_SECRET = dummySecret;

  const sampleOrderId = 'order_ABC123';
  const samplePaymentId = 'pay_XYZ789';
  const validSignature = crypto
    .createHmac('sha256', dummySecret)
    .update(`${sampleOrderId}|${samplePaymentId}`)
    .digest('hex');

  const sigCheckValid = verifyPaymentSignature({
    orderId: sampleOrderId,
    paymentId: samplePaymentId,
    signature: validSignature,
  });
  assert(
    sigCheckValid === true,
    'Cryptographically verifies valid Razorpay HMAC SHA256 payment signature'
  );

  const sigCheckInvalid = verifyPaymentSignature({
    orderId: sampleOrderId,
    paymentId: samplePaymentId,
    signature: 'tampered_or_invalid_signature',
  });
  assert(
    sigCheckInvalid === false,
    'Rejects forged or invalid payment signature'
  );

  // 6. Webhook Signature Verification Logic
  const webhookSecret = 'wh_secret_998877';
  process.env.RAZORPAY_WEBHOOK_SECRET = webhookSecret;
  CONFIG.RAZORPAY_WEBHOOK_SECRET = webhookSecret;

  const rawWebhookBody = JSON.stringify({
    event: 'payment.captured',
    payload: { payment: { entity: { id: 'pay_123', amount: 19900 } } },
  });
  const validWebhookSig = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawWebhookBody)
    .digest('hex');

  const whCheckValid = verifyWebhookSignature({
    rawBody: rawWebhookBody,
    signature: validWebhookSig,
  });
  assert(
    whCheckValid === true,
    'Cryptographically verifies valid Razorpay raw webhook signature'
  );

  const whCheckInvalid = verifyWebhookSignature({
    rawBody: rawWebhookBody,
    signature: 'bad_signature_hash',
  });
  assert(
    whCheckInvalid === false,
    'Rejects webhook with invalid signature'
  );

  // 7. Authoritative Payment Verification & Idempotency
  const payResult1 = await markPaymentVerified({
    registrationId: testReg.registrationId,
    orderId: testOrderId,
    paymentId: 'pay_verified_123',
    signature: validSignature,
    amountPaise: 19900,
    currency: 'INR',
  });
  assert(
    payResult1.alreadyVerified === false,
    'Marks registration as verified/paid on first verification'
  );

  const payResult2 = await markPaymentVerified({
    registrationId: testReg.registrationId,
    orderId: testOrderId,
    paymentId: 'pay_verified_123',
    signature: validSignature,
    amountPaise: 19900,
    currency: 'INR',
  });
  assert(
    payResult2.alreadyVerified === true,
    'Verification is idempotent (does not double-charge or create conflicting states on duplicate callback)'
  );

  // 8. Admin Authorization Security
  const unauthCheck = await verifyAdminRequest('Bearer invalid-random-token');
  assert(
    unauthCheck.isAuthorized === false,
    'Blocks unauthorized access to administrator endpoints'
  );

  const authCheck = await verifyAdminRequest('Bearer admin-authorized-demo');
  assert(
    authCheck.isAuthorized === true,
    'Permits authorized administrator access'
  );

  // 9. Admin Data & Metrics Query
  const adminData = await getAdminRegistrations({});
  assert(
    Array.isArray(adminData.items) && adminData.items.length > 0,
    'Admin dashboard successfully retrieves registration records'
  );
  // 10. Multi-tier & Auto-recovery Lookup Resiliency
  const orderLookup = await getRegistrationByOrderOrId({
    orderId: testOrderId,
    registrationId: 'non-uuid-temp-id',
  });
  assert(
    orderLookup !== null && orderLookup.id === testReg.registrationId,
    'Resilient lookup locates registration by order ID even if client passes non-UUID registration ID'
  );

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
