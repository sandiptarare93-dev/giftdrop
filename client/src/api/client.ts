const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('giftdrop_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {})
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  }

  // Auth
  login = (credentials: any) => this.request<any>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
  register = (userData: any) => this.request<any>('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
  getMe = () => this.request<any>('/auth/me');
  googleAuth = (credential: string) => this.request<any>('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) });
  forgotPassword = (email: string) => this.request<any>('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });

  // Products & Occasions
  getProducts = (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return this.request<any>(`/products?${query}`);
  };
  getProductBySlug = (slug: string) => this.request<any>(`/products/${slug}`);
  getOccasions = () => this.request<any>('/products/occasions');
  getTestimonials = () => this.request<any>('/products/testimonials');

  // Surprises
  createSurprise = (data: any) => this.request<any>('/surprises', { method: 'POST', body: JSON.stringify(data) });
  getSurpriseById = (id: string) => this.request<any>(`/surprises/${id}`);
  getSurpriseBySlug = (slug: string) => this.request<any>(`/surprises/public/${slug}`);
  updateSurprise = (id: string, data: any) => this.request<any>(`/surprises/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  deleteSurprise = (id: string) => this.request<any>(`/surprises/${id}`, { method: 'DELETE' });
  getMySurprises = () => this.request<any>('/surprises/my');
  getAllSurprisesAdmin = () => this.request<any>('/surprises/admin/all');

  // Orders & Payment
  createCheckout = (data: any) => this.request<any>('/orders/checkout', { method: 'POST', body: JSON.stringify(data) });
  verifyPayment = (data: any) => this.request<any>('/orders/verify', { method: 'POST', body: JSON.stringify(data) });
  getMyOrders = () => this.request<any>('/orders/my');
  getAllOrdersAdmin = () => this.request<any>('/orders/admin/all');
  getOrderById = (id: string) => this.request<any>(`/orders/${id}`);

  // Coupons
  validateCoupon = (code: string, orderAmount: number) =>
    this.request<any>('/coupons/validate', { method: 'POST', body: JSON.stringify({ code, orderAmount }) });
  getCoupons = () => this.request<any>('/coupons');
  createCoupon = (data: any) => this.request<any>('/coupons', { method: 'POST', body: JSON.stringify(data) });
  updateCoupon = (id: string, data: any) => this.request<any>(`/coupons/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  deleteCoupon = (id: string) => this.request<any>(`/coupons/${id}`, { method: 'DELETE' });

  // Reviews
  getReviews = (productId?: string) => this.request<any>(`/reviews${productId ? `?productId=${productId}` : ''}`);
  createReview = (data: any) => this.request<any>('/reviews', { method: 'POST', body: JSON.stringify(data) });
  deleteReview = (id: string) => this.request<any>(`/reviews/${id}`, { method: 'DELETE' });

  // Admin
  getAdminAnalytics = () => this.request<any>('/analytics');
  createProductAdmin = (data: any) => this.request<any>('/products', { method: 'POST', body: JSON.stringify(data) });
  updateProductAdmin = (id: string, data: any) => this.request<any>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  deleteProductAdmin = (id: string) => this.request<any>(`/products/${id}`, { method: 'DELETE' });

  // Upload
  uploadPhoto = (base64: string) => this.request<any>('/upload', { method: 'POST', body: JSON.stringify({ base64 }) });
}

export const api = new ApiClient();
