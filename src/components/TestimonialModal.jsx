import { useState } from 'react';
import { X, Star, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '@/services/api';

export function TestimonialModal({ isOpen, onClose, onSubmitted }) {
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      setError('Please provide your name and a recommendation message.');
      return;
    }
    if (form.text.trim().length < 10) {
      setError('Recommendation should be at least 10 characters.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await api.submitTestimonial(form);
    setLoading(false);

    if (res.ok && res.data?.success) {
      setSuccess(true);
      if (onSubmitted) onSubmitted(res.data.data);
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: '', role: '', company: '', text: '', rating: 5 });
        onClose();
      }, 2000);
    } else {
      setError(res.data?.message || 'Failed to submit recommendation.');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between border-b border-border-primary pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-fg-primary">Leave a Recommendation</h3>
              <p className="text-xs text-fg-tertiary">Share your feedback or endorsement for Chaitanya</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-primary text-fg-secondary hover:text-accent-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <div className="my-8 text-center animate-fade-in">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-bold text-fg-primary">Thank You!</h4>
            <p className="mt-1 text-sm text-fg-secondary">
              Your endorsement has been recorded in the MERN database and is now live!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-fg-secondary">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3.5 py-2 text-sm text-fg-primary outline-none focus:border-accent-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-fg-secondary">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Engineering Lead"
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3.5 py-2 text-sm text-fg-primary outline-none focus:border-accent-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-fg-secondary">
                  Organization / Team
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. GitHub / Tech Co."
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3.5 py-2 text-sm text-fg-primary outline-none focus:border-accent-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-fg-secondary">
                Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className="p-1 text-yellow-400 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        form.rating >= star ? 'fill-yellow-400' : 'text-fg-tertiary/40'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-fg-secondary">
                Recommendation <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Share your experience working with Chaitanya or feedback on his MERN engineering capabilities..."
                className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3.5 py-2 text-sm text-fg-primary outline-none focus:border-accent-primary resize-none"
              />
            </div>

            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-sm font-medium text-fg-secondary hover:bg-bg-tertiary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {loading ? 'Submitting...' : 'Post Recommendation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
