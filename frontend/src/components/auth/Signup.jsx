import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Sparkles, UserCircle, Briefcase, ArrowRight } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !input.fullname ||
      !input.email ||
      !input.phoneNumber ||
      !input.password ||
      !input.role
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const userData = {
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
      role: input.role,
    };

    try {
      dispatch(setLoading(true));
      const registerRes = await axios.post(
        `${USER_API_END_POINT}/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (registerRes.data.success) {
        const loginRes = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email: input.email,
            password: input.password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (loginRes.data.success) {
          dispatch(setUser(loginRes.data.user));
          toast.success("Account created successfully!");
          if (loginRes.data.user?.role === 'recruiter') {
            navigate("/admin/companies");
          } else {
            navigate("/jobs");
          }
        } else {
          toast.success("Account created! Please login.");
          navigate("/login");
        }
      } else {
        toast.error(registerRes.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error details:", error.response || error);
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
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
            <h1 className="text-2xl font-bold text-zinc-950 font-display">Create Your Account</h1>
            <p className="text-xs text-zinc-500">Join the premier platform for engineers and top companies</p>
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
              <span>Employer</span>
            </button>
          </div>

          <form onSubmit={submitHandler} className="space-y-3.5">
            <div>
              <Label htmlFor="fullname" className="text-xs font-semibold text-zinc-700">Full Name</Label>
              <Input
                id="fullname"
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Alex Morgan"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-semibold text-zinc-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="alex@example.com"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-xs font-semibold text-zinc-700">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+1 555 019 283"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-semibold text-zinc-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="mt-1"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-zinc-950 text-white hover:bg-zinc-800 rounded-xl font-semibold text-sm transition-all shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> <span>Creating Account...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    Sign Up <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-zinc-500 pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-zinc-950 font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
