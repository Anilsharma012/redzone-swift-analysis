import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { verifySerialNumber, getCurrentUser } from '@/lib/store';
import logoImg from '@/assets/logo-hugepharma.png';

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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

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

  const verifyDialog = (
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
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Huge Pharma" className="h-14 w-auto" />
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
                    <Link
                      to={link.href}
                      className={cn(
                        'flex items-center gap-1 font-medium text-sm uppercase tracking-wider transition-colors underline-hover py-2',
                        location.pathname.startsWith('/products') 
                          ? 'text-primary' 
                          : 'text-foreground-muted hover:text-foreground'
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')} />
                    </Link>
                    
                    {/* Dropdown */}
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-0 pt-2 w-56 z-50',
                        dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}
                    >
                      <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-3 text-sm text-foreground-muted hover:text-foreground hover:bg-secondary transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
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
              {verifyDialog}
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
              {verifyDialog}
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
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div
        className={cn(
          'fixed inset-0 top-20 z-50 bg-background/98 backdrop-blur-lg lg:hidden transition-all duration-300',
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className="flex items-center justify-between w-full font-medium text-lg uppercase tracking-wider text-foreground py-3 border-b border-border"
                    >
                      {link.name}
                      <ChevronDown className={cn('h-5 w-5 transition-transform', mobileDropdownOpen && 'rotate-180')} />
                    </button>
                    <div className={cn(
                      'overflow-hidden transition-all duration-300',
                      mobileDropdownOpen ? 'max-h-60' : 'max-h-0'
                    )}>
                      <div className="pl-4 py-2 flex flex-col gap-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="text-base text-muted-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      'font-medium text-lg uppercase tracking-wider transition-colors py-3 border-b border-border block',
                      location.pathname === link.href 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Verify Product Button */}
            <Button 
              variant="hero" 
              size="lg" 
              className="mt-6 w-full"
              onClick={() => {
                setIsMobileOpen(false);
                setVerifyDialogOpen(true);
              }}
            >
              <QrCode className="h-5 w-5 mr-2" />
              Verify Product
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}