import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days within the US. Express shipping (1-2 business days) is available at checkout. International shipping varies by location.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship to over 50 countries worldwide. International orders typically arrive within 7-14 business days depending on your location and customs processing.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your purchase, contact us for a full refund or exchange. Products must be unopened and in original packaging.',
  },
  {
    question: 'Are your products third-party tested?',
    answer: 'Absolutely. Every batch of every product is tested by independent third-party labs for purity, potency, and safety. Certificates of analysis are available upon request.',
  },
  {
    question: 'How should I store my supplements?',
    answer: 'Store in a cool, dry place away from direct sunlight. Keep containers tightly closed. Most products have a 2-year shelf life from manufacture date.',
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-background-tertiary to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: Mail, title: 'Email Us', content: 'support@redzone.com', href: 'mailto:support@redzone.com' },
              { icon: Phone, title: 'Call Us', content: '1-800-123-4567', href: 'tel:+18001234567' },
              { icon: MapPin, title: 'Visit Us', content: '123 Fitness Ave, Los Angeles, CA 90001', href: '#' },
              { icon: Clock, title: 'Business Hours', content: 'Mon-Fri: 9AM-6PM PST', href: '#' },
            ].map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className="gradient-card rounded-2xl p-6 border border-border flex items-start gap-4 hover:border-primary transition-colors opacity-0 animate-fade-in-up block"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-foreground uppercase tracking-wider">{item.title}</h3>
                  <p className="text-muted-foreground mt-1">{item.content}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="gradient-card rounded-2xl border border-border p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="font-display text-2xl text-foreground uppercase tracking-wider mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm uppercase tracking-wider">First Name</Label>
                    <Input id="firstName" placeholder="John" className="h-12 bg-secondary border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm uppercase tracking-wider">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="h-12 bg-secondary border-border focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm uppercase tracking-wider">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="h-12 bg-secondary border-border focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm uppercase tracking-wider">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="h-12 bg-secondary border-border focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm uppercase tracking-wider">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} className="bg-secondary border-border focus:border-primary resize-none" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-24">
          <h2 className="section-title mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="gradient-card rounded-2xl border border-border px-6 data-[state=open]:border-primary transition-colors"
                >
                  <AccordionTrigger className="font-display text-lg text-foreground uppercase tracking-wider py-6 hover:no-underline hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
