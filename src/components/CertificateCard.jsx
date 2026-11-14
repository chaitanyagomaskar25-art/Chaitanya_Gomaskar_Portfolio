import { ExternalLink, ShieldCheck, Eye, Award } from 'lucide-react';

export function CertificateCard({ certificate, onView }) {
  const hasVerify = Boolean(certificate.verifyUrl && certificate.verifyUrl.length > 0);

  return (
    <article className="bento-card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-tertiary">
        <img
          src={certificate.image}
          alt={`${certificate.title} credential`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          <Award className="h-3.5 w-3.5 text-amber-400" />
          <span>{certificate.issuer}</span>
        </div>

        <button
          onClick={() => onView(certificate)}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 rounded-xl bg-white px-4 py-1.5 text-xs font-bold text-slate-900 shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5 text-accent-primary" />
          Inspect
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold text-fg-primary line-clamp-1 transition-colors group-hover:text-accent-primary">
          {certificate.title}
        </h3>

        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="font-semibold text-accent-primary">{certificate.issuer}</span>
          {certificate.date && <span className="text-fg-tertiary">{certificate.date}</span>}
        </div>

        <p className="mt-2.5 line-clamp-2 flex-1 text-xs leading-relaxed text-fg-secondary">
          {certificate.description}
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-border-primary/60 pt-3.5">
          <button
            onClick={() => onView(certificate)}
            className="btn-primary flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-semibold shadow-sm"
          >
            <Eye className="h-3.5 w-3.5" />
            Inspect
          </button>

          {hasVerify && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex flex-1 items-center justify-center gap-1.5 py-2 text-xs font-semibold"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Verify
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
