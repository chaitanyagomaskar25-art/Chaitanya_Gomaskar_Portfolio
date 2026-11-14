import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Copy, Check, Mail, Sparkles } from 'lucide-react';
import { profile } from '@/data/profile';
import { api } from '@/services/api';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) {
      next.name = 'Please provide your full name';
    } else if (form.name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      next.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address';
    }

    if (!form.subject.trim()) {
      next.subject = 'Please add a brief subject';
    }

    if (!form.message.trim()) {
      next.message = 'Please provide a message';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message must be at least 10 characters';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await api.submitContact(form);
      if (res && res.ok && res.data?.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        // If API fails or backend is unreachable, notify user honestly and offer mailto fallback
        setErrorMsg(
          res?.data?.message ||
            'Backend server is currently unreachable. You can still reach me directly via email.'
        );
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg(
        'Unable to send message via database API right now. Please reach out to me directly at ' +
          profile.email
      );
      setStatus('error');
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(form.subject || `Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bento-card relative overflow-hidden rounded-3xl border border-border-primary/80 bg-bg-secondary p-6 shadow-xl transition-all sm:p-8">
      {/* Decorative ambient gradient */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-primary/10 blur-3xl" />

      {status === 'success' ? (
        <div className="py-10 text-center animate-fade-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 shadow-glow">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-fg-primary">
            Message Dispatched
          </h3>
          <p className="mx-auto mt-2.5 max-w-sm text-xs sm:text-sm leading-relaxed text-fg-secondary">
            Thank you for reaching out! Your message was delivered directly into the MERN database. I will review it and get back to you promptly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="btn-primary rounded-xl px-5 py-2.5 text-xs font-semibold shadow-md transition-all hover:shadow-glow"
            >
              Send Another Note
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="btn-secondary flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Email Copied!' : 'Copy Direct Email'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="relative space-y-4">
          <div className="mb-2">
            <h4 className="font-display text-lg font-bold text-fg-primary">
              Send a Message
            </h4>
            <p className="text-xs text-fg-secondary">
              Fill out the form below or email me directly at{' '}
              <a
                href={`mailto:${profile.email}`}
                className="font-semibold text-accent-primary hover:underline"
              >
                {profile.email}
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cf-name"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-fg-secondary"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full rounded-xl border bg-bg-tertiary/70 px-4 py-2.5 text-xs sm:text-sm text-fg-primary outline-none transition-all placeholder:text-fg-tertiary focus:border-accent-primary focus:bg-bg-secondary ${
                  errors.name ? 'border-red-500 ring-1 ring-red-500/20' : 'border-border-primary'
                }`}
                placeholder="e.g. Alex Morgan"
              />
              {errors.name && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cf-email"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-fg-secondary"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full rounded-xl border bg-bg-tertiary/70 px-4 py-2.5 text-xs sm:text-sm text-fg-primary outline-none transition-all placeholder:text-fg-tertiary focus:border-accent-primary focus:bg-bg-secondary ${
                  errors.email ? 'border-red-500 ring-1 ring-red-500/20' : 'border-border-primary'
                }`}
                placeholder="alex@company.com"
              />
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="cf-subject"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-fg-secondary"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="cf-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className={`w-full rounded-xl border bg-bg-tertiary/70 px-4 py-2.5 text-xs sm:text-sm text-fg-primary outline-none transition-all placeholder:text-fg-tertiary focus:border-accent-primary focus:bg-bg-secondary ${
                errors.subject ? 'border-red-500 ring-1 ring-red-500/20' : 'border-border-primary'
              }`}
              placeholder="e.g. Full-Stack Role / Project Collaboration"
            />
            {errors.subject && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="cf-msg"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-fg-secondary"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cf-msg"
              name="message"
              rows={4}
              value={form.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`w-full resize-none rounded-xl border bg-bg-tertiary/70 px-4 py-2.5 text-xs sm:text-sm text-fg-primary outline-none transition-all placeholder:text-fg-tertiary focus:border-accent-primary focus:bg-bg-secondary ${
                errors.message ? 'border-red-500 ring-1 ring-red-500/20' : 'border-border-primary'
              }`}
              placeholder="Hi Chaitanya, I came across your portfolio and would love to discuss an opportunity..."
            />
            {errors.message && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.message}
              </p>
            )}
          </div>

          {status === 'error' && errorMsg && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-500">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{errorMsg}</p>
                  <button
                    type="button"
                    onClick={handleMailtoFallback}
                    className="mt-2 inline-flex items-center gap-1.5 font-bold text-accent-primary hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Open Default Email Client with Message
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-fg-secondary transition-colors hover:text-accent-primary"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to clipboard!' : profile.email}</span>
            </button>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs sm:text-sm font-semibold shadow-md transition-all hover:shadow-glow disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting to Database...</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

