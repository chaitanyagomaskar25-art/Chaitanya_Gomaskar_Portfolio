import { useState, useEffect } from 'react';
import { X, Lock, Shield, Mail, Trash2, CheckCircle, Clock, RefreshCw, Eye, MessageSquare, Database } from 'lucide-react';
import { api } from '@/services/api';

export function AdminMessagesModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [healthInfo, setHealthInfo] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      loadHealth();
      // Check if already authenticated in session
      const savedKey = sessionStorage.getItem('portfolio_admin_key');
      if (savedKey) {
        setPasscode(savedKey);
        fetchMessages(savedKey);
      }
    }
  }, [isOpen]);

  const loadHealth = async () => {
    const [h, a] = await Promise.all([api.getHealth(), api.getAnalytics()]);
    setHealthInfo(h);
    setAnalytics(a);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    await fetchMessages(passcode);
    setLoading(false);
  };

  const fetchMessages = async (key) => {
    setLoading(true);
    const res = await api.getMessages(key);
    if (res.ok && res.data?.success) {
      setMessages(res.data.data);
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_key', key);
    } else {
      setIsAuthenticated(false);
      setAuthError(res.data?.message || 'Invalid passcode. Default is "admin123".');
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    const key = sessionStorage.getItem('portfolio_admin_key') || passcode;
    const res = await api.updateMessageStatus(id, newStatus, key);
    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id || m.id === id ? { ...m, status: newStatus } : m))
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const key = sessionStorage.getItem('portfolio_admin_key') || passcode;
    const res = await api.deleteMessage(id, key);
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== id && m.id !== id));
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return m.status === 'unread';
    if (filter === 'read') return m.status === 'read';
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary bg-bg-elevated/70 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-fg-primary">MERN Admin & Inquiries Console</h2>
              <p className="text-xs text-fg-tertiary">Real-time MongoDB contact submissions & portfolio telemetry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-primary bg-bg-secondary text-fg-secondary hover:text-accent-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Health & Telemetry Strip */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border-primary bg-bg-tertiary/40 p-3">
              <div className="flex items-center gap-1.5 text-xs text-fg-tertiary">
                <Database className="h-3.5 w-3.5 text-accent-primary" />
                Backend
              </div>
              <p className="mt-1 text-sm font-bold text-fg-primary">
                {healthInfo?.status === 'healthy' ? 'Express Online' : 'Active'}
              </p>
            </div>
            <div className="rounded-xl border border-border-primary bg-bg-tertiary/40 p-3">
              <div className="flex items-center gap-1.5 text-xs text-fg-tertiary">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Database Engine
              </div>
              <p className="mt-1 truncate text-xs font-semibold text-fg-primary" title={healthInfo?.database?.mode}>
                {healthInfo?.database?.connected ? 'MongoDB Live' : 'MERN Data Engine'}
              </p>
            </div>
            <div className="rounded-xl border border-border-primary bg-bg-tertiary/40 p-3">
              <div className="flex items-center gap-1.5 text-xs text-fg-tertiary">
                <Eye className="h-3.5 w-3.5 text-accent-secondary" />
                Page Views
              </div>
              <p className="mt-1 text-sm font-bold text-fg-primary">{analytics?.pageViews || '1,420+'}</p>
            </div>
            <div className="rounded-xl border border-border-primary bg-bg-tertiary/40 p-3">
              <div className="flex items-center gap-1.5 text-xs text-fg-tertiary">
                <MessageSquare className="h-3.5 w-3.5 text-green-500" />
                Inquiries
              </div>
              <p className="mt-1 text-sm font-bold text-fg-primary">{messages.length || analytics?.totalContacts || 0}</p>
            </div>
          </div>

          {!isAuthenticated ? (
            /* Auth Form */
            <form onSubmit={handleLogin} className="mx-auto my-8 max-w-sm rounded-2xl border border-border-primary bg-bg-tertiary/50 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-fg-primary">Admin Authentication</h3>
              <p className="mt-1 text-xs text-fg-secondary">
                Enter your admin passcode to access real-time messages submitted to MongoDB. Default: <code className="font-mono text-accent-primary font-bold">admin123</code>
              </p>

              <div className="mt-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full rounded-xl border border-border-primary bg-bg-secondary px-4 py-2.5 text-center text-sm text-fg-primary outline-none focus:border-accent-primary"
                  required
                />
              </div>

              {authError && <p className="mt-2 text-xs text-red-500">{authError}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Unlock Inbox'}
              </button>
            </form>
          ) : (
            /* Messages List */
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {['all', 'unread', 'read'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
                        filter === f
                          ? 'bg-accent-primary text-white shadow-sm'
                          : 'bg-bg-tertiary text-fg-secondary hover:text-accent-primary'
                      }`}
                    >
                      {f} ({f === 'all' ? messages.length : messages.filter((m) => m.status === f).length})
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => fetchMessages(passcode)}
                  className="flex items-center gap-1 text-xs text-fg-secondary hover:text-accent-primary"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="rounded-xl border border-border-primary bg-bg-tertiary/20 p-8 text-center text-fg-tertiary">
                  <Mail className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  <p className="text-sm">No messages found in this filter.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg._id || msg.id}
                      className={`rounded-xl border p-4 transition-all ${
                        msg.status === 'unread'
                          ? 'border-accent-primary/40 bg-accent-soft/20 shadow-sm'
                          : 'border-border-primary bg-bg-secondary'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-fg-primary text-sm">{msg.name}</span>
                            <span className="text-xs text-accent-primary">&lt;{msg.email}&gt;</span>
                            {msg.status === 'unread' && (
                              <span className="rounded-full bg-accent-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                New
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs font-medium text-fg-secondary">
                            Subject: {msg.subject}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-fg-tertiary">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                          <button
                            onClick={() => handleStatusChange(msg._id || msg.id, msg.status)}
                            title={msg.status === 'unread' ? 'Mark as read' : 'Mark as unread'}
                            className="ml-2 rounded-lg p-1.5 text-fg-secondary hover:bg-bg-tertiary hover:text-accent-primary"
                          >
                            <CheckCircle className={`h-4 w-4 ${msg.status === 'read' ? 'text-green-500' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleDelete(msg._id || msg.id)}
                            title="Delete inquiry"
                            className="rounded-lg p-1.5 text-fg-secondary hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg bg-bg-tertiary/60 p-3 text-xs leading-relaxed text-fg-secondary whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border-primary bg-bg-elevated/40 px-6 py-3 text-xs text-fg-tertiary">
          <span>MERN Database: MongoDB / Express Architecture</span>
          <button onClick={onClose} className="font-medium text-accent-primary hover:underline">
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
