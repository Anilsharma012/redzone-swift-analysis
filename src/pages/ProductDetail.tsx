import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrCode, Minus, Plus, Check, ChevronLeft, Search, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { verifySerialNumber, getCurrentUser, getProducts, Product } from '@/lib/store';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingCode, setTrackingCode] = useState('');
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await getProducts();
        setProducts(p);
        const currentProduct = p.find(prod => prod._id === id);
        if (currentProduct) {
          setProduct(currentProduct);
        }
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const relatedProducts = product ? products.filter((p) => p.category === product.category && p._id !== product._id).slice(0, 3) : [];
  const displayRelated = relatedProducts.length >= 3 
    ? relatedProducts 
    : products.filter((p) => p._id !== id).slice(0, 3);

  const handleVerifyProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      toast.error('Please enter a QR code or tracking number');
      return;
    }
    
    try {
      const user = getCurrentUser();
      const result = await verifySerialNumber(trackingCode, user?._id);
      if (result.success) {
        toast.success('Product Verified!', { description: `${result.product?.name || 'Product'} is authentic and verified.` });
      } else {
        toast.error('Verification Failed', { description: 'This code was not found in our system.' });
      }
    } catch (error) {
      toast.error('Verification failed');
    }
    setTrackingCode('');
    setVerifyDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center text-muted-foreground">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center text-muted-foreground">
          <p>Product not found.</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-background">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="gradient-card rounded-2xl border border-border overflow-hidden bg-secondary flex items-center justify-center min-h-[400px]">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                ) : (
                  <span className="text-muted-foreground uppercase font-display text-4xl">No Image</span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                {product.category}
              </span>

              <h1 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-wider">
                {product.name}
              </h1>

              {product.tagline && <p className="text-lg text-foreground-muted">{product.tagline}</p>}

              <div className="flex items-baseline gap-3">
                <span className="text-muted-foreground">{(product as any).servings || 'N/A'}</span>
              </div>

              <p className="text-foreground-muted leading-relaxed">{product.description}</p>

              {/* Key Benefits */}
              {(product as any).benefits && (product as any).benefits.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display text-xl text-foreground uppercase tracking-wider">Key Benefits</h3>
                  <ul className="space-y-2">
                    {(product as any).benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-foreground-muted">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verify Product Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="hero" size="xl" className="flex-1">
                      <QrCode className="h-5 w-5 mr-2" />
                      Verify Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl uppercase tracking-wider text-center">Verify {product.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-muted-foreground text-center">
                        Enter the QR code or tracking number from your product packaging.
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
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify Now
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="text-primary font-bold">{(product as any).highlight || 'Premium'}</span>
                <span className="text-muted-foreground">| {(product as any).goal || 'Performance'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Sections */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="gradient-card rounded-2xl border border-border p-8 animate-fade-in-up">
              <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-4">How to Use</h3>
              <p className="text-foreground-muted leading-relaxed">{(product as any).usage || 'Consult with a professional.'}</p>
            </div>
            <div className="gradient-card rounded-2xl border border-border p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-4">Ingredients</h3>
              <p className="text-foreground-muted leading-relaxed text-sm">{(product as any).ingredients || 'Pure formula.'}</p>
            </div>
          </div>

          {/* Supplement Facts Table */}
          {(product as any).supplementFacts && (
            <div className="mt-8 gradient-card rounded-2xl border border-border p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-display text-2xl text-foreground uppercase tracking-wider mb-6">Product Facts</h3>
              <div className="max-w-md">
                <div className="border-b-8 border-foreground pb-1 mb-2">
                  <p className="text-sm text-foreground-muted">Serving Size: {(product as any).supplementFacts.servingSize}</p>
                  <p className="text-sm text-foreground-muted">Servings Per Container: {(product as any).supplementFacts.servingsPerContainer}</p>
                </div>
                <div className="border-b border-foreground pb-1 mb-2">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>Amount Per Serving</span>
                    <span>% DV*</span>
                  </div>
                </div>
                {(product as any).supplementFacts.nutrients?.map((nutrient: any, i: number) => (
                  <div key={i} className="flex justify-between py-1 border-b border-border text-sm">
                    <span className="text-foreground">{nutrient.name}</span>
                    <div className="flex gap-4">
                      <span className="text-foreground-muted">{nutrient.amount}</span>
                      <span className="w-12 text-right text-foreground-muted">{nutrient.dv || '—'}</span>
                    </div>
                  </div>
                ))}
                <p className="mt-4 text-xs text-muted-foreground">
                  * Daily Value not established. Consult with a healthcare professional before use.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRelated.map((relProduct, index) => (
              <Link
                key={relProduct._id}
                to={`/product/${relProduct._id}`}
                className="group gradient-card rounded-2xl overflow-hidden card-lift border border-border opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-square overflow-hidden img-zoom bg-secondary flex items-center justify-center">
                  {relProduct.image ? (
                    <img src={relProduct.image} alt={relProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground uppercase font-display">No Image</span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">{relProduct.category}</span>
                  <h3 className="font-display text-xl text-foreground uppercase tracking-wide mt-2 mb-3">{relProduct.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span>{(relProduct as any).servings || 'N/A'}</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>{(relProduct as any).goal || 'Performance'}</span>
                  </div>
                  <Button variant="default" size="sm" asChild>
                    <span>View Details</span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ProductDetail;
