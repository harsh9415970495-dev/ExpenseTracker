import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Check, Sparkles, ArrowRight, ChevronLeft } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, socialLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError('');
      const mockEmail = provider === 'Google' ? 'google.user@example.com' : 'facebook.user@example.com';
      const mockName = provider === 'Google' ? 'Google Demo User' : 'Facebook Demo User';
      await socialLogin(provider, mockEmail, mockName);
      navigate('/');
    } catch (err) {
      setError(`Failed to sign up with ${provider}`);
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

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await signup(formData.username, formData.email, formData.password, formData.confirmPassword);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create account. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Visual & Branding */}
      <div className="hidden md:flex md:w-2/5 lg:w-[35%] relative overflow-hidden bg-indigo-900">
        <img 
          src="/login-bg.png" 
          alt="Signup background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-125 rotate-12"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <div className="flex items-center gap-3">
             <Link to="/login" className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all">
              <ChevronLeft className="text-white w-5 h-5" />
            </Link>
          </div>

          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Start Your <span className="text-blue-500">Journey</span>.
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              Create an account in seconds and take full control of your financial destiny.
            </p>
          </div>

          <div className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            JOIN 10,000+ SMART SPENDERS
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 lg:p-20 bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-[480px] animate-fadeIn">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between mb-12">
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">Capital Spend</span>
            </div>
            <Link to="/login" className="text-xs font-black text-slate-500 uppercase tracking-widest">Sign In</Link>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Fill in the information below to get started.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-sm font-bold flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="JohnDoe"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@work.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative group">
                <Check className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full">
              <div className="h-px bg-slate-900 flex-1"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Social Signup</span>
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
            Already have an account?{' '}
            <Link to="/login" className="text-white font-bold hover:text-blue-500 transition-all">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;