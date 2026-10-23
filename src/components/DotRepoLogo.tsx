import React from 'react';

interface DotRepoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  inverted?: boolean;
}

export const DotRepoLogo: React.FC<DotRepoLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  inverted = false,
}) => {
  const sizeMap = {
    sm: { height: 26, width: showWordmark ? 140 : 64 },
    md: { height: 32, width: showWordmark ? 170 : 76 },
    lg: { height: 42, width: showWordmark ? 210 : 96 },
    xl: { height: 56, width: showWordmark ? 260 : 128 },
  };

  const currentSize = sizeMap[size];

  // In bright theme:
  // Circle is deep black/slate #0f172a
  // Inside text is white #ffffff
  // Outside text is deep black/slate #0f172a
  // If inverted (on dark surface):
  // Circle is white, inside text is black, outside text is white
  const circleFill = inverted ? '#ffffff' : '#0f172a';
  const insideTextFill = inverted ? '#0f172a' : '#ffffff';
  const outsideTextFill = inverted ? '#ffffff' : '#0f172a';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision .repo vector graphic reproduction with inverted circular geometry */}
      <svg
        width={currentSize.width > 120 && !showWordmark ? currentSize.width : currentSize.height * 2.1}
        height={currentSize.height}
        viewBox="0 0 210 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-label="DotRepo Corp. emblem"
      >
        <defs>
          <clipPath id="circle-clip">
            <circle cx="58" cy="50" r="48" />
          </clipPath>
        </defs>

        {/* The Base Circle */}
        <circle cx="58" cy="50" r="48" fill={circleFill} />

        {/* Text outside the circle */}
        <text
          x="12"
          y="68"
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="56"
          letterSpacing="-0.03em"
          fill={outsideTextFill}
        >
          .repo
        </text>

        {/* Text inside the circle (masked) */}
        <g clipPath="url(#circle-clip)">
          <text
            x="12"
            y="68"
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="56"
            letterSpacing="-0.03em"
            fill={insideTextFill}
          >
            .repo
          </text>
        </g>
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm sm:text-base font-black tracking-tight leading-none ${
                inverted ? 'text-white' : 'text-neutral-950'
              }`}
            >
              DotRepo Corp.
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Enterprise
            </span>
          </div>
          <span className="hidden 2xl:block text-[10px] text-neutral-400 tracking-wide font-normal mt-0.5 whitespace-nowrap">
            Cloud · SaaS · Data · AI · Bangalore, IN
          </span>
        </div>
      )}
    </div>
  );
};
