import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Award,
  Calendar,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
} from 'lucide-react';

export function CertificateModal({ certificate, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  if (!certificate || !mounted) return null;

  const hasVerify = Boolean(certificate.verifyUrl && certificate.verifyUrl.length > 0);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const resetZoom = () => setZoomLevel(1);

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      {/* Dark Ambient Backdrop attached to viewport */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container Centered in Viewport */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border-primary bg-bg-secondary shadow-2xl transition-all duration-300">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border-primary/80 bg-bg-secondary/90 px-5 py-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary shadow-sm">
              <Award className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3
                id="cert-modal-title"
                className="font-display text-base sm:text-lg font-bold text-fg-primary truncate"
              >
                {certificate.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-accent-primary">
                  {certificate.issuer}
                </span>
                {certificate.date && (
                  <>
                    <span className="text-fg-tertiary">·</span>
                    <span className="flex items-center gap-1 text-fg-tertiary">
                      <Calendar className="h-3 w-3" />
                      {certificate.date}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Zoom Controls */}
            <div className="hidden sm:flex items-center rounded-xl border border-border-primary bg-bg-tertiary/70 p-0.5">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoomLevel <= 0.75}
                title="Zoom Out"
                aria-label="Zoom Out"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-fg-secondary hover:text-fg-primary disabled:opacity-40"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                title="Reset Zoom"
                aria-label="Reset Zoom"
                className="px-2 text-[11px] font-mono font-semibold text-fg-secondary hover:text-accent-primary"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoomLevel >= 2.5}
                title="Zoom In"
                aria-label="Zoom In"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-fg-secondary hover:text-fg-primary disabled:opacity-40"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate preview"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-primary bg-bg-tertiary/70 text-fg-secondary transition-all hover:border-accent-primary hover:text-fg-primary hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-black/20 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[420px]">
          <div
            className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={certificate.image}
              alt={`${certificate.title} credential view`}
              className="max-h-[60vh] w-auto max-w-full rounded-2xl border border-border-primary/80 object-contain shadow-2xl bg-bg-tertiary"
            />
          </div>
        </div>

        {/* Certificate Description & Verification Details */}
        {certificate.description && (
          <div className="border-t border-border-primary/80 bg-bg-secondary px-5 py-3 sm:px-6">
            <p className="text-xs sm:text-sm leading-relaxed text-fg-secondary">
              {certificate.description}
            </p>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-primary/80 bg-bg-secondary/95 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-fg-tertiary">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Verified Professional Credential</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary rounded-xl px-4 py-2 text-xs font-semibold"
            >
              Close
            </button>

            {hasVerify && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-semibold shadow-md transition-all hover:shadow-glow"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>Verify on {certificate.issuer}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
