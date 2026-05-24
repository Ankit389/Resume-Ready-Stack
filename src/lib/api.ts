import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  signup: (name: string, email: string, password: string, phone?: string) =>
    api.post('/auth/signup', { name, email, password, phone }),
  me: () => api.get('/auth/me'),
};

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: number) => api.get(`/services/${id}`),
};

export const plansAPI = {
  getAll: () => api.get('/plans'),
  getById: (id: number) => api.get(`/plans/${id}`),
};

export const contactAPI = {
  send: (data: { name: string; email: string; phone?: string; service?: string; message: string }) =>
    api.post('/contact', data),
};

export const paymentAPI = {
  createOrder: (data: {
    planName: string;
    planId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: Record<string, any>;
  }) => api.post('/payment/order', data),
  verifyPayment: (data: {
    orderId: string;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) => api.post('/payment/verify', data),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: { name?: string; phone?: string }) => api.put('/user/profile', data),
  getOrders: () => api.get('/orders/my'),
};

export default api;
