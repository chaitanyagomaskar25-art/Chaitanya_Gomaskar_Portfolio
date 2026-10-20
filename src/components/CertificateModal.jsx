import { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Award, Calendar } from 'lucide-react';

export function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const hasPdf = certificate.pdfUrl.length > 0;
  const hasVerify = certificate.verifyUrl.length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} certificate preview`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-bg-secondary shadow-lg animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-fg-primary sm:text-xl">
                {certificate.title}
              </h3>
              <p className="flex items-center gap-1.5 text-sm text-fg-secondary">
                {certificate.issuer}
                {certificate.date && (
                  <>
                    <span className="text-fg-tertiary/50">·</span>
                    <Calendar className="h-3 w-3" />
                    {certificate.date}
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close certificate preview"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-primary text-fg-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <img
            src={certificate.image}
            alt={`${certificate.title} full certificate`}
            className="w-full rounded-xl border border-border-primary object-contain shadow-sm"
          />
          <p className="mt-4 text-sm text-fg-secondary text-balance">
            {certificate.description}
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col gap-2 border-t border-border-primary p-4 sm:flex-row sm:justify-end sm:p-6">
          {hasPdf && (
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-2 rounded-lg border border-border-primary px-4 py-2.5 text-sm font-medium text-fg-primary transition-all hover:border-accent-primary hover:text-accent-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </a>
          )}
          {hasVerify && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify Credential
              <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/btn:opacity-100" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
