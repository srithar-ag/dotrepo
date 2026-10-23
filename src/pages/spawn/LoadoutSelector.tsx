import React, { useState } from 'react';
import { Send, Check, Sparkles, Mail } from 'lucide-react';

const LOADOUT_OPTIONS = [
  'Game development',
  'Multiplayer backend',
  'Matchmaking',
  'Live-ops',
  'Cloud servers',
  'Analytics',
  'AI for games',
  'Tournaments',
];

interface LoadoutSelectorProps {
  onNavigateContact?: (loadoutQuery: string) => void;
}

export const LoadoutSelector: React.FC<LoadoutSelectorProps> = ({ onNavigateContact }) => {
  const [selectedLoadout, setSelectedLoadout] = useState<string[]>([
    'Game development',
    'Multiplayer backend',
  ]);

  const toggleChip = (chip: string) => {
    setSelectedLoadout((prev) =>
      prev.includes(chip) ? prev.filter((item) => item !== chip) : [...prev, chip]
    );
  };

  const loadoutQueryParam = encodeURIComponent(selectedLoadout.join(', '));
  const contactHref = `/contact${selectedLoadout.length ? `?loadout=${loadoutQueryParam}` : ''}`;
  const mailtoHref = `mailto:communications@dotrepo.in?subject=DotRepo%20Spawn%20Gaming%20Loadout%20Enquiry&body=Hi%20DotRepo%20Spawn%20Team%2C%0A%0AWe%20would%20like%20to%20discuss%20our%20game%20architecture%20requirements.%0A%0ASelected%20Loadout%3A%0A${encodeURIComponent(
    selectedLoadout.map((s) => `• ${s}`).join('\n')
  )}%0A%0APlease%20let%20us%20know%20your%20availability%20for%20an%20architecture%20review.%0A%0AThank%20you!`;

  const handleSendClick = (e: React.MouseEvent) => {
    if (onNavigateContact) {
      e.preventDefault();
      onNavigateContact(selectedLoadout.join(', '));
    }
  };

  return (
    <section id="loadout" className="py-24 sm:py-32 relative text-center">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#e4ff4a] bg-[#e4ff4a]/10 border border-[#e4ff4a]/25 px-3 py-1 rounded-full">
            Modular Game Architecture
          </span>
        </div>
        <h2 className="spawn-disp text-4xl sm:text-6xl lg:text-7xl">
          <span className="spawn-grad">Pick your loadout</span>
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
          Select what you need and we'll start the conversation from there.
        </p>

        {/* Selectable Chips */}
        <div
          className="flex flex-wrap gap-3 sm:gap-4 justify-center my-10 max-w-4xl mx-auto"
          role="group"
          aria-label="Game stack loadout module selection"
        >
          {LOADOUT_OPTIONS.map((chip) => {
            const isSelected = selectedLoadout.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleChip(chip)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#e4ff4a] text-black font-bold shadow-[0_8px_25px_rgba(228,255,74,0.35)] -translate-y-1'
                    : 'bg-[#080a14] text-neutral-300 border border-[#2a3150] hover:border-[#1ea0ff] hover:text-white hover:-translate-y-0.5'
                }`}
              >
                {isSelected ? (
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-neutral-600" />
                )}
                <span>{chip}</span>
              </button>
            );
          })}
        </div>

        {/* Live Summary Box */}
        <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-[#090d1c] border border-[#232838] mb-8 text-left">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2 border-b border-[#1b2540] pb-2">
            <div className="flex items-center gap-1.5 text-[#3ff2c4]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold">ACTIVE LOADOUT CONFIGURATION</span>
            </div>
            <span>{selectedLoadout.length} modules selected</span>
          </div>

          {selectedLoadout.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedLoadout.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-[#131d3d] text-[#1ea0ff] border border-[#28406a]"
                >
                  +{item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs font-mono text-neutral-500 italic py-1">
              No modules selected. Tap chips above to assemble your target stack.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={contactHref}
            onClick={handleSendClick}
            className="spawn-btn"
          >
            <span>Send my loadout</span>
            <Send className="w-4 h-4" />
          </a>

          <a
            href={mailtoHref}
            className="spawn-btn spawn-btn-outline"
            title="Send pre-filled email enquiry"
          >
            <Mail className="w-4 h-4 text-[#1ea0ff]" />
            <span>Email Loadout Directly</span>
          </a>
        </div>
      </div>
    </section>
  );
};
