-- DotRepo Internship Registration, Payments & Admin Schema
-- Migration: 20261013000000_internship_registration_schema.sql

-- 1. Create Applicants Table
CREATE TABLE IF NOT EXISTS public.applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  degree_branch TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  grad_year INTEGER NOT NULL,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for searching applicants
CREATE INDEX IF NOT EXISTS idx_applicants_email ON public.applicants (email);
CREATE INDEX IF NOT EXISTS idx_applicants_phone ON public.applicants (phone);

-- 2. Create Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_code TEXT NOT NULL UNIQUE,
  applicant_id UUID NOT NULL REFERENCES public.applicants(id) ON DELETE CASCADE,
  track_id TEXT NOT NULL,
  track_title TEXT NOT NULL,
  processing_fee_inr NUMERIC NOT NULL DEFAULT 199.00,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  onboarding_status TEXT NOT NULL DEFAULT 'applied' CHECK (onboarding_status IN ('applied', 'under_review', 'onboarded', 'completed', 'withdrawn')),
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_code ON public.registrations (registration_code);
CREATE INDEX IF NOT EXISTS idx_registrations_applicant ON public.registrations (applicant_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON public.registrations (payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_track ON public.registrations (track_id);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- 3. Create Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  amount_paise INTEGER NOT NULL DEFAULT 19900,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'verified', 'failed', 'refunded')),
  error_code TEXT,
  error_description TEXT,
  verified_at TIMESTAMPTZ,
  webhook_event_id TEXT UNIQUE,
  raw_payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_registration ON public.payments (registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments (razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON public.payments (razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments (status);

-- 4. Create Communication Logs Table
CREATE TABLE IF NOT EXISTS public.communication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES public.registrations(id) ON DELETE SET NULL,
  channel TEXT NOT NULL DEFAULT 'email',
  message_type TEXT NOT NULL CHECK (message_type IN ('registration_received', 'payment_verified', 'payment_pending', 'onboarding_update', 'admin_alert')),
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  delivery_status TEXT NOT NULL DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'failed', 'skipped')),
  resend_id TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comm_logs_reg ON public.communication_logs (registration_id);
CREATE INDEX IF NOT EXISTS idx_comm_logs_recipient ON public.communication_logs (recipient);

-- 5. Create Admin Allowlist Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'auditor')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial admin email (sritharag17@gmail.com)
INSERT INTO public.admin_users (email, role, is_active)
VALUES ('sritharag17@gmail.com', 'super_admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- 6. Row Level Security (RLS) Configuration
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if authenticated user is active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = auth.jwt()->>'email'
    AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for Applicants
-- Public visitors cannot select applicant records directly.
-- Server-side endpoints use the service role key which bypasses RLS.
CREATE POLICY "Admins have full access to applicants"
  ON public.applicants
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- RLS Policies for Registrations
-- Authenticated admins can view and update all registrations
CREATE POLICY "Admins have full access to registrations"
  ON public.registrations
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- RLS Policies for Payments
CREATE POLICY "Admins have full access to payments"
  ON public.payments
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- RLS Policies for Communication Logs
CREATE POLICY "Admins have full access to communication_logs"
  ON public.communication_logs
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- RLS Policies for Admin Users
CREATE POLICY "Admins can view admin_users list"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());
