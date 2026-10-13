// Backend Input Validation Rules

import { getTrack } from './tracks';

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
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Supports international E.164 and Indian numbers (+91, 10-15 digits)
const PHONE_REGEX = /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,4}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
const URL_REGEX = /^https?:\/\/.+/i;

export function validateRegisterInput(data: Partial<RegisterInput>): ValidationResult {
  const errors: Record<string, string> = {};

  // Full Name
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (minimum 2 characters)';
  } else if (data.fullName.trim().length > 100) {
    errors.fullName = 'Full name must not exceed 100 characters';
  }

  // Email
  if (!data.email || typeof data.email !== 'string' || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'A valid email address is required';
  } else if (data.email.trim().length > 254) {
    errors.email = 'Email address is too long';
  }

  // Mobile Phone
  if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length < 8) {
    errors.phone = 'Mobile number with country code is required (e.g., +91 98765 43210)';
  } else if (!PHONE_REGEX.test(data.phone.trim().replace(/\s+/g, ''))) {
    errors.phone = 'Please enter a valid phone number with country code';
  }

  // College / University
  if (!data.college || typeof data.college !== 'string' || data.college.trim().length < 2) {
    errors.college = 'College or University name is required';
  } else if (data.college.trim().length > 150) {
    errors.college = 'College name is too long';
  }

  // Degree & Branch
  if (!data.degreeBranch || typeof data.degreeBranch !== 'string' || data.degreeBranch.trim().length < 2) {
    errors.degreeBranch = 'Degree and branch are required (e.g. B.Tech Computer Science)';
  }

  // Academic Year
  if (!data.academicYear || typeof data.academicYear !== 'string') {
    errors.academicYear = 'Current academic year is required';
  }

  // Expected Graduation Year
  const gradYearNum = Number(data.gradYear);
  const currentYear = new Date().getFullYear();
  if (isNaN(gradYearNum) || gradYearNum < currentYear - 5 || gradYearNum > currentYear + 8) {
    errors.gradYear = `Please enter a valid graduation year (between ${currentYear - 5} and ${currentYear + 8})`;
  }

  // Selected Track
  if (!data.trackId || typeof data.trackId !== 'string') {
    errors.trackId = 'Please select an internship track';
  } else {
    const track = getTrack(data.trackId);
    if (!track) {
      errors.trackId = `Invalid internship track: '${data.trackId}'. Must be one of the 13 official tracks.`;
    }
  }

  // Optional URLs
  if (data.linkedinUrl && data.linkedinUrl.trim()) {
    if (!URL_REGEX.test(data.linkedinUrl.trim())) {
      errors.linkedinUrl = 'LinkedIn profile must be a valid URL starting with http:// or https://';
    }
  }

  if (data.githubUrl && data.githubUrl.trim()) {
    if (!URL_REGEX.test(data.githubUrl.trim())) {
      errors.githubUrl = 'GitHub profile must be a valid URL starting with http:// or https://';
    }
  }

  if (data.portfolioUrl && data.portfolioUrl.trim()) {
    if (!URL_REGEX.test(data.portfolioUrl.trim())) {
      errors.portfolioUrl = 'Portfolio must be a valid URL starting with http:// or https://';
    }
  }

  // Consent Given
  if (data.consentGiven !== true) {
    errors.consentGiven = 'You must agree to the Terms, Privacy Policy, and Registration Conditions to continue';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
