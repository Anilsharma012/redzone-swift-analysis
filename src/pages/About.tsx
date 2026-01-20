import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Shield, Eye, Zap, FlaskConical } from 'lucide-react';
import heroImg from '@/assets/hero-gym.jpg';

const values = [
  { icon: Shield, title: 'Quality First', description: 'Every batch tested for purity and potency. No shortcuts, no compromises.' },
  { icon: Eye, title: 'Full Transparency', description: 'Complete ingredient lists. No proprietary blends hiding inferior ingredients.' },
  { icon: Zap, title: 'Peak Performance', description: 'Formulas designed with athletes, for athletes. Real results you can measure.' },
  { icon: FlaskConical, title: 'Lab Tested', description: 'Third-party verified for safety. Every product meets the highest standards.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="HugeLabs Athletes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="section-title text-left mb-6">Our Story</h1>
            <p className="text-lg text-foreground-muted leading-relaxed">
              HugeLabs Health Supplement was born from a simple frustration: too many supplements promise everything and deliver nothing. 
              Founded by athletes who were tired of gimmicks, we set out to create what the industry was missing—pure, 
              powerful formulas that actually work.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wider mb-6">
                Built for <span className="text-primary">Champions</span>
              </h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  We don't just make supplements—we fuel ambition. Every product in the HugeLabs lineup is designed 
                  with one goal: to help you unlock your maximum potential.
                </p>
                <p>
                  From the gym floor to the competition stage, our formulas deliver the edge you need. No fillers. 
                  No empty promises. Just pure performance nutrition backed by science.
                </p>
                <p>
                  Join thousands of athletes who trust HugeLabs to power their journey. Because when you're serious 
                  about results, you need a brand that's serious about quality.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="gradient-card rounded-2xl p-6 border border-border opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-display text-lg text-foreground uppercase tracking-wider mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Athletes Served' },
              { number: '25+', label: 'Premium Products' },
              { number: '100%', label: 'Tested Products' },
              { number: '4.9', label: 'Customer Rating' },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="font-display text-5xl md:text-6xl text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
