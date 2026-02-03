import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  Category 
} from '@/lib/store';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', image: '' });

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) {
      toast.error('Name and slug are required');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, form);
      toast.success('Category updated successfully');
    } else {
      addCategory(form);
      toast.success('Category added successfully');
    }

    setCategories(getCategories());
    setDialogOpen(false);
    setEditingCategory(null);
    setForm({ name: '', slug: '', image: '' });
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      slug: category.slug,
      image: category.image,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      setCategories(getCategories());
      toast.success('Category deleted successfully');
    }
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setForm({ name: '', slug: '', image: '' });
    setDialogOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground uppercase tracking-wider">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage product categories</p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No categories found. Add your first category.
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="gradient-card rounded-2xl border border-border p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">IMG</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="font-display text-lg text-foreground uppercase tracking-wider">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">/{category.slug}</p>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl uppercase tracking-wider">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm({ 
                    ...form, 
                    name,
                    slug: editingCategory ? form.slug : generateSlug(name)
                  });
                }}
                placeholder="e.g., Peptide"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="e.g., peptide"
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/placeholder.svg"
                className="bg-secondary border-border"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingCategory ? 'Update' : 'Add'} Category
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
