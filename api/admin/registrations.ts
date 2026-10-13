// API: GET /api/admin/registrations
// Protected administrator registration management, analytics metrics, and CSV export

import { verifyAdminRequest } from '../../server/adminAuth.ts';
import { getAdminRegistrations } from '../../server/supabase.ts';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // 1. Verify Admin Identity & Permissions
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const authResult = await verifyAdminRequest(authHeader);

  if (!authResult.isAuthorized) {
    return res.status(401).json({
      success: false,
      message: authResult.error || 'Unauthorized: Administrator access required',
    });
  }

  try {
    const url = new URL(req.url, 'http://localhost');
    const search = url.searchParams.get('search') || undefined;
    const trackId = url.searchParams.get('trackId') || undefined;
    const paymentStatus = url.searchParams.get('paymentStatus') || undefined;
    const onboardingStatus = url.searchParams.get('onboardingStatus') || undefined;
    const format = url.searchParams.get('format') || 'json';
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 100;

    const data = await getAdminRegistrations({
      search,
      trackId,
      paymentStatus,
      onboardingStatus,
      limit,
    });

    // Handle CSV Export
    if (format === 'csv') {
      const headers = [
        'Registration Code',
        'Applicant Name',
        'Email',
        'Phone',
        'College',
        'Degree & Branch',
        'Track',
        'Fee INR',
        'Payment Status',
        'Onboarding Status',
        'Razorpay Payment ID',
        'Created At',
      ];

      const csvRows = [headers.join(',')];

      data.items.forEach((item: any) => {
        const row = [
          `"${item.registration_code || ''}"`,
          `"${(item.applicants?.full_name || '').replace(/"/g, '""')}"`,
          `"${item.applicants?.email || ''}"`,
          `"${item.applicants?.phone || ''}"`,
          `"${(item.applicants?.college || '').replace(/"/g, '""')}"`,
          `"${(item.applicants?.degree_branch || '').replace(/"/g, '""')}"`,
          `"${(item.track_title || '').replace(/"/g, '""')}"`,
          item.processing_fee_inr || 199,
          `"${item.payment_status || ''}"`,
          `"${item.onboarding_status || ''}"`,
          `"${item.payments?.[0]?.razorpay_payment_id || ''}"`,
          `"${item.created_at || ''}"`,
        ];
        csvRows.push(row.join(','));
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="dotrepo_registrations_${new Date().toISOString().slice(0, 10)}.csv"`
      );
      return res.status(200).send(csvRows.join('\n'));
    }

    return res.status(200).json({
      success: true,
      data: {
        items: data.items,
        totalCount: data.totalCount,
        metrics: data.metrics,
      },
    });
  } catch (error: any) {
    console.error('[API /api/admin/registrations error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching registrations',
    });
  }
}
