import { ExternalLink, ShieldCheck, Eye, Award } from 'lucide-react';

export function CertificateCard({ certificate, onView }) {
  const hasVerify = certificate.verifyUrl.length > 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-bg-secondary shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
        <img
          src={certificate.image}
          alt={`${certificate.title} certificate preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Award icon */}
        <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-accent-primary backdrop-blur-sm">
          <Award className="h-4 w-4" />
        </div>

        <button
          onClick={() => onView(certificate)}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-fg-primary transition-colors group-hover:text-accent-primary">
          {certificate.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent-primary">
          {certificate.issuer}
        </p>
        {certificate.date && (
          <p className="mt-0.5 text-xs text-fg-tertiary">{certificate.date}</p>
        )}
        <p className="mt-2 flex-1 text-sm text-fg-secondary text-balance">
          {certificate.description}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onView(certificate)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Eye className="h-4 w-4" />
            View Certificate
          </button>
          {hasVerify && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-fg-primary transition-all hover:bg-bg-tertiary hover:text-accent-primary"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify
              <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/btn:opacity-100" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
