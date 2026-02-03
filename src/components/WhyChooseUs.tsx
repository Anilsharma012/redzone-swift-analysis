import { Shield, Zap, Award, TrendingUp, Users, Lock } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Verified Authenticity',
    description: 'Every product comes with QR code verification to ensure you get 100% authentic products, not counterfeits.',
  },
  {
    icon: Zap,
    title: 'Premium Quality',
    description: 'We only source from trusted manufacturers. Each product undergoes rigorous testing and quality control.',
  },
  {
    icon: Award,
    title: 'Elite Grade Formulas',
    description: 'Formulated for serious athletes and professionals. Backed by research and proven results.',
  },
  {
    icon: TrendingUp,
    title: 'Real Results',
    description: 'Thousands of satisfied customers have achieved their performance goals with our products.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our team of experts is available 24/7 to help you choose the right products for your goals.',
  },
  {
    icon: Lock,
    title: 'Secure & Safe',
    description: 'Your privacy and security are our top priority. All transactions are encrypted and secure.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mb-6">Why Choose HugeLabs?</h2>
          <p className="text-lg text-foreground-muted">
            We're committed to providing premium health supplements with uncompromising quality, 
            authenticity, and customer satisfaction.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="gradient-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <IconComponent className="h-7 w-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-foreground uppercase tracking-wider mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-foreground-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
