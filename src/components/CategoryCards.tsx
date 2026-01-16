import { Link } from 'react-router-dom';
import proteinImg from '@/assets/category-protein.jpg';
import creatineImg from '@/assets/category-creatine.jpg';
import preworkoutImg from '@/assets/category-preworkout.jpg';
import vitaminsImg from '@/assets/category-vitamins.jpg';

const categories = [
  {
    title: 'Protein & Recovery',
    image: proteinImg,
    href: '/products/protein',
    label: 'Muscle Building',
  },
  {
    title: 'Strength & Power',
    image: creatineImg,
    href: '/products/creatine',
    label: 'Creatine',
  },
  {
    title: 'Pre-Workout & Energy',
    image: preworkoutImg,
    href: '/products/preworkout',
    label: 'Performance',
  },
  {
    title: 'Wellness & Vitamins',
    image: vitaminsImg,
    href: '/products/vitamins',
    label: 'Health',
  },
];

export function CategoryCards() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="section-title mb-16">
          Know Your Stack
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.href}
              className="group relative rounded-2xl overflow-hidden card-lift img-zoom opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Label */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  {category.label}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-wider underline-hover">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
