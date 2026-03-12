import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, User, MessageSquare, RefreshCw, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInquiries = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(`${BACKEND_URL}/api/inquiries`);
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }
      const data = await response.json();
      setInquiries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-slate-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Website
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Sai Enterprises - Customer Inquiries</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/admin/products')}
              variant="outline"
              className="border-slate-300"
              data-testid="manage-products-btn"
            >
              <Package className="mr-2" size={20} />
              Manage Products
            </Button>
            <Button
              onClick={fetchInquiries}
              disabled={refreshing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={20} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Inquiries</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{inquiries.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {inquiries.filter(i => i.status === 'pending').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Contacted</CardDescription>
              <CardTitle className="text-3xl text-blue-600">
                {inquiries.filter(i => i.status === 'contacted').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Resolved</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {inquiries.filter(i => i.status === 'resolved').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Customer Inquiries</h2>
          </div>

          {inquiries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="mx-auto mb-4 text-slate-400" size={48} />
                <p className="text-slate-600 text-lg">No inquiries yet</p>
                <p className="text-slate-500 text-sm mt-2">Customer inquiries will appear here</p>
              </CardContent>
            </Card>
          ) : (
            inquiries.map((inquiry) => (
              <Card key={inquiry.inquiry_id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                          <User size={20} className="text-blue-600" />
                          {inquiry.name}
                        </CardTitle>
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail size={16} />
                          <a href={`mailto:${inquiry.email}`} className="hover:text-blue-600">
                            {inquiry.email}
                          </a>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={16} />
                            <a href={`tel:${inquiry.phone}`} className="hover:text-blue-600">
                              {inquiry.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {formatDate(inquiry.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Message:</p>
                    <p className="text-slate-800 whitespace-pre-wrap">{inquiry.message}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.location.href = `mailto:${inquiry.email}`}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Mail className="mr-2" size={16} />
                      Reply via Email
                    </Button>
                    {inquiry.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.location.href = `tel:${inquiry.phone}`}
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        <Phone className="mr-2" size={16} />
                        Call Customer
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
