// MongoDB-based store using API endpoints

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SerialNumber {
  _id: string;
  code: string;
  productId: string | Product;
  isVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  createdAt: string;
}

export interface User {
  _id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

const STORAGE_KEYS = {
  CURRENT_USER: 'hugelabz_current_user',
};

export interface VerificationRecord {
  _id: string;
  serialCode: string;
  productId: string | Product;
  userId: string | User;
  verifiedAt: string;
}

// --- Products ---
export async function getProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function addProduct(product: Omit<Product, '_id' | 'createdAt'>): Promise<Product> {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
}

export async function deleteProduct(id: string): Promise<boolean> {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  const result = await response.json();
  return result.success;
}

// --- Categories ---
export async function getCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function addCategory(category: Omit<Category, '_id'>): Promise<Category> {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to add category');
  return response.json();
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update category');
  return response.json();
}

export async function deleteCategory(id: string): Promise<boolean> {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete category');
  const result = await response.json();
  return result.success;
}

// --- Serial Numbers ---
export async function getSerialNumbers(): Promise<SerialNumber[]> {
  const response = await fetch('/api/serials');
  if (!response.ok) throw new Error('Failed to fetch serials');
  return response.json();
}

export async function addSerialNumber(serial: Omit<SerialNumber, '_id' | 'createdAt' | 'isVerified'>): Promise<SerialNumber> {
  const response = await fetch('/api/serials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serial),
  });
  if (!response.ok) throw new Error('Failed to add serial');
  return response.json();
}

export async function deleteSerialNumber(id: string): Promise<boolean> {
  const response = await fetch(`/api/serials/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete serial');
  const result = await response.json();
  return result.success;
}

export async function verifySerialNumber(code: string, userId?: string): Promise<{ success: boolean; serial?: SerialNumber; product?: Product }> {
  const response = await fetch('/api/serials/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, userId }),
  });
  if (!response.ok) return { success: false };
  return response.json();
}

// --- Verifications ---
export async function getVerifications(): Promise<VerificationRecord[]> {
  const response = await fetch('/api/verifications');
  if (!response.ok) throw new Error('Failed to fetch verifications');
  return response.json();
}

export async function getUserVerifications(userId: string): Promise<VerificationRecord[]> {
  const response = await fetch(`/api/verifications/user/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user verifications');
  return response.json();
}

// --- Auth ---
export async function registerUser(email: string, password: string, name: string): Promise<User | null> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!response.ok) return null;
  return response.json();
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) return null;
  const user = await response.json();
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return user;
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userData ? JSON.parse(userData) : null;
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}
