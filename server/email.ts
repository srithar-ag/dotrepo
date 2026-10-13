// Resend Email Integration with DotRepo Branding

import { Resend } from 'resend';
import { CONFIG } from './config.ts';

let resendInstance: Resend | null = null;

function getResendClient(): Resend | null {
  if (!CONFIG.RESEND_API_KEY) {
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(CONFIG.RESEND_API_KEY);
  }
  return resendInstance;
}

export interface EmailResult {
  sent: boolean;
  id?: string;
  error?: string;
}

/**
 * Sends a verified payment & onboarding confirmation email
 */
export async function sendPaymentVerifiedEmail(params: {
  to: string;
  applicantName: string;
  registrationCode: string;
  trackTitle: string;
  paymentId: string;
  amount: number;
}): Promise<EmailResult> {
  const client = getResendClient();
  if (!client) {
    console.info('[Email] Resend API key not configured; skipping email dispatch.');
    return { sent: false, error: 'RESEND_API_KEY not configured' };
  }

  const { to, applicantName, registrationCode, trackTitle, paymentId, amount } = params;

  try {
    const data = await client.emails.send({
      from: CONFIG.RESEND_FROM_EMAIL,
      to,
      subject: `Official Registration Confirmation: ${trackTitle} [${registrationCode}]`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d19; color: #f3f4f6; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111425; border: 1px solid #262a40; border-radius: 16px; overflow: hidden; }
            .header { padding: 32px 32px 24px; background: linear-gradient(135deg, #0e1227 0%, #161c38 100%); border-bottom: 1px solid #262a40; }
            .logo { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
            .logo span { color: #f97316; }
            .badge { display: inline-block; font-size: 11px; font-family: monospace; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 4px 10px; border-radius: 9999px; margin-top: 12px; }
            .content { padding: 32px; }
            .heading { font-size: 22px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 12px; }
            .card { background-color: #171b30; border: 1px solid #2d334d; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .card-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #22273d; font-size: 13px; }
            .card-row:last-child { border-bottom: none; }
            .label { color: #9ca3af; font-family: monospace; }
            .val { color: #ffffff; font-weight: 600; }
            .next-steps { margin-top: 24px; font-size: 14px; line-height: 1.6; color: #d1d5db; }
            .footer { padding: 24px 32px; background-color: #0c0e1a; border-top: 1px solid #22273d; font-size: 12px; color: #6b7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">DotRepo<span>.</span> Corp.</div>
              <div class="badge">â VERIFIED REGISTRATION & PAYMENT CONFIRMED</div>
            </div>
            <div class="content">
              <h1 class="heading">Welcome to DotRepo, ${applicantName}!</h1>
              <p style="color: #9ca3af; line-height: 1.5; font-size: 14px;">
                Your internship registration and payment for the <strong>${trackTitle}</strong> have been authoritatively verified.
              </p>

              <div class="card">
                <div class="card-row">
                  <span class="label">REGISTRATION ID</span>
                  <span class="val" style="color: #f97316;">${registrationCode}</span>
                </div>
                <div class="card-row">
                  <span class="label">INTERNSHIP TRACK</span>
                  <span class="val">${trackTitle}</span>
                </div>
                <div class="card-row">
                  <span class="label">PAYMENT REFERENCE</span>
                  <span class="val" style="font-family: monospace;">${paymentId}</span>
                </div>
                <div class="card-row">
                  <span class="label">FEE PAID</span>
                  <span class="val">â¹${amount} INR</span>
                </div>
                <div class="card-row">
                  <span class="label">STATUS</span>
                  <span class="val" style="color: #10b981;">PAID & REGISTERED</span>
                </div>
              </div>

              <div class="next-steps">
                <h3 style="color: #ffffff; font-size: 15px; margin-bottom: 8px;">What Happens Next:</h3>
                <ul style="padding-left: 20px; margin-top: 4px;">
                  <li><strong>Candidate Orientation Packet:</strong> Your batch access details and curriculum orientation packet will arrive within 24 hours.</li>
                  <li><strong>Dedicated Project Lead:</strong> You will be connected to your engineering track reviewer.</li>
                  <li><strong>Self-Paced Milestones:</strong> Complete weekly milestone tasks and capstone deliverables at your own schedule.</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              DotRepo Corporation · Global Technology & Open Research<br>
              This is an official transaction confirmation. Please keep this email for your records.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { sent: true, id: data.data?.id };
  } catch (err: any) {
    console.error('[Email] Failed to dispatch payment verified email:', err);
    return { sent: false, error: err.message || 'Email dispatch failed' };
  }
}
