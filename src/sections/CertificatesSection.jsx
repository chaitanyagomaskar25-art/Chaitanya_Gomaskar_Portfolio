import { Award } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { CertificatesCarousel } from '@/components/CertificatesCarousel';
import { certificates } from '@/data/certificates';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function CertificatesSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="certificates" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--orb-2)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Professional Certificates"
          subtitle="Verified credentials and certifications I've earned."
          icon={Award}
        />

        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <CertificatesCarousel certificates={certificates} />
        </div>
      </div>
    </section>
  );
}
