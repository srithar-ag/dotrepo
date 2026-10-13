// Server Configuration & Environment Variables

export const CONFIG = {
  // Fixed registration fee authoritative amounts
  REGISTRATION_FEE_INR: 199,
  REGISTRATION_FEE_PAISE: 19900,
  CURRENCY: 'INR',

  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '',

  // Razorpay
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || '',

  // Resend Email
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'DotRepo Internships <admissions@dotrepo.com>',

  // App & Admin
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  ADMIN_EMAILS: (process.env.ADMIN_EMAILS || 'sritharag17@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};
