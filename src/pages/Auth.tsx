import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { loginUser, registerUser, getCurrentUser } from '@/lib/store';
import logoImg from '@/assets/logo-hugelabz.png';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const redirect = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (user.role === 'admin' && redirect.startsWith('/admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const user = await loginUser(formData.email, formData.password);
        if (user) {
          toast.success(`Welcome back, ${user.name}!`);
          if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate(redirect);
          }
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          toast.error('Please fill all fields');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const user = await registerUser(formData.email, formData.password, formData.name);
        if (user) {
          await loginUser(formData.email, formData.password);
          toast.success('Account created successfully!');
          navigate(redirect);
        } else {
          toast.error('This email is already registered');
        }
      }
    } catch (error) {
      toast.error('Authentication error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          {/* Card */}
          <div className="gradient-card rounded-2xl border border-border p-8 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <img src={logoImg} alt="HugeLabs" className="h-16 mx-auto mb-4" />
              <h1 className="font-display text-3xl text-foreground uppercase tracking-wider">
                {isLogin ? 'Welcome Back' : 'Join HUGELABZ'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </div>

            {/* Admin Login Hint */}
            <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 text-sm text-primary mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Admin Access</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Admin: admin@hugelabz.com / admin123
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm uppercase tracking-wider">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 pl-10 bg-secondary border-border focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm uppercase tracking-wider">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 pl-10 bg-secondary border-border focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm uppercase tracking-wider">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 pl-10 pr-10 bg-secondary border-border focus:border-primary focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-sm text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Toggle */}
            <p className="text-center text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-semibold"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Auth;
