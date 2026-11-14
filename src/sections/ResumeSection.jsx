import { Download, Eye, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { profile } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ResumeSection() {
  const { ref, visible } = useScrollReveal();

  const handleDownload = () => {
    if (profile.resumeAvailable) {
      const link = document.createElement('a');
      link.href = profile.resumePath;
      link.download = 'Chaitanya_Gomaskar_FSDI_Resume.pdf';
      link.click();
    }
  };

  return (
    <section id="resume" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal-scale ${visible ? 'reveal-visible' : ''} bento-card relative overflow-hidden p-8 sm:p-12 shadow-lg`}
        >
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary shadow-sm">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent-primary">
                  Curriculum Vitae
                </span>
                <h3 className="font-display mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-fg-primary">
                  Review Complete Credentials
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-secondary">
                  Download my full resume for an in-depth breakdown of my technical projects, architectural capabilities, and academic accomplishments.
                </p>
              </div>
            </div>

            {profile.resumeAvailable && (
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold shadow-md"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </button>
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold"
                >
                  <Eye className="h-4 w-4 text-fg-secondary" />
                  Preview
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
