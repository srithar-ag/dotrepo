import React, { useState } from 'react';
import { X, CheckCircle2, Lock, Mail, User, ArrowRight, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e101d] border border-neutral-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {mode === 'signup' ? 'Welcome to Udacity!' : 'Signed In Successfully'}
            </h3>
            <p className="text-xs text-neutral-300">
              {mode === 'signup'
                ? 'Your free student account has been created. You now have access to free course previews and code sandboxes.'
                : 'Welcome back! Restoring your session and active coursework.'}
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs cursor-pointer"
            >
              Continue to Platform
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-white">
                {mode === 'signup' ? 'Join Udacity for Free' : 'Log in to Udacity'}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {mode === 'signup'
                  ? 'Access free course previews, project sandboxes, and tech syllabi'
                  : 'Continue where you left off in your Nanodegree'}
              </p>
            </div>

            {/* Mode Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#14172a] border border-neutral-800 mb-6">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#0066FF] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Log In
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#15182a] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="engineer@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#15182a] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#15182a] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Log In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Continue with GitHub</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
