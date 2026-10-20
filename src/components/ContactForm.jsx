import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { profile } from '@/data/profile';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address';
    }
    if (!form.message.trim()) {
      next.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters';
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
      const subject = encodeURIComponent(
        form.subject || `Portfolio contact from ${form.name}`
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try emailing me directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-fg-primary">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="cf-name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full rounded-lg border bg-bg-tertiary px-4 py-2.5 text-sm text-fg-primary outline-none transition-colors placeholder:text-fg-tertiary focus:border-accent-primary ${
            errors.name ? 'border-red-500' : 'border-border-primary'
          }`}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
        />
        {errors.name && (
          <p id="cf-name-err" className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-fg-primary">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full rounded-lg border bg-bg-tertiary px-4 py-2.5 text-sm text-fg-primary outline-none transition-colors placeholder:text-fg-tertiary focus:border-accent-primary ${
            errors.email ? 'border-red-500' : 'border-border-primary'
          }`}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
        />
        {errors.email && (
          <p id="cf-email-err" className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-sm font-medium text-fg-primary">
          Subject
        </label>
        <input
          id="cf-subject"
          type="text"
          value={form.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-bg-tertiary px-4 py-2.5 text-sm text-fg-primary outline-none transition-colors placeholder:text-fg-tertiary focus:border-accent-primary"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-fg-primary">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`w-full resize-none rounded-lg border bg-bg-tertiary px-4 py-2.5 text-sm text-fg-primary outline-none transition-colors placeholder:text-fg-tertiary focus:border-accent-primary ${
            errors.message ? 'border-red-500' : 'border-border-primary'
          }`}
          placeholder="Tell me about your project or opportunity..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-msg-err' : undefined}
        />
        {errors.message && (
          <p id="cf-msg-err" className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.message}
          </p>
        )}
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Your email client should now be open with your message ready to send.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs text-fg-tertiary">
        This form opens your email app. For a backend-powered form, connect an email service.
      </p>
    </form>
  );
}
