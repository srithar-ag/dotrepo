import assert from 'assert';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ override: true });

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function runTests() {
  console.log('\n▶️ STARTING FIREBASE & RAZORPAY BACKEND TEST SUITE\n');
  let passed = 0;
  let failed = 0;

  function record(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Health Endpoint
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    record(res.status === 200 && data.status === 'ok', 'GET /health returns 200 OK');
    record(data.feeInr === 199, 'Fixed fee is authoritative ₹199 INR');
    record(data.database.includes('Firebase'), 'Backend identifies Firebase Firestore database');
  } catch (err) {
    record(false, `Health endpoint reachable: ${err.message}`);
  }

  // 2. Order Creation Endpoint
  let orderData = null;
  try {
    const res = await fetch(`${BASE_URL}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Srithar AG',
        email: 'sritharag17@gmail.com',
        phone: '+91 8248815982',
        track: 'AI Fluency & Applied GenAI',
        college: 'NIT Trichy',
        degree: 'B.Tech',
        gradYear: '2027',
      }),
    });
    orderData = await res.json();
    record(res.status === 200 && orderData.success === true, 'POST /create-order creates live order');
    record(orderData.amount === 19900, 'Order amount in paise is 19900 (₹199 INR)');
    record(orderData.orderId && orderData.orderId.startsWith('order_'), `Valid Razorpay order ID received: ${orderData.orderId}`);
    record(orderData.applicant.fullName === 'Srithar AG', 'Applicant name preserved in order payload');
  } catch (err) {
    record(false, `Order creation error: ${err.message}`);
  }

  // 3. Cryptographic Signature Verification & Firestore Storage
  if (orderData && orderData.orderId) {
    const testOrderId = orderData.orderId;
    const testPaymentId = 'pay_test_' + Date.now().toString(36);
    const secret = process.env.RAZORPAY_KEY_SECRET || 'QPJhOLc4Y9MCSEaZKU5p2jZs';
    const validSignature = crypto.createHmac('sha256', secret).update(`${testOrderId}|${testPaymentId}`).digest('hex');

    try {
      const res = await fetch(`${BASE_URL}/verify-and-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: testOrderId,
          razorpay_payment_id: testPaymentId,
          razorpay_signature: validSignature,
          fullName: 'Srithar AG',
          email: 'sritharag17@gmail.com',
          phone: '+91 8248815982',
          track: 'AI Fluency & Applied GenAI',
          college: 'NIT Trichy',
          degree: 'B.Tech',
        }),
      });
      const data = await res.json();
      record(res.status === 200 && data.success === true, 'POST /verify-and-register verifies valid signature');
      record(data.data && data.data.paymentStatus === 'Paid', 'Participant paymentStatus set to Paid');
      record(Boolean(data.registrationId), `Registration document saved with ID: ${data.registrationId}`);
    } catch (err) {
      record(false, `Valid verification error: ${err.message}`);
    }

    // 4. Forged Signature Rejection
    try {
      const res = await fetch(`${BASE_URL}/verify-and-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: testOrderId,
          razorpay_payment_id: testPaymentId,
          razorpay_signature: 'fake_tampered_signature_1234567890abcdef',
        }),
      });
      const data = await res.json();
      record(res.status === 400 && data.success === false, 'POST /verify-and-register strictly rejects forged signature');
    } catch (err) {
      record(false, `Forged verification error: ${err.message}`);
    }
  }

  // 5. Validation Rejection on Missing Fields
  try {
    const res = await fetch(`${BASE_URL}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    record(res.status === 400 && data.success === false, 'POST /create-order rejects missing name/email/phone');
  } catch (err) {
    record(false, `Missing validation error: ${err.message}`);
  }

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
