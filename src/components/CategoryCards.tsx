import { Link } from 'react-router-dom';
import proteinImg from '@/assets/category-protein.jpg';
import creatineImg from '@/assets/category-creatine.jpg';
import preworkoutImg from '@/assets/category-preworkout.jpg';
import vitaminsImg from '@/assets/category-vitamins.jpg';

const categories = [
  {
    id: 'peptide',
    name: 'Peptide',
    description: 'Advanced peptide compounds',
    image: proteinImg,
    href: '/products/peptide',
  },
  {
    id: 'injectable',
    name: 'Injectable',
    description: 'Premium injectable solutions',
    image: creatineImg,
    href: '/products/injectable',
  },
  {
    id: 'fat-loss',
    name: 'Anti Obesity / Fat Loss',
    description: 'Effective weight management',
    image: preworkoutImg,
    href: '/products/fat-loss',
  },
  {
    id: 'serms',
    name: 'SERMs',
    description: 'Selective modulators',
    image: vitaminsImg,
    href: '/products/serms',
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.href}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] card-lift opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Image */}
              <div className="absolute inset-0 img-zoom">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {/* Label */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  Featured
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-2 underline-hover inline-block">
                  {category.name}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
