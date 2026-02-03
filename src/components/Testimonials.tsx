import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Kumar',
    role: 'Professional Athlete',
    image: '👨‍🏫',
    rating: 5,
    text: 'HugeLabs products have completely transformed my performance. The quality is unmatched and I love the authenticity verification feature. Highly recommended!',
  },
  {
    name: 'Priya Singh',
    role: 'Fitness Coach',
    image: '👩‍🏫',
    rating: 5,
    text: 'I recommend HugeLabs to all my clients. The results are incredible, and knowing that every product is verified gives me complete peace of mind.',
  },
  {
    name: 'Arun Patel',
    role: 'Bodybuilder',
    image: '💪',
    rating: 5,
    text: 'Best supplements I\'ve ever used. The customer service is exceptional and the delivery is super fast. Worth every penny!',
  },
  {
    name: 'Sameer Reddy',
    role: 'Fitness Enthusiast',
    image: '🏋️',
    rating: 5,
    text: 'Finally found a reliable source for quality supplements. HugeLabs has exceeded all my expectations. Game changer!',
  },
  {
    name: 'Maya Verma',
    role: 'Elite Sports Person',
    image: '🌟',
    rating: 5,
    text: 'The attention to detail and commitment to authenticity sets HugeLabs apart. I trust them with my health and fitness.',
  },
  {
    name: 'Vikram Singh',
    role: 'Personal Trainer',
    image: '🥇',
    rating: 5,
    text: 'My clients have seen amazing results with HugeLabs products. The verified authenticity guarantee is exactly what we needed.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mb-6">What Our Customers Say</h2>
          <p className="text-lg text-foreground-muted">
            Real testimonials from real athletes who have transformed their performance with HugeLabs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="gradient-card rounded-2xl border border-border p-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h3 className="font-display text-lg text-foreground uppercase tracking-wider">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-primary font-semibold">{testimonial.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground-muted leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
