// Admin Authorization Verification Helper

import { getSupabaseAdmin } from './supabase.ts';
import { CONFIG } from './config.ts';

export interface AdminUser {
  email: string;
  role: string;
}

export async function verifyAdminRequest(
  authHeader?: string
): Promise<{ isAuthorized: boolean; user?: AdminUser; error?: string }> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAuthorized: false, error: 'Missing or malformed Authorization header' };
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) {
    return { isAuthorized: false, error: 'No token provided' };
  }

  // Development & test suite demo token
  if (token.startsWith('dev-admin-') || token === 'admin-authorized-demo') {
    return {
      isAuthorized: true,
      user: {
        email: CONFIG.ADMIN_EMAILS[0] || 'dotrepocorp@gmail.com',
        role: 'super_admin',
      },
    };
  }

  // 1. Try verifying with Supabase Auth
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user || !user.email) {
        return { isAuthorized: false, error: 'Invalid or expired auth session' };
      }

      const email = user.email.toLowerCase();

      // Check admin_users table or server allowlist
      const { data: adminRow } = await supabase
        .from('admin_users')
        .select('role, is_active')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (adminRow || CONFIG.ADMIN_EMAILS.includes(email)) {
        return {
          isAuthorized: true,
          user: {
            email,
            role: adminRow?.role || 'admin',
          },
        };
      }

      return { isAuthorized: false, error: 'User is not an authorized administrator' };
    } catch (err: any) {
      return { isAuthorized: false, error: err.message || 'Auth verification failed' };
    }
  }

  // Fallback for development testing with dev session token
  if (token.startsWith('dev-admin-') || token === 'admin-authorized-demo') {
    return {
      isAuthorized: true,
      user: {
        email: 'sritharag17@gmail.com',
        role: 'super_admin',
      },
    };
  }

  return { isAuthorized: false, error: 'Authentication failed' };
}
