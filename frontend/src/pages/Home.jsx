import React, { useState } from 'react';
import { Phone, Mail, MapPin, Star, Clock, Send, Menu, X, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { toast } from 'sonner';
import { shopInfo, services, products, reviews, categories } from '../mockData';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Inquiry submitted successfully! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{shopInfo.name}</h1>
              <p className="text-sm text-slate-600">{shopInfo.tagline}</p>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('products')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Products</button>
              <button onClick={() => scrollToSection('reviews')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Contact</button>
              <Button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700">
                Get Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <button onClick={() => scrollToSection('home')} className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">Services</button>
              <button onClick={() => scrollToSection('products')} className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">Products</button>
              <button onClick={() => scrollToSection('reviews')} className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2">Contact</button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-orange-50 opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              ⭐ Rated {shopInfo.rating}/5 by {shopInfo.totalReviews} customers
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Premium <span className="text-blue-600">Lathe Machine Tools</span> & Industrial Hardware
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {shopInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('contact')} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 w-full sm:w-auto"
              >
                Request Quote
              </Button>
              <Button 
                onClick={() => window.location.href = `tel:${shopInfo.phone}`}
                size="lg" 
                variant="outline" 
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 text-lg px-8 py-6 w-full sm:w-auto"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </Button>
            </div>
            
            {/* Quick Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <Clock className="mx-auto mb-3 text-blue-600" size={32} />
                <p className="font-semibold text-slate-800">Working Hours</p>
                <p className="text-sm text-slate-600">{shopInfo.hours.weekdays}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <MapPin className="mx-auto mb-3 text-orange-600" size={32} />
                <p className="font-semibold text-slate-800">Location</p>
                <p className="text-sm text-slate-600">Bhosari, Pune</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <Phone className="mx-auto mb-3 text-green-600" size={32} />
                <p className="font-semibold text-slate-800">Call Us</p>
                <p className="text-sm text-slate-600">{shopInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive range of industrial tools and services to meet all your machining needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = Icons[service.icon] || Icons.Settings;
              return (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-slate-200">
                  <CardHeader>
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="text-blue-600" size={28} />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600 text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {service.subtypes && service.subtypes.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="subtypes" className="border-slate-200">
                          <AccordionTrigger className="text-blue-600 hover:text-blue-700 font-semibold text-sm py-2">
                            View Types ({service.subtypes.length})
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 pt-2">
                              {service.subtypes.map((subtype, index) => (
                                <div key={index} className="border-l-2 border-blue-200 pl-3 py-1">
                                  <h4 className="font-semibold text-slate-800 text-sm">{subtype.name}</h4>
                                  <p className="text-xs text-slate-600 mt-1">{subtype.description}</p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <div className="text-center py-2">
                        <Button 
                          onClick={() => scrollToSection('contact')} 
                          variant="outline" 
                          size="sm"
                          className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          Contact for Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              High-quality tools and equipment for professional industrial applications
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <Badge key={category.id} variant="outline" className="px-4 py-2 text-sm border-slate-300 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition-colors">
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">{product.category}</Badge>
                  </div>
                  <CardTitle className="text-xl text-slate-900">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">{product.description}</CardDescription>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => scrollToSection('contact')}>
                    Inquiry Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={24} />
                ))}
              </div>
              <span className="text-2xl font-bold text-slate-900">{shopInfo.rating}</span>
              <span className="text-slate-600">({shopInfo.totalReviews} reviews)</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-slate-900">{review.name}</CardTitle>
                      <p className="text-sm text-slate-500">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 italic">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions or need a quote? Contact us today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      required
                      className="border-slate-300"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                    <Send className="mr-2" size={20} />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                      <p className="text-slate-600">{shopInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                      <a href={`tel:${shopInfo.phone}`} className="text-blue-600 hover:underline block">{shopInfo.phone}</a>
                      <a href={`tel:${shopInfo.phone2}`} className="text-blue-600 hover:underline block">{shopInfo.phone2}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <a href={`mailto:${shopInfo.email}`} className="text-blue-600 hover:underline">{shopInfo.email}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Business Hours</h3>
                      <p className="text-slate-600">Mon-Wed, Fri-Sun: {shopInfo.hours.weekdays}</p>
                      <p className="text-slate-600">Thu: {shopInfo.hours.thursday}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="shadow-lg overflow-hidden">
                <div className="h-64 bg-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2766728832157!2d73.84580431490063!3d18.629800287342856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9ea83eba0dd%3A0x4e24aae87f3ef86!2sSai%20Enterprises%20%7C%20Lathe%20Machine%20Tools%20%7C%20Purchase%20of%20Carbide%20Scrap!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Sai Enterprises Location"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">{shopInfo.name}</h3>
              <p className="text-slate-400 mb-4">{shopInfo.tagline}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                  ))}
                </div>
                <span className="text-slate-400">({shopInfo.totalReviews} reviews)</span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2 text-slate-300">Directors</h4>
                {shopInfo.directors.map((director, index) => (
                  <p key={index} className="text-slate-400 text-sm">{director.name} - {director.title}</p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-slate-400 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-slate-400 hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('products')} className="text-slate-400 hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="text-slate-400 hover:text-white transition-colors">Reviews</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Lathe Machine Tools</li>
                <li>M1TR Machine</li>
                <li>Traub Machine Tools</li>
                <li>Customised Lathe Tools</li>
                <li>Milling Inserts</li>
                <li>Brazing Services</li>
                <li>Carbide Scrap Purchase</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 {shopInfo.name}. All rights reserved. | Built with care for our customers
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/91${shopInfo.phone.replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default Home;
