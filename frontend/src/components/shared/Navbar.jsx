import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X, Sparkles, Building2, Briefcase, Compass, ChevronDown } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to logout");
        }
    }

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const isActive = (path) => location.pathname === path;

    return (
        <header className='sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md transition-all'>
            <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl h-16'>
                {/* Brand Logo */}
                <div className='flex items-center gap-3'>
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className='w-9 h-9 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200'>
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className='text-xl font-bold tracking-tight text-zinc-950 font-display'>
                                Talent<span className="text-zinc-500 font-medium">Spot</span>
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <nav className='flex items-center gap-1 bg-zinc-100/80 p-1 rounded-xl border border-zinc-200/60'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link 
                                    to="/admin/companies" 
                                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive('/admin/companies') 
                                            ? 'bg-white text-zinc-950 shadow-sm' 
                                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                                    }`}
                                >
                                    Companies
                                </Link>
                                <Link 
                                    to="/admin/jobs" 
                                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive('/admin/jobs') 
                                            ? 'bg-white text-zinc-950 shadow-sm' 
                                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                                    }`}
                                >
                                    Jobs
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/" 
                                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive('/') 
                                            ? 'bg-white text-zinc-950 shadow-sm' 
                                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link 
                                    to="/jobs" 
                                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive('/jobs') 
                                            ? 'bg-white text-zinc-950 shadow-sm' 
                                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                                    }`}
                                >
                                    Jobs
                                </Link>
                                <Link 
                                    to="/browse" 
                                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive('/browse') 
                                            ? 'bg-white text-zinc-950 shadow-sm' 
                                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/50'
                                    }`}
                                >
                                    Browse
                                </Link>
                            </>
                        )}
                    </nav>

                    {!user ? (
                        <div className='flex items-center gap-2.5'>
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="font-medium text-zinc-700 hover:text-zinc-950">
                                    Log In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" className="bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm px-4">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-all outline-none">
                                    <Avatar className="h-8 w-8 ring-1 ring-zinc-950/10">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback className="bg-zinc-900 text-white text-xs font-semibold">
                                            {user?.fullname ? user.fullname.slice(0, 2).toUpperCase() : 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium text-zinc-800 max-w-[120px] truncate">
                                        {user?.fullname?.split(' ')[0]}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-3" align="end">
                                <div className="space-y-3">
                                    <div className='flex items-center gap-3 p-2 rounded-xl bg-zinc-50 border border-zinc-100'>
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            <AvatarFallback className="bg-zinc-900 text-white font-semibold">
                                                {user?.fullname ? user.fullname.slice(0, 2).toUpperCase() : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4 className='font-semibold text-sm text-zinc-900 truncate'>{user?.fullname}</h4>
                                            <p className='text-xs text-zinc-500 truncate'>{user?.email}</p>
                                            <span className="inline-block mt-0.5 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-800">
                                                {user?.role}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1 text-sm text-zinc-700'>
                                        {user && user.role === 'student' && (
                                            <Link 
                                                to="/profile"
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 text-zinc-800 transition-colors'
                                            >
                                                <User2 className="w-4 h-4 text-zinc-500" />
                                                <span>View Profile</span>
                                            </Link>
                                        )}
                                        {user && user.role === 'recruiter' && (
                                            <Link 
                                                to="/admin/companies"
                                                className='flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 text-zinc-800 transition-colors'
                                            >
                                                <Building2 className="w-4 h-4 text-zinc-500" />
                                                <span>Manage Companies</span>
                                            </Link>
                                        )}
                                        <button 
                                            onClick={logoutHandler} 
                                            className='flex w-full items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors text-left'
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Hamburger Toggle */}
                <div className='flex md:hidden items-center gap-2'>
                    {user && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                            <AvatarFallback className="bg-zinc-900 text-white text-xs">
                                {user?.fullname?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <button 
                        onClick={toggleSidebar} 
                        className="p-2 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Slide-in Drawer */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between border-l border-zinc-200 md:hidden"
                        >
                            <div>
                                <div className="flex items-center justify-between pb-5 border-b border-zinc-100">
                                    <div className="flex items-center gap-2">
                                        <div className='w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm'>
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-bold text-zinc-950 font-display">TalentSpot</span>
                                    </div>
                                    <button 
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <ul className="flex flex-col gap-1 mt-6">
                                    {user && user.role === 'recruiter' ? (
                                        <>
                                            <li>
                                                <Link 
                                                    to="/admin/companies" 
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
                                                >
                                                    <Building2 className="w-4 h-4 text-zinc-500" /> Companies
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/admin/jobs" 
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
                                                >
                                                    <Briefcase className="w-4 h-4 text-zinc-500" /> Jobs
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link 
                                                    to="/" 
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
                                                >
                                                    <Compass className="w-4 h-4 text-zinc-500" /> Home
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/jobs" 
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
                                                >
                                                    <Briefcase className="w-4 h-4 text-zinc-500" /> Jobs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/browse" 
                                                    onClick={() => setSidebarOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
                                                >
                                                    <Compass className="w-4 h-4 text-zinc-500" /> Browse
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {user && user.role === 'student' && (
                                        <li>
                                            <Link 
                                                to="/profile" 
                                                onClick={() => setSidebarOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
                                            >
                                                <User2 className="w-4 h-4 text-zinc-500" /> Profile
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-zinc-100">
                                {!user ? (
                                    <div className='flex flex-col gap-2'>
                                        <Link to="/login" onClick={() => setSidebarOpen(false)}>
                                            <Button variant="outline" className="w-full">Login</Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                                            <Button className="w-full bg-zinc-950 text-white hover:bg-zinc-800">Signup</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => { logoutHandler(); setSidebarOpen(false); }} 
                                        className='flex w-full items-center justify-center gap-2 p-2.5 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 font-medium text-sm'
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar