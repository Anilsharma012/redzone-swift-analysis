export function Stats() {
  const stats = [
    {
      number: '50K+',
      label: 'Happy Customers',
      description: 'Across the world trusting our products',
    },
    {
      number: '200+',
      label: 'Premium Products',
      description: 'Carefully selected and verified',
    },
    {
      number: '99.9%',
      label: 'Authenticity Rate',
      description: 'Every product verified with QR codes',
    },
    {
      number: '24/7',
      label: 'Expert Support',
      description: 'Always available to help you',
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-primary via-transparent to-primary" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mb-6">By The Numbers</h2>
          <p className="text-lg text-foreground-muted">
            HugeLabs is trusted by thousands of athletes and fitness enthusiasts worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Number */}
              <div className="text-5xl md:text-6xl font-bold text-primary mb-3">
                {stat.number}
              </div>

              {/* Label */}
              <h3 className="font-display text-xl text-foreground uppercase tracking-wider mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-foreground-muted">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
