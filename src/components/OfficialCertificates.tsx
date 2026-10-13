import React from 'react';

// Elegant SVG Signature for Dr. Sarah Chen
export const SignatureSarahChen: React.FC<{ className?: string }> = ({ className = 'w-28 h-8' }) => (
  <svg
    viewBox="0 0 200 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Sarah Chen signature"
  >
    <path
      d="M12 42C18 36 24 22 30 18C36 14 42 22 38 32C35 40 28 48 20 48C14 48 10 44 14 36C18 28 32 20 46 28C52 32 55 42 60 40C65 38 68 28 72 26C78 24 82 34 88 36C94 38 100 32 108 28C114 25 120 34 126 34"
      stroke="#171717"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M80 18C86 16 94 28 98 42C100 48 102 50 108 48C114 46 122 32 128 30C134 28 142 36 148 38C154 40 162 36 170 32"
      stroke="#171717"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 48C35 44 80 42 135 40C155 39 175 38 190 38"
      stroke="#171717"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Elegant SVG Signature for David Okafor
export const SignatureDavidOkafor: React.FC<{ className?: string }> = ({ className = 'w-28 h-8' }) => (
  <svg
    viewBox="0 0 200 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="David Okafor signature"
  >
    <path
      d="M15 15C18 25 22 45 25 52C28 42 35 22 45 18C52 15 58 24 55 35C52 44 42 48 35 48C28 48 22 42 28 32C32 24 45 20 60 28C70 34 80 40 95 38"
      stroke="#171717"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M75 32C85 30 100 28 115 32C125 35 135 28 145 25C155 22 165 30 172 32"
      stroke="#171717"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 40C60 38 110 36 160 34C175 33 185 33 192 34"
      stroke="#171717"
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

// Official Logo: ".repo" | "DOTREPO"
export const DotRepoCertLogo: React.FC<{ hasSubtext?: boolean; isCompact?: boolean }> = ({
  hasSubtext = true,
  isCompact = false,
}) => (
  <div className="flex items-center gap-1.5 sm:gap-2.5 select-none">
    <div className="flex items-center gap-0.5">
      <span
        className={`rounded-full bg-neutral-950 inline-block shrink-0 ${
          isCompact ? 'w-2 h-2 sm:w-2.5 sm:h-2.5' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
        }`}
      />
      <span
        className={`font-extrabold text-neutral-950 tracking-tight leading-none ${
          isCompact ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'
        }`}
      >
        repo
      </span>
    </div>
    {hasSubtext && (
      <>
        <div className={`w-px bg-neutral-300 ${isCompact ? 'h-4 sm:h-5' : 'h-5 sm:h-6'}`} />
        <span
          className={`font-sans font-medium tracking-[0.2em] text-neutral-800 uppercase ${
            isCompact ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
          }`}
        >
          DOTREPO
        </span>
      </>
    )}
  </div>
);

export interface CertificateProps {
  recipientName?: string;
  trackRole?: string;
  isZoomed?: boolean;
  compact?: boolean;
}

/**
 * 1. OFFICIAL INTERNSHIP COMPLETION CERTIFICATE
 * Faithfully matches the exact uploaded image "Internship certificate.png"
 * Default recipient: Allen Julles
 */
export const OfficialInternshipCompletionCertificate: React.FC<CertificateProps> = ({
  recipientName = 'Allen Julles',
  trackRole = 'Backend AI Intern',
  isZoomed = false,
  compact = true,
}) => {
  return (
    <div
      className={`relative w-full bg-white text-neutral-900 rounded-xl sm:rounded-2xl shadow-md border border-neutral-200/90 overflow-hidden flex flex-col justify-between transition-all ${
        isZoomed
          ? 'p-6 sm:p-10 md:p-14 min-h-[500px]'
          : compact
          ? 'p-4 sm:p-5 md:p-6 min-h-[310px] sm:min-h-[340px]'
          : 'p-5 sm:p-8 md:p-10 min-h-[380px]'
      }`}
    >
      {/* Exact Right-Side Geometric Accent from Certificate 1 */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none overflow-hidden select-none">
        <svg
          viewBox="0 0 320 600"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle light grey curved circular contour */}
          <circle
            cx="320"
            cy="300"
            r="280"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Soft inner circle contour */}
          <circle cx="320" cy="300" r="220" fill="#f1f5f9" opacity="0.5" />
          {/* Secondary translucent orange accent swoosh */}
          <path
            d="M 320 180 C 220 230 180 340 320 480 L 320 600 L 260 600 C 140 400 170 240 320 120 Z"
            fill="#fed7aa"
            opacity="0.45"
          />
          {/* Primary sharp DOTREPO orange diagonal swoosh blade */}
          <path
            d="M 320 120 C 240 180 200 270 320 440 L 320 360 C 240 240 270 170 320 90 Z"
            fill="url(#orangeBladeGradSmall)"
          />
          <defs>
            <linearGradient
              id="orangeBladeGradSmall"
              x1="200"
              y1="150"
              x2="320"
              y2="400"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#f97316" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content Container (Layered above background art) */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
          <DotRepoCertLogo hasSubtext={true} isCompact={compact && !isZoomed} />

          <div
            className={`text-right font-sans text-neutral-800 leading-tight ${
              isZoomed
                ? 'text-xs sm:text-sm'
                : compact
                ? 'text-[10px] sm:text-xs'
                : 'text-[11px] sm:text-xs'
            }`}
          >
            <p>
              Issued date: <span className="font-medium">10/07/26</span>
            </p>
            <p className="mt-0.5">
              Certificate ID: <span className="font-semibold">AZFY286SE</span>
            </p>
          </div>
        </div>

        {/* Main Certificate Title */}
        <div className="my-2 sm:my-3">
          <h2
            className={`font-black text-neutral-950 tracking-tight font-sans leading-none uppercase ${
              isZoomed
                ? 'text-3xl sm:text-5xl md:text-6xl'
                : compact
                ? 'text-lg sm:text-2xl md:text-3xl'
                : 'text-2xl sm:text-4xl'
            }`}
          >
            CERTIFICATE
          </h2>
          <h3
            className={`font-bold text-neutral-900 tracking-tight font-sans mt-0.5 sm:mt-1 uppercase ${
              isZoomed
                ? 'text-xl sm:text-3xl'
                : compact
                ? 'text-xs sm:text-base md:text-lg text-orange-950'
                : 'text-base sm:text-2xl'
            }`}
          >
            OF INTERNSHIP COMPLETION
          </h3>

          <p
            className={`italic text-neutral-600 font-sans mt-2 sm:mt-3 ${
              isZoomed ? 'text-sm sm:text-base' : 'text-[11px] sm:text-xs'
            }`}
          >
            This is to certify that
          </p>

          {/* Recipient Name with exact orange underline bar */}
          <div className="mt-1 sm:mt-1.5 inline-block">
            <p
              className={`font-black text-neutral-950 tracking-tight font-sans ${
                isZoomed
                  ? 'text-3xl sm:text-5xl'
                  : compact
                  ? 'text-lg sm:text-2xl'
                  : 'text-2xl sm:text-4xl'
              }`}
            >
              {recipientName}
            </p>
            <div
              className={`bg-[#ea580c] mt-1 rounded-full ${
                isZoomed ? 'w-16 h-1.5' : compact ? 'w-10 sm:w-12 h-1' : 'w-12 h-1'
              }`}
            />
          </div>

          {/* Body Text */}
          <div
            className={`mt-2 sm:mt-3 max-w-sm sm:max-w-md text-neutral-800 leading-snug font-sans ${
              isZoomed ? 'text-sm sm:text-base' : 'text-[11px] sm:text-xs'
            }`}
          >
            <p>
              has successfully completed the internship program at{' '}
              <strong className="font-bold text-neutral-950">DotRepo Corp.</strong>
            </p>
            <p className="mt-0.5">
              as a <strong className="font-bold text-neutral-950">{trackRole}</strong> from{' '}
              <span className="font-medium text-neutral-900">01/05/26 to 15/07/26</span>.
            </p>
          </div>
        </div>

        {/* Bottom Signatures & Footer URL */}
        <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-neutral-100">
          <div className="flex flex-row items-end justify-between gap-4 sm:gap-6">
            {/* Signature 1: Dr. Sarah Chen */}
            <div>
              <SignatureSarahChen
                className={
                  isZoomed
                    ? 'w-32 sm:w-40 h-10 sm:h-12'
                    : compact
                    ? 'w-18 sm:w-24 h-6 sm:h-7'
                    : 'w-24 sm:w-32 h-7 sm:h-9'
                }
              />
              <p
                className={`font-bold text-neutral-950 leading-tight ${
                  isZoomed ? 'text-sm' : 'text-[11px] sm:text-xs'
                }`}
              >
                Dr. Sarah Chen
              </p>
              <p
                className={`text-neutral-500 leading-tight ${
                  isZoomed ? 'text-xs' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                Chief Executive Officer
              </p>
              <p
                className={`text-neutral-500 leading-tight ${
                  isZoomed ? 'text-xs' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                DotRepo Corp.
              </p>
            </div>

            {/* Signature 2: David Okafor */}
            <div>
              <SignatureDavidOkafor
                className={
                  isZoomed
                    ? 'w-32 sm:w-40 h-10 sm:h-12'
                    : compact
                    ? 'w-18 sm:w-24 h-6 sm:h-7'
                    : 'w-24 sm:w-32 h-7 sm:h-9'
                }
              />
              <p
                className={`font-bold text-neutral-950 leading-tight ${
                  isZoomed ? 'text-sm' : 'text-[11px] sm:text-xs'
                }`}
              >
                David Okafor
              </p>
              <p
                className={`text-neutral-500 leading-tight ${
                  isZoomed ? 'text-xs' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                Head of AI Research
              </p>
              <p
                className={`text-neutral-500 leading-tight ${
                  isZoomed ? 'text-xs' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                DotRepo Corp.
              </p>
            </div>
          </div>

          {/* Center Footer URL */}
          <div className="text-center mt-2 pt-1.5 border-t border-neutral-100/60">
            <p className="text-[9px] sm:text-[10px] font-medium text-neutral-600 tracking-wide">
              www.dotrepo.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. OFFICIAL CAPSTONE PROJECT COMPLETION CERTIFICATE
 * Faithfully matches the exact uploaded image "Certificate of capstone project Completion.png"
 * Default recipient: Allen Julles
 */
export const OfficialCapstoneCompletionCertificate: React.FC<CertificateProps> = ({
  recipientName = 'Allen Julles',
  trackRole = 'Backend Intern',
  isZoomed = false,
  compact = true,
}) => {
  return (
    <div
      className={`relative w-full text-neutral-900 rounded-xl sm:rounded-2xl shadow-md border border-blue-200/80 overflow-hidden flex flex-col justify-between transition-all ${
        isZoomed
          ? 'p-6 sm:p-10 md:p-14 min-h-[500px]'
          : compact
          ? 'p-4 sm:p-5 md:p-6 min-h-[310px] sm:min-h-[340px]'
          : 'p-5 sm:p-8 md:p-10 min-h-[380px]'
      }`}
      style={{
        backgroundColor: '#d6e9fe',
      }}
    >
      {/* Exact Right-Side Bauhaus Geometric Mosaic Grid from Certificate 2 */}
      <div className="absolute top-0 right-0 bottom-0 w-1/4 sm:w-1/5 pointer-events-none overflow-hidden select-none">
        <svg
          viewBox="0 0 200 600"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Row 1 */}
          <path d="M 0 0 A 100 150 0 0 1 100 150 L 0 150 Z" fill="#38bdf8" />
          <path d="M 100 0 A 100 150 0 0 0 200 150 L 100 150 Z" fill="#0284c7" />

          {/* Row 2 */}
          <path d="M 0 300 A 100 150 0 0 1 100 150 L 0 150 Z" fill="#0369a1" />
          <path d="M 100 150 A 100 150 0 0 1 200 300 L 100 300 Z" fill="#38bdf8" />

          {/* Row 3 */}
          <path d="M 0 300 A 100 150 0 0 1 100 450 L 0 450 Z" fill="#0284c7" />
          <path d="M 200 300 A 100 150 0 0 0 100 450 L 200 450 Z" fill="#eff6ff" />

          {/* Row 4 */}
          <path d="M 0 600 A 100 150 0 0 1 100 450 L 0 450 Z" fill="#0369a1" />
          <path d="M 100 450 A 100 150 0 0 1 200 600 L 100 600 Z" fill="#38bdf8" />
        </svg>
      </div>

      {/* Content Container (Layered above Bauhaus artwork) */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4 pr-12 sm:pr-16">
          {/* `.repo` Logo only (as in Certificate 2 image) */}
          <div className="flex items-center gap-1 select-none">
            <span
              className={`rounded-full bg-neutral-950 inline-block shrink-0 ${
                isCompact(compact, isZoomed) ? 'w-2 h-2 sm:w-2.5 sm:h-2.5' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'
              }`}
            />
            <span
              className={`font-extrabold text-neutral-950 tracking-tight leading-none ${
                isCompact(compact, isZoomed)
                  ? 'text-lg sm:text-xl md:text-2xl'
                  : 'text-xl sm:text-2xl md:text-3xl'
              }`}
            >
              repo
            </span>
          </div>

          <div
            className={`text-right font-sans text-neutral-800 leading-tight ${
              isZoomed
                ? 'text-xs sm:text-sm'
                : compact
                ? 'text-[10px] sm:text-xs'
                : 'text-[11px] sm:text-xs'
            }`}
          >
            <p>
              Issued date: <span className="font-medium">10/05/26</span>
            </p>
            <p className="mt-0.5">
              Intern ID: <span className="font-semibold">AZFY286SE</span>
            </p>
          </div>
        </div>

        {/* Main Certificate Title */}
        <div className="my-2 sm:my-3 pr-12 sm:pr-16">
          <h2
            className={`font-bold text-neutral-950 tracking-[0.1em] uppercase font-sans leading-snug ${
              isZoomed
                ? 'text-xl sm:text-3xl md:text-4xl'
                : compact
                ? 'text-xs sm:text-sm md:text-base'
                : 'text-base sm:text-2xl'
            }`}
          >
            CERTIFICATE OF CAPSTONE PROJECT
            <br />
            COMPLETION
          </h2>

          <p
            className={`uppercase font-semibold text-neutral-800 font-sans tracking-[0.2em] mt-2 sm:mt-3 ${
              isZoomed ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-[10px]'
            }`}
          >
            THIS IS PRESENTED TO
          </p>

          {/* Recipient Name in Elegant Serif Italic (Exact font style from Certificate 2) */}
          <div className="my-1 sm:my-2">
            <p
              className={`font-serif italic text-neutral-950 font-medium tracking-wide ${
                isZoomed
                  ? 'text-4xl sm:text-6xl'
                  : compact
                  ? 'text-xl sm:text-3xl'
                  : 'text-3xl sm:text-5xl'
              }`}
              style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
            >
              {recipientName}
            </p>
          </div>

          {/* Body Text */}
          <div
            className={`max-w-xs sm:max-w-sm text-neutral-800 leading-snug font-sans ${
              isZoomed ? 'text-sm sm:text-base mt-3' : 'text-[10px] sm:text-xs mt-1.5'
            }`}
          >
            <p>for completing the capstone project during Intenship at</p>
            <p className="mt-0.5">
              Dotrepo as a <span className="font-medium text-neutral-950">{trackRole}</span>.
            </p>
          </div>
        </div>

        {/* Bottom Signatures & Footer URL */}
        <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-blue-200/60 pr-12 sm:pr-16">
          <div className="flex flex-row items-end justify-between gap-4 sm:gap-6">
            {/* Signature 1: Sarah Chen */}
            <div>
              <SignatureSarahChen
                className={
                  isZoomed
                    ? 'w-32 sm:w-40 h-10 sm:h-12'
                    : compact
                    ? 'w-18 sm:w-24 h-6 sm:h-7'
                    : 'w-24 sm:w-32 h-7 sm:h-9'
                }
              />
              <p
                className={`font-bold text-neutral-950 leading-tight ${
                  isZoomed ? 'text-sm' : 'text-[11px] sm:text-xs'
                }`}
              >
                Sarah Chen
              </p>
              <p
                className={`text-neutral-700 leading-tight ${
                  isZoomed ? 'text-xs' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                CEO, DotRepo Corp
              </p>
            </div>

            {/* Signature 2: David Okafor */}
            <div>
              <SignatureDavidOkafor
                className={
                  isZoomed
                    ? 'w-32 sm:w-40 h-10 sm:h-12'
                    : compact
                    ? 'w-18 sm:w-24 h-6 sm:h-7'
                    : 'w-24 sm:w-32 h-7 sm:h-9'
                }
              />
              <p
                className={`font-bold text-neutral-950 leading-tight ${
                  isZoomed ? 'text-sm' : 'text-[11px] sm:text-xs'
                }`}
              >
                David Okafer
              </p>
              <p
                className={`text-neutral-700 leading-tight ${
                  isZoomed ? 'text-xs' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                Head of AI Research
              </p>
            </div>
          </div>

          {/* Center Footer URL */}
          <div className="text-center mt-2 pt-1.5 border-t border-blue-200/50">
            <p className="text-[9px] sm:text-[10px] font-medium text-neutral-700 tracking-wide">
              www.dotrepo.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function
function isCompact(compact: boolean, isZoomed: boolean): boolean {
  return compact && !isZoomed;
}
