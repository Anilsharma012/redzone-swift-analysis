import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-gym.jpg';
import logoImg from '@/assets/logo-hugelabs.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elite athlete training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 overlay-gradient" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Brand Logo */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <img 
              src={logoImg} 
              alt="HugeLabs Health Supplement" 
              className="h-32 md:h-40 w-auto mx-auto animate-pulse-glow"
            />
          </div>
          
          {/* Headline */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground uppercase tracking-wider mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            Unlock Your Performance
          </h1>
          
          {/* Subtext */}
          <p 
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            Premium Health Supplements & Performance Products for serious athletes. 
            Fuel your ambition with elite-grade formulas.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/products">Shop Products</Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/50 rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
}
