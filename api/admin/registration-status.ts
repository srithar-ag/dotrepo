// API: POST /api/admin/registration-status
// Updates onboarding status for an applicant

import { verifyAdminRequest } from '../../server/adminAuth';
import { updateOnboardingStatus } from '../../server/supabase';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;
  const authResult = await verifyAdminRequest(authHeader);

  if (!authResult.isAuthorized) {
    return res.status(401).json({
      success: false,
      message: authResult.error || 'Unauthorized: Administrator access required',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { registrationId, status } = body;

    const allowedStatuses = ['applied', 'under_review', 'onboarded', 'completed', 'withdrawn'];
    if (!registrationId || !status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid parameters. Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    await updateOnboardingStatus(registrationId, status);

    return res.status(200).json({
      success: true,
      message: `Onboarding status updated to '${status}'.`,
    });
  } catch (error: any) {
    console.error('[API /api/admin/registration-status error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating onboarding status',
    });
  }
}
