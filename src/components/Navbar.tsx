import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'Products', 
    href: '/products',
    dropdown: [
      { name: 'Protein & Recovery', href: '/products/protein' },
      { name: 'Strength & Power', href: '/products/creatine' },
      { name: 'Pre-Workout & Energy', href: '/products/preworkout' },
      { name: 'Wellness & Vitamins', href: '/products/vitamins' },
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Authenticate', href: '/auth' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-3xl tracking-wider text-primary">RZ</span>
            <span className="hidden sm:block font-display text-2xl tracking-widest text-foreground">/</span>
            <span className="hidden sm:block font-display text-2xl tracking-widest text-foreground">REDZONE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 font-medium text-sm uppercase tracking-wider transition-colors underline-hover py-2',
                        location.pathname.startsWith('/products') 
                          ? 'text-primary' 
                          : 'text-foreground-muted hover:text-foreground'
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')} />
                    </button>
                    
                    {/* Dropdown */}
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-200',
                        dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-3 text-sm text-foreground-muted hover:text-foreground hover:bg-secondary transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      'font-medium text-sm uppercase tracking-wider transition-colors underline-hover py-2',
                      location.pathname === link.href 
                        ? 'text-primary' 
                        : 'text-foreground-muted hover:text-foreground'
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileOpen ? 'max-h-96 pb-6' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <span className="font-medium text-sm uppercase tracking-wider text-foreground-muted">
                      {link.name}
                    </span>
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      'font-medium text-sm uppercase tracking-wider transition-colors',
                      location.pathname === link.href 
                        ? 'text-primary' 
                        : 'text-foreground-muted hover:text-foreground'
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
