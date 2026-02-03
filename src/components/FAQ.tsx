import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How can I verify if a product is authentic?',
    answer: 'Every HugeLabs product comes with a unique QR code. Simply scan the code with your smartphone to verify authenticity in our system. If the code is not found, the product may be counterfeit.',
  },
  {
    question: 'What is your delivery timeframe?',
    answer: 'We process and ship orders within 24 hours of purchase. Most deliveries are completed within 3-7 business days depending on your location. You can track your order in real-time.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to multiple countries worldwide. Shipping costs and delivery times vary by location. Contact our support team for international order details.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee if you\'re not satisfied with your purchase. Products must be unused and in original packaging. Contact customer service for return instructions.',
  },
  {
    question: 'Are your products safe?',
    answer: 'All our products are sourced from certified manufacturers and undergo rigorous quality testing. We only sell products that meet international safety standards and regulations.',
  },
  {
    question: 'Do you have customer support?',
    answer: 'Yes! Our expert support team is available 24/7 via email, chat, and phone. We\'re here to answer any questions about products, dosing, or anything else.',
  },
  {
    question: 'Can I get product recommendations?',
    answer: 'Absolutely! Our expert team can recommend products based on your fitness goals and needs. Contact our support team or visit our About page to learn more about personalized guidance.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital payment methods. All transactions are encrypted and secure. We use industry-standard security protocols.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-foreground-muted">
            Got questions? We have answers. Check out the most common questions below.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="gradient-card rounded-2xl border border-border overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-display text-lg text-foreground uppercase tracking-wider text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      'h-6 w-6 text-primary shrink-0 transition-transform duration-300',
                      openIndex === index && 'rotate-180'
                    )}
                  />
                </button>

                {/* Answer */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-8 pb-6 border-t border-border/50 text-foreground-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <p className="text-foreground-muted mb-4">
            Didn't find your answer?
          </p>
          <a
            href="/contact"
            className="text-primary font-bold hover:text-primary/80 transition-colors uppercase tracking-wider"
          >
            Contact Our Support Team →
          </a>
        </div>
      </div>
    </section>
  );
}
