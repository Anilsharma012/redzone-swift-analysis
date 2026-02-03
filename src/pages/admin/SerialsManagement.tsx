import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, XCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  getSerialNumbers, 
  addSerialNumber, 
  deleteSerialNumber,
  getProducts,
  SerialNumber,
  Product 
} from '@/lib/store';

export default function SerialsManagement() {
  const [serials, setSerials] = useState<SerialNumber[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [form, setForm] = useState({ code: '', productId: '' });
  const [bulkCodes, setBulkCodes] = useState('');
  const [bulkProductId, setBulkProductId] = useState('');

  useEffect(() => {
    setSerials(getSerialNumbers());
    setProducts(getProducts());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.productId) {
      toast.error('Code and product are required');
      return;
    }

    // Check if code already exists
    if (serials.find(s => s.code.toLowerCase() === form.code.toLowerCase())) {
      toast.error('This serial code already exists');
      return;
    }

    addSerialNumber({ code: form.code, productId: form.productId });
    toast.success('Serial number added successfully');

    setSerials(getSerialNumbers());
    setDialogOpen(false);
    setForm({ code: '', productId: '' });
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkCodes.trim() || !bulkProductId) {
      toast.error('Codes and product are required');
      return;
    }

    const codes = bulkCodes.split('\n').map(c => c.trim()).filter(c => c);
    let added = 0;
    let skipped = 0;

    codes.forEach(code => {
      if (serials.find(s => s.code.toLowerCase() === code.toLowerCase())) {
        skipped++;
      } else {
        addSerialNumber({ code, productId: bulkProductId });
        added++;
      }
    });

    toast.success(`Added ${added} serial numbers${skipped > 0 ? `, skipped ${skipped} duplicates` : ''}`);
    setSerials(getSerialNumbers());
    setBulkDialogOpen(false);
    setBulkCodes('');
    setBulkProductId('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this serial number?')) {
      deleteSerialNumber(id);
      setSerials(getSerialNumbers());
      toast.success('Serial number deleted successfully');
    }
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'HL-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setForm({ ...form, code });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-foreground uppercase tracking-wider">Serial Numbers</h1>
          <p className="text-muted-foreground mt-2">Manage QR codes & tracking numbers for product verification</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setBulkDialogOpen(true)} className="gap-2">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Serial
          </Button>
        </div>
      </div>

      {/* Serials Table */}
      <div className="gradient-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left p-4 font-display text-sm uppercase tracking-wider text-foreground">Code</th>
                <th className="text-left p-4 font-display text-sm uppercase tracking-wider text-foreground">Product</th>
                <th className="text-left p-4 font-display text-sm uppercase tracking-wider text-foreground">Status</th>
                <th className="text-left p-4 font-display text-sm uppercase tracking-wider text-foreground">Created</th>
                <th className="text-right p-4 font-display text-sm uppercase tracking-wider text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {serials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No serial numbers found. Add serial numbers for product verification.
                  </td>
                </tr>
              ) : (
                serials.map((serial) => {
                  const product = products.find(p => p.id === serial.productId);
                  return (
                    <tr key={serial.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <code className="text-sm font-mono bg-secondary px-2 py-1 rounded text-foreground">
                          {serial.code}
                        </code>
                      </td>
                      <td className="p-4 text-muted-foreground">{product?.name || 'Unknown'}</td>
                      <td className="p-4">
                        {serial.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-sm text-green-500">
                            <CheckCircle className="h-4 w-4" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <XCircle className="h-4 w-4" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(serial.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive" 
                            onClick={() => handleDelete(serial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Single Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl uppercase tracking-wider">
              Add Serial Number
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="code">Serial Code</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., HL-ABC12345"
                  className="bg-secondary border-border font-mono"
                />
                <Button type="button" variant="outline" onClick={generateRandomCode}>
                  Generate
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select value={form.productId} onValueChange={(v) => setForm({ ...form, productId: v })}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Serial
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Bulk Upload Dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl uppercase tracking-wider">
              Bulk Upload Serials
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBulkSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="bulkProduct">Product</Label>
              <Select value={bulkProductId} onValueChange={setBulkProductId}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bulkCodes">Serial Codes (one per line)</Label>
              <textarea
                id="bulkCodes"
                value={bulkCodes}
                onChange={(e) => setBulkCodes(e.target.value)}
                placeholder="HL-ABC12345&#10;HL-DEF67890&#10;HL-GHI11111"
                className="w-full h-40 rounded-md bg-secondary border border-border p-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setBulkDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Upload Serials
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
