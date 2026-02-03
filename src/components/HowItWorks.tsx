import { ShoppingCart, Truck, CheckCircle, Award } from 'lucide-react';

const steps = [
  {
    icon: ShoppingCart,
    step: 'Step 1',
    title: 'Browse & Select',
    description: 'Explore our wide range of premium health supplements and performance products. Each product comes with detailed information and customer reviews.',
  },
  {
    icon: CheckCircle,
    step: 'Step 2',
    title: 'Verify Authenticity',
    description: 'Every purchase includes a unique QR code. Scan it to verify that your product is 100% authentic and registered in our system.',
  },
  {
    icon: Truck,
    step: 'Step 3',
    title: 'Fast Delivery',
    description: 'We process and ship your order within 24 hours. Track your package in real-time and receive updates every step of the way.',
  },
  {
    icon: Award,
    step: 'Step 4',
    title: 'Enjoy Results',
    description: 'Start your journey to peak performance. Our expert support team is always available if you need guidance or have questions.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mb-6">How It Works</h2>
          <p className="text-lg text-foreground-muted">
            Getting your premium supplements is easy. Follow these simple steps and start transforming your performance today.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                {/* Step Card */}
                <div className="gradient-card rounded-2xl border border-border p-8 h-full">
                  {/* Step Number */}
                  <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-foreground uppercase tracking-wider mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item and on mobile) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-3 top-1/3 z-10">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-primary to-primary/0" />
                    <div className="w-0 h-0 border-t-3 border-b-3 border-l-6 border-t-transparent border-b-transparent border-l-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
