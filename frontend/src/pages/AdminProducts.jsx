import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Pencil, Trash2, RefreshCw, Image, X, Save, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CATEGORY_OPTIONS = [
  "Lathe Tools - Turning",
  "Lathe Tools - Boring",
  "Lathe Tools - Threading",
  "Lathe Tools - Facing",
  "Lathe Tools - Parting",
  "Milling Tools",
  "Traub Tools",
  "Carbide Scrap",
];

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: CATEGORY_OPTIONS[0], image: '' });
  const [submitting, setSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.image) {
      toast.error('All fields are required');
      return;
    }
    setSubmitting(true);
    try {
      const url = editingProduct
        ? `${BACKEND_URL}/api/products/${editingProduct.product_id}`
        : `${BACKEND_URL}/api/products`;
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success(editingProduct ? 'Product updated!' : 'Product added!');
      setShowForm(false);
      setEditingProduct(null);
      setFormData({ name: '', category: CATEGORY_OPTIONS[0], image: '' });
      fetchProducts();
    } catch (err) {
      toast.error('Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, category: product.category, image: product.image });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: '', category: CATEGORY_OPTIONS[0], image: '' });
  };

  const filteredProducts = filterCategory === 'all'
    ? products
    : products.filter(p => p.category === filterCategory);

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <RefreshCw className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" data-testid="admin-products-page">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/admin')} data-testid="back-to-admin-btn">
                <ArrowLeft className="mr-2" size={20} />
                Admin
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Product Management</h1>
                <p className="text-slate-600 text-sm">{products.length} total products</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchProducts} variant="outline" data-testid="refresh-products-btn">
                <RefreshCw size={18} className="mr-1" /> Refresh
              </Button>
              <Button onClick={() => { cancelForm(); setShowForm(true); }} className="bg-blue-600 hover:bg-blue-700" data-testid="add-product-btn">
                <Plus size={18} className="mr-1" /> Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-6 border-blue-200 shadow-lg" data-testid="product-form">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                {editingProduct ? <Pencil size={20} /> : <Plus size={20} />}
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
                    <Input
                      data-testid="product-name-input"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Turning Tool - Type 1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                    <select
                      data-testid="product-category-select"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {CATEGORY_OPTIONS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Image URL *</label>
                    <Input
                      data-testid="product-image-input"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                      required
                    />
                  </div>
                </div>
                {formData.image && (
                  <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden border">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700" data-testid="save-product-btn">
                    <Save size={16} className="mr-1" />
                    {submitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelForm} data-testid="cancel-product-btn">
                    <X size={16} className="mr-1" /> Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6" data-testid="category-filters">
          <Button
            variant={filterCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterCategory('all')}
            className={filterCategory === 'all' ? 'bg-blue-600' : ''}
          >
            All ({products.length})
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={filterCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(cat)}
              className={filterCategory === cat ? 'bg-blue-600' : ''}
            >
              {cat} ({products.filter(p => p.category === cat).length})
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="mx-auto mb-4 text-slate-400" size={48} />
              <p className="text-slate-600">No products found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="products-grid">
            {filteredProducts.map(product => (
              <Card key={product.product_id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`product-card-${product.product_id}`}>
                <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <Image className="text-slate-300" size={48} />
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-slate-900 text-sm truncate" title={product.name}>{product.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{product.category}</Badge>
                  <div className="flex gap-1 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(product)}
                      className="flex-1 text-xs"
                      data-testid={`edit-product-${product.product_id}`}
                    >
                      <Pencil size={14} className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(product.product_id)}
                      className="flex-1 text-xs text-red-600 border-red-200 hover:bg-red-50"
                      data-testid={`delete-product-${product.product_id}`}
                    >
                      <Trash2 size={14} className="mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
