import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Gift, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email is too long" });

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    toast.success('Welcome to the Huge Pharma family!', {
      description: 'Check your inbox for your discount code.',
    });
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-8 animate-float">
            <Gift className="h-8 w-8 text-primary" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wider mb-4">
            Get <span className="text-primary">Exclusive</span> Updates
          </h2>

          <p className="text-lg text-foreground-muted mb-8 max-w-xl mx-auto">
            Join the Huge Pharma newsletter for exclusive deals, new product launches, and insider access to flash sales.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {['Free Shipping', 'Exclusive Deals', 'Early Access'].map((offer) => (
              <div key={offer} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-full text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-foreground-muted">{offer}</span>
              </div>
            ))}
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 pr-4 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary rounded-xl"
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="xl" disabled={isSubmitting} className="shrink-0">
                {isSubmitting ? 'Joining...' : 'Subscribe Now'}
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/10 border border-primary/20 rounded-xl max-w-lg mx-auto">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="text-foreground font-medium">You're subscribed! Check your email for updates.</span>
            </div>
          )}

          <p className="mt-6 text-xs text-muted-foreground">
            By subscribing, you agree to receive marketing emails from Huge Pharma. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}