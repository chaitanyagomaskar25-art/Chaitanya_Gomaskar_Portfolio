import { Download, Eye, FileText, Info, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ResumeSection() {
  const { ref, visible } = useScrollReveal();

  const handleDownload = () => {
    if (profile.resumeAvailable) {
      const link = document.createElement('a');
      link.href = profile.resumePath;
      link.download = 'Full-Stack-Developer-Resume.pdf';
      link.click();
    }
  };

  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/3 top-1/2 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--orb-1)' }} />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`reveal-scale ${visible ? 'reveal-visible' : ''} relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-soft/40 to-transparent p-8 sm:p-12`}
        >
          <div className="relative flex flex-col items-center text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-primary">
              <FileText className="h-10 w-10" />
            </div>

            <div className="mt-6 flex-1 sm:mt-0 sm:ml-8">
              <h2 className="text-2xl font-extrabold text-fg-primary sm:text-3xl">
                My Resume
              </h2>
              <p className="mt-2 text-fg-secondary text-balance">
                Download my full resume to learn more about my experience, skills, and qualifications.
              </p>

              {profile.resumeAvailable ? (
                <div className="mt-6 flex flex-wrap gap-3 sm:justify-start">
                  <button
                    onClick={handleDownload}
                    className="group btn-lift flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                  >
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Download Resume
                  </button>
                  <a
                    href={profile.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-fg-primary transition-all hover:text-accent-primary"
                  >
                    <Eye className="h-4 w-4" />
                    View Resume
                    <ArrowRight className="h-3.5 w-3.5 arrow-hover" />
                  </a>
                </div>
              ) : (
                <div className="mt-6 flex items-start gap-3 text-left">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-fg-tertiary" />
                  <div>
                    <p className="text-sm font-medium text-fg-primary">
                      Resume not yet available
                    </p>
                    <p className="mt-1 text-xs text-fg-secondary">
                      Add your resume PDF file at{' '}
                      <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono">
                        public/resume.pdf
                      </code>{' '}
                      and set{' '}
                      <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono">
                        resumeAvailable: true
                      </code>{' '}
                      in{' '}
                      <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono">
                        src/data/profile.js
                      </code>{' '}
                      to enable the download.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
