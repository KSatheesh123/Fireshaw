const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173'
    ? 'http://localhost:5000/api'
    : '/api');

// Authentication API
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

// Products API
export const fetchProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.fireClass && filters.fireClass !== 'All') params.append('fireClass', filters.fireClass);
    if (filters.industry && filters.industry !== 'All') params.append('industry', filters.industry);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('API fetchProducts error:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  const data = await res.json();
  return data.data;
};

// Orders API
export const placeOrder = async (orderPayload) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to place order');
  return data.data;
};

export const fetchAllOrders = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== 'All') params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);

  const res = await fetch(`${API_BASE_URL}/orders?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  const data = await res.json();
  return data.data || [];
};

export const fetchUserOrders = async (userId) => {
  const res = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user orders');
  const data = await res.json();
  return data.data || [];
};

export const fetchOrderStats = async () => {
  const res = await fetch(`${API_BASE_URL}/orders/stats/summary`);
  if (!res.ok) throw new Error('Failed to fetch order stats');
  const data = await res.json();
  return data.data;
};

export const updateOrderStatusApi = async (orderId, updateData) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update order');
  return data.data;
};
