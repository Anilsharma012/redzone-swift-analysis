import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, CheckCircle, LogOut, Search, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { 
  getCurrentUser, 
  logoutUser, 
  verifySerialNumber, 
  getUserVerifications,
  getProducts,
  VerificationRecord,
  Product
} from '@/lib/store';

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [verifications, setVerifications] = useState<VerificationRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchCode, setSearchCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth?redirect=/dashboard');
      return;
    }
    setVerifications(getUserVerifications(user.id));
    setProducts(getProducts());
  }, [user, navigate]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) {
      toast.error('Please enter a serial code');
      return;
    }

    setVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const result = verifySerialNumber(searchCode, user?.id);
      
      if (result.success) {
        toast.success('Product Verified!', {
          description: `${result.product?.name || 'Product'} is authentic.`,
        });
        setVerifications(getUserVerifications(user!.id));
      } else {
        toast.error('Verification Failed', {
          description: 'This serial code was not found in our system.',
        });
      }
      
      setSearchCode('');
      setVerifying(false);
    }, 1000);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-foreground uppercase tracking-wider">
                Welcome, {user.name}
              </h1>
              <p className="text-muted-foreground mt-2">Verify your products and view verification history</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Verification Card */}
          <div className="gradient-card rounded-2xl border border-border p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-foreground uppercase tracking-wider">Verify Product</h2>
                <p className="text-sm text-muted-foreground">Enter the serial code from your product packaging</p>
              </div>
            </div>
            
            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter QR code or serial number (e.g., HL-ABC12345)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  className="h-14 pl-10 bg-secondary border-border font-mono text-lg"
                  disabled={verifying}
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="h-14 px-8" disabled={verifying}>
                {verifying ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Verify Now
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Verification History */}
          <div className="gradient-card rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10">
                <Package className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h2 className="font-display text-xl text-foreground uppercase tracking-wider">Your Verified Products</h2>
                <p className="text-sm text-muted-foreground">{verifications.length} products verified</p>
              </div>
            </div>

            {verifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">You haven't verified any products yet</p>
                <p className="text-sm text-muted-foreground">Enter a serial code above to verify your first product</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {verifications.map((v) => {
                  const product = products.find(p => p.id === v.productId);
                  return (
                    <div key={v.id} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{product?.name || 'Unknown Product'}</p>
                          <code className="text-sm text-muted-foreground font-mono">{v.serialCode}</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date(v.verifiedAt).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
