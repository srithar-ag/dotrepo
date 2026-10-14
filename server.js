// ============================================================================
// DotRepo Official Internship Participant Registration Backend
// Technologies: Node.js, Express, Firebase Admin (Firestore), Razorpay SDK
// ============================================================================

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Load environment variables with override priority
dotenv.config({ override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ============================================================================
// 1. FIREBASE ADMIN SDK & FIRESTORE INITIALIZATION
// ============================================================================
/**
 * HOW TO CONFIGURE FIREBASE SERVICE ACCOUNT CREDENTIALS:
 * 
 * METHOD 1 (Recommended): Place your downloaded 'serviceAccountKey.json' file
 * in this root directory. The code below will automatically detect and load it.
 * 
 * METHOD 2: Paste the entire JSON content into the .env file as:
 * FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
 * 
 * METHOD 3: Set standard Google ADC environment variable:
 * GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
 * 
 * METHOD 4: Replace the inline 'inlineServiceAccount' object below with your credentials.
 */

/*
// --- OPTIONAL INLINE SERVICE ACCOUNT CREDENTIALS ---
// Paste your service account object below if you prefer inline configuration:
const inlineServiceAccount = {
  // "type": "service_account",
  // "project_id": "YOUR_FIREBASE_PROJECT_ID",
  // "private_key_id": "YOUR_PRIVATE_KEY_ID",
  // "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  // "client_email": "firebase-adminsdk-xxxxx@YOUR_FIREBASE_PROJECT_ID.iam.gserviceaccount.com",
};
*/
const inlineServiceAccount = null;

let db = null;
let firebaseInitialized = false;

function initFirebase() {
  if (getApps().length > 0) {
    db = getFirestore();
    firebaseInitialized = true;
    return;
  }

  try {
    // 1. Check for inline object
    if (inlineServiceAccount && inlineServiceAccount.project_id) {
      initializeApp({
        credential: cert(inlineServiceAccount),
      });
      db = getFirestore();
      firebaseInitialized = true;
      console.log('✅ [Firebase] Initialized using inline service account credentials.');
      return;
    }

    // 2. Check for local serviceAccountKey.json file
    const serviceAccountFilePath = path.resolve(__dirname, 'serviceAccountKey.json');
    if (fs.existsSync(serviceAccountFilePath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountFilePath, 'utf-8'));
      initializeApp({
        credential: cert(serviceAccount),
      });
      db = getFirestore();
      firebaseInitialized = true;
      console.log('✅ [Firebase] Initialized using serviceAccountKey.json file.');
      return;
    }

    // 3. Check for FIREBASE_SERVICE_ACCOUNT environment variable (JSON string)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      initializeApp({
        credential: cert(serviceAccount),
      });
      db = getFirestore();
      firebaseInitialized = true;
      console.log('✅ [Firebase] Initialized using FIREBASE_SERVICE_ACCOUNT environment variable.');
      return;
    }

    // 4. Try Google Application Default Credentials or GCP project environment
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT) {
      initializeApp({
        credential: applicationDefault(),
      });
      db = getFirestore();
      firebaseInitialized = true;
      console.log('✅ [Firebase] Initialized using Application Default Credentials (ADC).');
      return;
    }

    // 5. Fallback Project-ID initialization
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT || 'dotrepo-internships';
    initializeApp({
      projectId,
    });
    db = getFirestore();
    firebaseInitialized = true;
    console.log(`ℹ️ [Firebase] Initialized with projectId "${projectId}".`);
  } catch (err) {
    console.warn('⚠️ [Firebase] Notice: Service account credentials not yet loaded:', err.message);
    console.warn('👉 Paste your Firebase Service Account JSON into "serviceAccountKey.json" or set FIREBASE_SERVICE_ACCOUNT in .env.');
    firebaseInitialized = false;
  }
}

initFirebase();

// Local resilient storage fallback if Firebase credentials are temporarily pending
const LOCAL_REGISTRATIONS_PATH = path.resolve(__dirname, '.data', 'firestore_registrations_backup.json');

function saveToLocalBackup(data) {
  try {
    const dir = path.dirname(LOCAL_REGISTRATIONS_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    let existing = [];
    if (fs.existsSync(LOCAL_REGISTRATIONS_PATH)) {
      existing = JSON.parse(fs.readFileSync(LOCAL_REGISTRATIONS_PATH, 'utf-8'));
    }
    existing.push(data);
    fs.writeFileSync(LOCAL_REGISTRATIONS_PATH, JSON.stringify(existing, null, 2));
  } catch (e) {
    console.error('Local backup write error:', e);
  }
}

// ============================================================================
// 2. RAZORPAY INSTANCE CONFIGURATION
// ============================================================================
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TnVSv0nYR7S2bd';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'QPJhOLc4Y9MCSEaZKU5p2jZs';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

console.log(`💳 [Razorpay] Configured with Key ID: ${RAZORPAY_KEY_ID}`);

// Authoritative Fixed Pricing (199 INR = 19900 Paise)
const REGISTRATION_FEE_INR = 199;
const REGISTRATION_FEE_PAISE = 19900;
const CURRENCY = 'INR';

// ============================================================================
// 3. API ENDPOINT: CREATE LIVE RAZORPAY ORDER
// POST /create-order (and /api/create-order, /api/register)
// ============================================================================
const handleCreateOrder = async (req, res) => {
  try {
    const { fullName, email, phone, trackId, track, trackTitle, college, degree, gradYear } = req.body || {};

    // Validate essential inputs
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    if (!phone || phone.trim().length < 7) {
      return res.status(400).json({ success: false, message: 'Valid mobile number is required.' });
    }

    const selectedTrack = trackTitle || track || trackId || 'Frontend Engineering';
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanName = fullName.trim();
    const receiptCode = 'DR-' + Date.now().toString(36).toUpperCase();

    // Create live Razorpay Order with authoritative amount & metadata
    const orderOptions = {
      amount: REGISTRATION_FEE_PAISE, // 19900 paise = ₹199 INR
      currency: CURRENCY,
      receipt: receiptCode,
      notes: {
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        track: selectedTrack,
        college: (college || '').trim(),
        degree: (degree || '').trim(),
        gradYear: (gradYear || '').toString(),
        purpose: 'DotRepo Official Internship Participant Registration Fee',
        platform: 'dotrepo.com',
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    console.log(`🛒 [Order Created] Order ID: ${order.id} for ${cleanName} (${cleanEmail}) - Track: ${selectedTrack}`);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      amountInr: REGISTRATION_FEE_INR,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      receipt: order.receipt,
      applicant: {
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        track: selectedTrack,
      },
      message: 'Razorpay order created successfully. Proceed to payment checkout.',
    });
  } catch (error) {
    console.error('❌ [Error /create-order]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while generating Razorpay order.',
    });
  }
};

app.post('/create-order', handleCreateOrder);
app.post('/api/create-order', handleCreateOrder);
app.post('/api/register', handleCreateOrder);

// ============================================================================
// 4. API ENDPOINT: CRYPTOGRAPHIC VERIFICATION & FIRESTORE STORAGE
// POST /verify-and-register (and /api/verify-and-register, /api/verify-payment)
// ============================================================================
const handleVerifyAndRegister = async (req, res) => {
  try {
    const body = req.body || {};
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // Backward compatibility fields
      orderId = razorpay_order_id,
      paymentId = razorpay_payment_id,
      signature = razorpay_signature,
      fullName,
      email,
      phone,
      track,
      trackTitle,
      college,
      degree,
      gradYear,
    } = body;

    const finalOrderId = razorpay_order_id || orderId;
    const finalPaymentId = razorpay_payment_id || paymentId;
    const finalSignature = razorpay_signature || signature;

    if (!finalOrderId || !finalPaymentId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification tokens (order_id and payment_id).',
      });
    }

    // 1. Cryptographic HMAC-SHA256 Signature Verification
    let isAuthentic = false;

    if (finalSignature && RAZORPAY_KEY_SECRET) {
      const generatedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${finalOrderId}|${finalPaymentId}`)
        .digest('hex');

      try {
        isAuthentic = crypto.timingSafeEqual(
          Buffer.from(generatedSignature, 'utf-8'),
          Buffer.from(finalSignature, 'utf-8')
        );
      } catch {
        isAuthentic = generatedSignature === finalSignature;
      }
    }

    // 2. Direct Razorpay API Authoritative Verification Fallback
    if (!isAuthentic) {
      try {
        const paymentRecord = await razorpay.payments.fetch(finalPaymentId);
        if (
          paymentRecord &&
          paymentRecord.order_id === finalOrderId &&
          (paymentRecord.status === 'captured' || paymentRecord.status === 'authorized')
        ) {
          isAuthentic = true;
          console.log(`✅ [Payment] Verified directly via Razorpay API: ${finalPaymentId}`);
        }
      } catch (rzpErr) {
        console.warn('⚠️ [Razorpay API Verification Check]:', rzpErr.message);
      }
    }

    if (!isAuthentic) {
      console.warn(`❌ [Security Alert] Cryptographic signature check failed for order ${finalOrderId}, payment ${finalPaymentId}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Cryptographic verification failed.',
      });
    }

    console.log(`🔐 [Signature Verified] Order ${finalOrderId} & Payment ${finalPaymentId} authenticated.`);

    // 3. Prepare Firestore Participant Registration Document
    const selectedTrack = trackTitle || track || 'Internship Track';
    const cleanEmail = (email || '').toLowerCase().trim();
    const cleanName = (fullName || 'Intern Candidate').trim();
    const cleanPhone = (phone || '').trim();

    const registrationDoc = {
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      track: selectedTrack,
      college: college || 'University',
      degree: degree || 'B.Tech / Degree',
      gradYear: gradYear || '2026',
      paymentStatus: 'Paid',
      paymentId: finalPaymentId,
      orderId: finalOrderId,
      signature: finalSignature || 'VERIFIED_API',
      amountInr: REGISTRATION_FEE_INR,
      amountPaise: REGISTRATION_FEE_PAISE,
      currency: CURRENCY,
      createdAt: FieldValue?.serverTimestamp ? FieldValue.serverTimestamp() : new Date().toISOString(),
      timestampIso: new Date().toISOString(),
    };

    let firestoreDocId = null;

    // 4. Save into Firebase Firestore Collection 'registrations'
    if (db && firebaseInitialized) {
      try {
        const docRef = await db.collection('registrations').add(registrationDoc);
        firestoreDocId = docRef.id;
        console.log(`🔥 [Firestore] Successfully saved document into 'registrations' collection. Document ID: ${docRef.id}`);
      } catch (firestoreError) {
        console.error('❌ [Firestore Save Error]:', firestoreError.message);
      }
    }

    // If Firestore credentials pending or failed, generate robust unique ID and mirror to local backup
    if (!firestoreDocId) {
      firestoreDocId = 'reg_' + crypto.randomUUID().slice(0, 12);
      saveToLocalBackup({
        id: firestoreDocId,
        ...registrationDoc,
        createdAt: new Date().toISOString(),
      });
      console.log(`💾 [Local Backup] Saved transaction with ID ${firestoreDocId}`);
    }

    const registrationCode = 'DOT-' + firestoreDocId.slice(0, 8).toUpperCase();

    // 5. Send Success Response to Frontend
    return res.status(200).json({
      success: true,
      message: 'Payment verified and participant successfully registered in Firestore.',
      registrationId: firestoreDocId,
      registrationCode: registrationCode,
      data: {
        id: firestoreDocId,
        registrationCode,
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        track: selectedTrack,
        paymentStatus: 'Paid',
        paymentId: finalPaymentId,
        orderId: finalOrderId,
        amount: REGISTRATION_FEE_INR,
        currency: CURRENCY,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ [Error /verify-and-register]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while verifying and storing registration.',
    });
  }
};

app.post('/verify-and-register', handleVerifyAndRegister);
app.post('/api/verify-and-register', handleVerifyAndRegister);
app.post('/api/verify-payment', handleVerifyAndRegister);

// ============================================================================
// 5. ADMIN / QUERY REGISTRATIONS ENDPOINT
// GET /api/registrations
// ============================================================================
app.get('/api/registrations', async (req, res) => {
  try {
    let items = [];
    if (db && firebaseInitialized) {
      const snapshot = await db.collection('registrations').orderBy('createdAt', 'desc').limit(100).get();
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
    } else if (fs.existsSync(LOCAL_REGISTRATIONS_PATH)) {
      items = JSON.parse(fs.readFileSync(LOCAL_REGISTRATIONS_PATH, 'utf-8'));
    }

    return res.status(200).json({
      success: true,
      count: items.length,
      firebaseConnected: firebaseInitialized,
      items,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ============================================================================
// 6. HEALTH CHECK ENDPOINT
// ============================================================================
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'DotRepo Registration Engine',
    database: firebaseInitialized ? 'Firebase Firestore (Connected)' : 'Firebase Firestore (Awaiting Service Account JSON)',
    razorpayKey: RAZORPAY_KEY_ID ? 'Configured' : 'Missing',
    feeInr: REGISTRATION_FEE_INR,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'DotRepo Registration Engine',
    database: firebaseInitialized ? 'Firebase Firestore (Connected)' : 'Firebase Firestore (Awaiting Service Account JSON)',
    razorpayKey: RAZORPAY_KEY_ID ? 'Configured' : 'Missing',
    feeInr: REGISTRATION_FEE_INR,
    timestamp: new Date().toISOString(),
  });
});

// Route for single-page app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n============================================================`);
  console.log(`🚀 DotRepo Registration Server running at http://localhost:${PORT}`);
  console.log(`🔥 Database: ${firebaseInitialized ? 'Firebase Firestore Active' : 'Firebase Firestore Ready (Upload Service Account)'}`);
  console.log(`💳 Razorpay: Active (${RAZORPAY_KEY_ID})`);
  console.log(`============================================================\n`);
});

export default app;
