// Backend Input Validation Rules

import { getTrack } from './tracks.ts';

export interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degreeBranch: string;
  academicYear: string;
  gradYear: number | string;
  trackId: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  consentGiven: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: Partial<RegisterInput>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Supports international E.164 and Indian numbers (+91, 8-15 digits)
const PHONE_PATTERN = /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,4}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
const URL_REGEX = /^https?:\/\/.+/i;

export function normalizePhone(raw?: string): string {
  if (!raw || typeof raw !== 'string') return '';
  let cleaned = raw.trim();
  // Strip duplicate country code if UI combined it (e.g. "+91 +919876543210" -> "+91 9876543210")
  cleaned = cleaned.replace(/^\+(\d{1,4})\s*\+\1\s*/, '+$1 ');
  return cleaned;
}

export function normalizeUrl(raw?: string): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // If user provided a domain/path without scheme, add https://
  if (/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function validateRegisterInput(data: Partial<RegisterInput>): ValidationResult {
  const errors: Record<string, string> = {};
  const sanitized: Partial<RegisterInput> = { ...data };

  // Full Name
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (minimum 2 characters)';
  } else if (data.fullName.trim().length > 100) {
    errors.fullName = 'Full name must not exceed 100 characters';
  } else {
    sanitized.fullName = data.fullName.trim();
  }

  // Email
  if (!data.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'A valid email address is required (e.g., student@domain.com)';
  } else if (data.email.trim().length > 254) {
    errors.email = 'Email address is too long';
  } else {
    sanitized.email = data.email.trim().toLowerCase();
  }

  // Mobile Phone
  const rawPhone = normalizePhone(data.phone);
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (!rawPhone || digitsOnly.length < 8) {
    errors.phone = 'Mobile number is required (minimum 8 digits, e.g., +91 98765 43210)';
  } else if (digitsOnly.length > 16) {
    errors.phone = 'Mobile number is too long';
  } else {
    const compactPhone = rawPhone.replace(/\s+/g, '');
    if (!PHONE_PATTERN.test(compactPhone) && !PHONE_PATTERN.test(rawPhone)) {
      errors.phone = 'Please enter a valid phone number with country code';
    } else {
      sanitized.phone = rawPhone;
    }
  }

  // College / University
  if (!data.college || typeof data.college !== 'string' || data.college.trim().length < 2) {
    errors.college = 'College or University name is required';
  } else if (data.college.trim().length > 150) {
    errors.college = 'College name is too long';
  } else {
    sanitized.college = data.college.trim();
  }

  // Degree & Branch
  if (!data.degreeBranch || typeof data.degreeBranch !== 'string' || data.degreeBranch.trim().length < 2) {
    errors.degreeBranch = 'Degree and branch are required (e.g. B.Tech Computer Science)';
  } else {
    sanitized.degreeBranch = data.degreeBranch.trim();
  }

  // Academic Year
  if (!data.academicYear || typeof data.academicYear !== 'string' || data.academicYear.trim().length === 0) {
    errors.academicYear = 'Current academic year is required';
  } else {
    sanitized.academicYear = data.academicYear.trim();
  }

  // Expected Graduation Year
  const gradYearNum = Number(data.gradYear);
  const currentYear = new Date().getFullYear();
  if (isNaN(gradYearNum) || gradYearNum < currentYear - 10 || gradYearNum > currentYear + 10) {
    errors.gradYear = `Please enter a valid graduation year (between ${currentYear - 10} and ${currentYear + 10})`;
  } else {
    sanitized.gradYear = gradYearNum;
  }

  // Selected Track
  if (!data.trackId || typeof data.trackId !== 'string') {
    errors.trackId = 'Please select an internship track';
  } else {
    const track = getTrack(data.trackId);
    if (!track) {
      errors.trackId = `Invalid internship track: '${data.trackId}'. Must be one of the official tracks.`;
    } else {
      sanitized.trackId = track.id;
    }
  }

  // Optional URLs (auto-normalized if valid domain format)
  if (data.linkedinUrl && data.linkedinUrl.trim()) {
    const norm = normalizeUrl(data.linkedinUrl);
    if (!norm || !URL_REGEX.test(norm)) {
      errors.linkedinUrl = 'LinkedIn profile must be a valid URL';
    } else {
      sanitized.linkedinUrl = norm;
    }
  }

  if (data.githubUrl && data.githubUrl.trim()) {
    const norm = normalizeUrl(data.githubUrl);
    if (!norm || !URL_REGEX.test(norm)) {
      errors.githubUrl = 'GitHub profile must be a valid URL';
    } else {
      sanitized.githubUrl = norm;
    }
  }

  if (data.portfolioUrl && data.portfolioUrl.trim()) {
    const norm = normalizeUrl(data.portfolioUrl);
    if (!norm || !URL_REGEX.test(norm)) {
      errors.portfolioUrl = 'Portfolio must be a valid URL';
    } else {
      sanitized.portfolioUrl = norm;
    }
  }

  // Consent Given
  if (data.consentGiven !== true) {
    errors.consentGiven = 'You must agree to the Terms, Privacy Policy, and Registration Conditions to continue';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}
