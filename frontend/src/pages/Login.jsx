import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, socialLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError('');
      
      // Simulating a social login popup and callback
      // In a real app, you'd use @react-oauth/google or similar libraries here
      const mockEmail = provider === 'Google' ? 'google.user@example.com' : 'facebook.user@example.com';
      const mockName = provider === 'Google' ? 'Google Demo User' : 'Facebook Demo User';
      
      await socialLogin(provider, mockEmail, mockName);
      navigate('/');
    } catch (err) {
      setError(`Failed to sign in with ${provider}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Visual & Branding */}
      <div className="hidden md:flex md:w-3/5 lg:w-[65%] relative overflow-hidden bg-blue-900">
        <img 
          src="/login-bg.png" 
          alt="Login background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between h-full p-16 lg:p-24">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
              <Sparkles className="text-blue-400 w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Capital Spend</span>
          </div>

          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Master Your <span className="text-blue-500">Capital</span> with Intelligence.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              Join thousands of smart spenders who track, analyze, and optimize their daily finances with AI-driven insights.
            </p>
          </div>

          <div className="flex gap-12 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
            <span>© 2026 CAPITAL SPEND</span>
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 lg:p-20 bg-slate-950">
        <div className="w-full max-w-[420px] animate-fadeIn">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">Capital Spend</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Enter your details to access your dashboard.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-sm font-bold flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                <Link to="#" className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full">
              <div className="h-px bg-slate-900 flex-1"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Social Login</span>
              <div className="h-px bg-slate-900 flex-1"></div>
            </div>
            
            <div className="flex gap-4 w-full">
               <button 
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
                className="flex-1 py-4 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
               >
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                 <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Google</span>
               </button>
               <button 
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
                className="flex-1 py-4 border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
               >
                 <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
                 <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Facebook</span>
               </button>
            </div>
          </div>

          <p className="mt-12 text-center text-slate-500 font-medium">
            New here?{' '}
            <Link to="/signup" className="text-white font-bold hover:text-blue-500 transition-all">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;