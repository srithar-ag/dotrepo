import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  IndianRupee,
  RefreshCw,
  Eye,
  X,
  ExternalLink,
  ChevronDown,
  Lock,
  LogOut,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  FileSpreadsheet,
} from 'lucide-react';
import { INTERNSHIP_TRACKS } from '../data/internshipData';

export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string>(() => {
    return localStorage.getItem('dotrepo_admin_token') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginInput, setLoginInput] = useState('');

  // Dashboard Data
  const [items, setItems] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    failed: 0,
    grossCollectionsInr: 0,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterTrack, setFilterTrack] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterOnboarding, setFilterOnboarding] = useState('');

  // Selected Detail Modal
  const [selectedReg, setSelectedReg] = useState<any | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Check existing token on mount
  useEffect(() => {
    if (token) {
      loadRegistrations(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const inputToken = loginInput.trim();
    if (!inputToken) {
      setAuthError('Please enter administrator access key or token.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/registrations', {
        headers: {
          Authorization: `Bearer ${inputToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.message || 'Unauthorized: Invalid administrative credentials.');
        setLoading(false);
        return;
      }

      setToken(inputToken);
      localStorage.setItem('dotrepo_admin_token', inputToken);
      setIsAuthenticated(true);
      setItems(data.data.items || []);
      setMetrics(data.data.metrics || metrics);
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('dotrepo_admin_token');
    setIsAuthenticated(false);
    setItems([]);
  };

  const loadRegistrations = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (filterTrack) queryParams.set('trackId', filterTrack);
      if (filterPayment) queryParams.set('paymentStatus', filterPayment);
      if (filterOnboarding) queryParams.set('onboardingStatus', filterOnboarding);

      const res = await fetch(`/api/admin/registrations?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setItems(data.data.items || []);
        setMetrics(data.data.metrics || metrics);
      } else {
        if (res.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOnboardingStatus = async (regId: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch('/api/admin/registration-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          registrationId: regId,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh local state
        setItems((prev) =>
          prev.map((item) =>
            item.id === regId ? { ...item, onboarding_status: newStatus } : item
          )
        );
        if (selectedReg && selectedReg.id === regId) {
          setSelectedReg({ ...selectedReg, onboarding_status: newStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update onboarding status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleExportCsv = () => {
    const url = `/api/admin/registrations?format=csv`;
    window.open(url, '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070913] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0f1225] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-white">DotRepo Admin Portal</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Authorized administrator access to verify applicant records and monitor collections.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-semibold text-neutral-300 mb-1">
                Admin Secret / Bearer Token
              </label>
              <input
                type="password"
                placeholder="Enter admin token (or 'admin-authorized-demo')"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-orange-500"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block font-mono">
                Hint: Authorized for sritharag17@gmail.com and server configured admin keys.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-500/20"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070913] text-white p-4 sm:p-8 font-sans selection:bg-orange-500 selection:text-neutral-950">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/15 border border-orange-500/30 text-orange-400">
                ADMIN CONSOLE
              </span>
              <span className="text-xs font-mono text-neutral-400">DotRepo Admissions & Finance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Internship Registrations & Payments
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => loadRegistrations()}
              disabled={loading}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs transition-colors cursor-pointer"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-400' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-rose-950/60 border border-neutral-800 text-neutral-400 hover:text-rose-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>

        {/* Real-time KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-[#0f1225] border border-neutral-800">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total Applicants</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white mt-2">{metrics.total}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Across all 13 tracks</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f1225] border border-neutral-800">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Paid Registrations</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-2">{metrics.paid}</div>
            <div className="text-[10px] text-emerald-500/80 mt-0.5">Verified by Razorpay</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f1225] border border-neutral-800">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Pending Payments</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 mt-2">{metrics.pending}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Checkout not finalized</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f1225] border border-neutral-800">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Failed Attempts</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-400 mt-2">{metrics.failed}</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Declined or aborted</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f1225] border border-orange-500/30 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-orange-400 text-xs">
              <span>Gross Collections</span>
              <IndianRupee className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl font-black text-orange-400 mt-2">
              ₹{metrics.grossCollectionsInr.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">@ ₹199 INR / verified reg</div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0f1225] border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Registration ID, Applicant Name, Email, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadRegistrations()}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterTrack}
              onChange={(e) => {
                setFilterTrack(e.target.value);
              }}
              className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="">All Tracks</option>
              {INTERNSHIP_TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>

            <select
              value={filterPayment}
              onChange={(e) => {
                setFilterPayment(e.target.value);
              }}
              className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filterOnboarding}
              onChange={(e) => {
                setFilterOnboarding(e.target.value);
              }}
              className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="">All Onboarding</option>
              <option value="applied">Applied</option>
              <option value="under_review">Under Review</option>
              <option value="onboarded">Onboarded</option>
              <option value="completed">Completed</option>
              <option value="withdrawn">Withdrawn</option>
            </select>

            <button
              onClick={() => loadRegistrations()}
              className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs cursor-pointer"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Registrations Data Table */}
        <div className="rounded-2xl bg-[#0f1225] border border-neutral-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 font-mono text-neutral-400 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Reg Code</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">College / Degree</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Onboarding</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-500">
                      No registration records found matching the criteria.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-orange-400">
                        {item.registration_code}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">
                          {item.applicants?.full_name || 'N/A'}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {item.applicants?.email}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-neutral-300 font-medium">
                        {item.track_title}
                      </td>

                      <td className="py-3 px-4 text-neutral-400">
                        <div>{item.applicants?.college || 'N/A'}</div>
                        <div className="text-[10px] text-neutral-500">
                          {item.applicants?.degree_branch}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {item.payment_status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            PAID (₹199)
                          </span>
                        ) : item.payment_status === 'pending' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                            PENDING
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 border border-rose-500/30 text-rose-400">
                            FAILED
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-neutral-800 text-neutral-300 uppercase">
                          {item.onboarding_status || 'applied'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                        {new Date(item.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReg(item)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applicant Detail & Management Modal */}
        {selectedReg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#0f1225] border border-neutral-800 rounded-3xl p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
              <button
                onClick={() => setSelectedReg(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/15 border border-orange-500/30 text-orange-400">
                  APPLICANT PROFILE
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {selectedReg.registration_code}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedReg.applicants?.full_name}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Applied for <strong>{selectedReg.track_title}</strong>
              </p>

              {/* Contact Details */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" />
                  <span>{selectedReg.applicants?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-500" />
                  <span>{selectedReg.applicants?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-neutral-500" />
                  <span>{selectedReg.applicants?.college}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-neutral-500" />
                  <span>{selectedReg.applicants?.degree_branch}</span>
                </div>
              </div>

              {/* Links */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {selectedReg.applicants?.linkedin_url && (
                  <a
                    href={selectedReg.applicants.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-blue-400 flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedReg.applicants?.github_url && (
                  <a
                    href={selectedReg.applicants.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {selectedReg.applicants?.portfolio_url && (
                  <a
                    href={selectedReg.applicants.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-emerald-400 flex items-center gap-1.5"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Payment Details */}
              <div className="mt-4 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs space-y-2 font-mono">
                <div className="text-neutral-400 font-bold uppercase text-[10px]">
                  Payment Verification Audit
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status:</span>
                  <span className={selectedReg.payment_status === 'paid' ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {selectedReg.payment_status?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Amount:</span>
                  <span>₹{selectedReg.processing_fee_inr} INR</span>
                </div>
                {selectedReg.payments?.[0] && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Razorpay Order ID:</span>
                      <span className="text-neutral-300">{selectedReg.payments[0].razorpay_order_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Payment ID:</span>
                      <span className="text-neutral-300">{selectedReg.payments[0].razorpay_payment_id || 'N/A'}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Onboarding Status Control */}
              <div className="mt-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Update Onboarding Lifecycle Status
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedReg.onboarding_status || 'applied'}
                    onChange={(e) => handleUpdateOnboardingStatus(selectedReg.id, e.target.value)}
                    disabled={updatingStatus}
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs font-semibold focus:outline-none focus:border-orange-500"
                  >
                    <option value="applied">Applied (Registration Completed)</option>
                    <option value="under_review">Under Review (Portfolio / GitHub Screen)</option>
                    <option value="onboarded">Onboarded (Workspace Invite Dispatched)</option>
                    <option value="completed">Completed (Capstone Approved & Dual Certificate Issued)</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
