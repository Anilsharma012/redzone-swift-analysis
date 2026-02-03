import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { verifySerialNumber, getCurrentUser } from '@/lib/store';
import logoImg from '@/assets/logo-hugelabz.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'Products', 
    href: '/products',
    dropdown: [
      { name: 'Peptide', href: '/products/peptide' },
      { name: 'Injectable', href: '/products/injectable' },
      { name: 'Anti Obesity / Fat Loss', href: '/products/fat-loss' },
      { name: 'SERMs', href: '/products/serms' },
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVerifyProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      toast.error('Please enter a QR code or tracking number');
      return;
    }
    
    const user = getCurrentUser();
    const result = verifySerialNumber(trackingCode, user?.id);
    
    if (result.success) {
      toast.success('Product Verified!', {
        description: `${result.product?.name || 'Product'} is authentic and verified.`,
      });
    } else {
      toast.error('Verification Failed', {
        description: 'This code was not found in our system. Please check and try again.',
      });
    }
    
    setTrackingCode('');
    setVerifyDialogOpen(false);
  };

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
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="HugeLabs Health Supplement" className="h-14 w-auto" />
            <div className="hidden md:flex flex-col">
              <span className="font-display text-lg tracking-wider text-foreground leading-tight">HUGELABS</span>
              <span className="text-xs text-primary tracking-widest">HEALTH SUPPLEMENT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
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
                        'absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-200 z-50',
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

            {/* Verify Product Button */}
            <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 ml-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <QrCode className="h-4 w-4" />
                  <span>Verify Product</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl uppercase tracking-wider text-center">Verify Your Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Enter the QR code or tracking number found on your product packaging to verify authenticity.
                  </p>
                  <form onSubmit={handleVerifyProduct} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter QR code or tracking number"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        className="h-12 pl-10 bg-secondary border-border"
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      <QrCode className="h-4 w-4 mr-2" />
                      Verify Now
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center">
                    Protect yourself from counterfeit products. Only purchase from authorized retailers.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Verify Button */}
            <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <QrCode className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl uppercase tracking-wider text-center">Verify Your Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Enter the QR code or tracking number found on your product packaging to verify authenticity.
                  </p>
                  <form onSubmit={handleVerifyProduct} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter QR code or tracking number"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        className="h-12 pl-10 bg-secondary border-border"
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      <QrCode className="h-4 w-4 mr-2" />
                      Verify Now
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center">
                    Protect yourself from counterfeit products. Only purchase from authorized retailers.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
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
