import { useState, useEffect } from 'react';
import { MessageSquareQuote, Star, PlusCircle, Quote, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { TestimonialModal } from '@/components/TestimonialModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { api } from '@/services/api';

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const list = await api.getTestimonials();
    setTestimonials(list);
  };

  const handleSubmitted = (newTestimonial) => {
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/3 top-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--orb-2)' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-end mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Peer Reviews &amp; Social Proof"
            title="Endorsements"
            subtitle="Feedback from engineering colleagues, mentors, and collaborative partners."
            icon={MessageSquareQuote}
            align="left"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary flex items-center gap-2 px-4 py-2.5 text-xs font-semibold shadow-sm shrink-0"
          >
            <PlusCircle className="h-4 w-4 text-accent-primary" />
            Leave an Endorsement
          </button>
        </div>

        <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <article
                key={item.id || item._id || index}
                className="bento-card group flex flex-col justify-between p-6 sm:p-7 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* 5-star rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="h-5 w-5 text-accent-primary/30 group-hover:text-accent-primary transition-colors" />
                  </div>

                  <p className="text-sm leading-relaxed text-fg-secondary italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-border-primary/60 pt-4">
                  <img
                    src={item.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className="h-10 w-10 rounded-full border border-border-primary object-cover bg-bg-tertiary"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-fg-primary">{item.name}</h4>
                    <p className="text-xs text-fg-tertiary">
                      {item.role}{item.company ? ` • ${item.company}` : ''}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </section>
  );
}
