import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-primary via-transparent to-primary" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
              <Zap className="h-8 w-8 text-primary" />
            </div>

            {/* Heading */}
            <h2 className="font-display text-5xl md:text-6xl text-foreground uppercase tracking-wider mb-6">
              Ready to Transform?
            </h2>

            {/* Subheading */}
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-8">
              Join thousands of athletes who have already achieved their performance goals with HugeLabs. 
              Your journey to elite performance starts today.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 py-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-foreground font-semibold">100% Verified Products</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-foreground font-semibold">Fast & Free Shipping</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-foreground font-semibold">30-Day Guarantee</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products" className="gap-2">
                  Start Shopping
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 pt-12 border-t border-border/30">
            <p className="text-center text-foreground-muted text-sm mb-6 uppercase tracking-wider">
              Trusted by athletes worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                <div className="text-xs">Customers</div>
              </div>
              <div className="w-1 h-12 bg-border/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs">Authentic</div>
              </div>
              <div className="w-1 h-12 bg-border/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4.9★</div>
                <div className="text-xs">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
