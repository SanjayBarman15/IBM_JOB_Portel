import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Sparkles, UserCircle, Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toast.error("Please fill in your email and password");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Signed in successfully");
        if (res.data.user?.role === 'recruiter') {
          navigate('/admin/companies');
        } else {
          navigate('/jobs');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'recruiter') {
        navigate('/admin/companies');
      } else {
        navigate('/jobs');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />
      
      <div className="flex items-center justify-center flex-grow px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white border border-zinc-200 shadow-card rounded-2xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-950 font-display">Welcome Back</h1>
            <p className="text-xs text-zinc-500">Sign in to your TalentSpot account to continue</p>
          </div>

          {/* Segmented Role Selector */}
          <div className="p-1 rounded-xl bg-zinc-100 border border-zinc-200 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setInput({ ...input, role: 'student' })}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                input.role === 'student'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <UserCircle className="w-4 h-4" />
              <span>Job Seeker</span>
            </button>

            <button
              type="button"
              onClick={() => setInput({ ...input, role: 'recruiter' })}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                input.role === 'recruiter'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Recruiter / Employer</span>
            </button>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-zinc-700">Email Address</Label>
              <div className="relative mt-1">
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="name@company.com"
                  className="pl-3.5"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-zinc-700">Password</Label>
              </div>
              <div className="relative mt-1">
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="pl-3.5"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-zinc-950 text-white hover:bg-zinc-800 rounded-xl font-semibold text-sm transition-all shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> <span>Signing In...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            <div className="text-center text-xs text-zinc-500 pt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-zinc-950 font-semibold hover:underline">
                Create an account
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;