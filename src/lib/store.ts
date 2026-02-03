// LocalStorage-based store for products, categories, users, and serial numbers

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SerialNumber {
  id: string;
  code: string;
  productId: string;
  isVerified: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface VerificationRecord {
  id: string;
  serialCode: string;
  productId: string;
  userId: string;
  verifiedAt: string;
}

const STORAGE_KEYS = {
  PRODUCTS: 'hugelabz_products',
  CATEGORIES: 'hugelabz_categories',
  SERIAL_NUMBERS: 'hugelabz_serials',
  USERS: 'hugelabz_users',
  VERIFICATIONS: 'hugelabz_verifications',
  CURRENT_USER: 'hugelabz_current_user',
};

// Default categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Peptide', slug: 'peptide', image: '/placeholder.svg' },
  { id: '2', name: 'Injectable', slug: 'injectable', image: '/placeholder.svg' },
  { id: '3', name: 'Anti Obesity / Fat Loss', slug: 'fat-loss', image: '/placeholder.svg' },
  { id: '4', name: 'SERMs', slug: 'serms', image: '/placeholder.svg' },
];

// Default products
const defaultProducts: Product[] = [
  { id: '1', name: 'BPC-157', description: 'Peptide for recovery', category: 'peptide', image: '/placeholder.svg', createdAt: new Date().toISOString() },
  { id: '2', name: 'TB-500', description: 'Healing peptide', category: 'peptide', image: '/placeholder.svg', createdAt: new Date().toISOString() },
  { id: '3', name: 'Test-E 250', description: 'Injectable testosterone', category: 'injectable', image: '/placeholder.svg', createdAt: new Date().toISOString() },
  { id: '4', name: 'Semaglutide', description: 'GLP-1 for weight management', category: 'fat-loss', image: '/placeholder.svg', createdAt: new Date().toISOString() },
];

// Default admin user
const defaultUsers: User[] = [
  { id: 'admin1', email: 'admin@hugelabz.com', password: 'admin123', name: 'Admin', role: 'admin', createdAt: new Date().toISOString() },
];

// Initialize store with defaults
function initializeStore() {
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERIAL_NUMBERS)) {
    localStorage.setItem(STORAGE_KEYS.SERIAL_NUMBERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VERIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify([]));
  }
}

// Products
export function getProducts(): Product[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
  return filtered.length < products.length;
}

// Categories
export function getCategories(): Category[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
}

export function addCategory(category: Omit<Category, 'id'>): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: Date.now().toString(),
  };
  categories.push(newCategory);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...updates };
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
  return filtered.length < categories.length;
}

// Serial Numbers
export function getSerialNumbers(): SerialNumber[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERIAL_NUMBERS) || '[]');
}

export function addSerialNumber(serial: Omit<SerialNumber, 'id' | 'createdAt' | 'isVerified'>): SerialNumber {
  const serials = getSerialNumbers();
  const newSerial: SerialNumber = {
    ...serial,
    id: Date.now().toString(),
    isVerified: false,
    createdAt: new Date().toISOString(),
  };
  serials.push(newSerial);
  localStorage.setItem(STORAGE_KEYS.SERIAL_NUMBERS, JSON.stringify(serials));
  return newSerial;
}

export function verifySerialNumber(code: string, userId?: string): { success: boolean; serial?: SerialNumber; product?: Product } {
  const serials = getSerialNumbers();
  const serial = serials.find(s => s.code.toLowerCase() === code.toLowerCase());
  
  if (!serial) {
    return { success: false };
  }
  
  const products = getProducts();
  const product = products.find(p => p.id === serial.productId);
  
  // Mark as verified
  serial.isVerified = true;
  serial.verifiedAt = new Date().toISOString();
  serial.verifiedBy = userId;
  localStorage.setItem(STORAGE_KEYS.SERIAL_NUMBERS, JSON.stringify(serials));
  
  // Add verification record
  if (userId) {
    const verifications = getVerifications();
    verifications.push({
      id: Date.now().toString(),
      serialCode: code,
      productId: serial.productId,
      userId,
      verifiedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.VERIFICATIONS, JSON.stringify(verifications));
  }
  
  return { success: true, serial, product };
}

export function deleteSerialNumber(id: string): boolean {
  const serials = getSerialNumbers();
  const filtered = serials.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SERIAL_NUMBERS, JSON.stringify(filtered));
  return filtered.length < serials.length;
}

// Users
export function getUsers(): User[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

export function registerUser(email: string, password: string, name: string): User | null {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return null; // User already exists
  }
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    name,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return newUser;
}

export function loginUser(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  }
  return null;
}

export function getCurrentUser(): User | null {
  const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userData ? JSON.parse(userData) : null;
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// Verifications
export function getVerifications(): VerificationRecord[] {
  initializeStore();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.VERIFICATIONS) || '[]');
}

export function getUserVerifications(userId: string): VerificationRecord[] {
  const verifications = getVerifications();
  return verifications.filter(v => v.userId === userId);
}
