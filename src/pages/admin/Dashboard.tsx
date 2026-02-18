import { useState, useEffect } from 'react';
import { Package, FolderTree, QrCode, CheckCircle } from 'lucide-react';
import { getProducts, getCategories, getSerialNumbers, getVerifications, Product, Category, SerialNumber, VerificationRecord } from '@/lib/store';
import { toast } from 'sonner';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [serials, setSerials] = useState<SerialNumber[]>([]);
  const [verifications, setVerifications] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, c, s, v] = await Promise.all([
          getProducts(),
          getCategories(),
          getSerialNumbers(),
          getVerifications()
        ]);
        setProducts(p);
        setCategories(c);
        setSerials(s);
        setVerifications(v);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { name: 'Total Products', value: products.length, icon: Package, color: 'text-blue-500' },
    { name: 'Categories', value: categories.length, icon: FolderTree, color: 'text-green-500' },
    { name: 'Serial Numbers', value: serials.length, icon: QrCode, color: 'text-purple-500' },
    { name: 'Verified Products', value: verifications.length, icon: CheckCircle, color: 'text-primary' },
  ];

  const recentVerifications = verifications.slice(-5).reverse();

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground uppercase tracking-wider">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to HugeLabs Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="gradient-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Verifications */}
      <div className="gradient-card rounded-2xl border border-border p-6">
        <h2 className="font-display text-xl text-foreground uppercase tracking-wider mb-4">Recent Verifications</h2>
        {recentVerifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No verifications yet</p>
        ) : (
          <div className="space-y-4">
            {recentVerifications.map((v) => {
              const productId = typeof v.productId === 'string' ? v.productId : v.productId?._id;
              const product = products.find(p => p._id === productId);
              return (
                <div key={v._id} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">{product?.name || 'Unknown Product'}</p>
                    <p className="text-sm text-muted-foreground">Code: {v.serialCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">Verified</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(v.verifiedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
