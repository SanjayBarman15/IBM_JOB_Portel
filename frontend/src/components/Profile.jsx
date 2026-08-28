import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Download, Briefcase, Sparkles, Phone } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector, useDispatch } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/profile`, {
                withCredentials: true
            });
            if (response.data.success) {
                dispatch(setUser(response.data.user));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [dispatch]);

    const handleDialogClose = () => {
        setOpen(false);
        fetchUserData();
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8'>
                {/* Profile Header Card */}
                <div className='bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden'>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                        <div className='flex items-center gap-5'>
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-2 ring-zinc-950/10">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                <AvatarFallback className="bg-zinc-950 text-white text-2xl font-bold font-display">
                                    {user?.fullname ? user.fullname.slice(0, 2).toUpperCase() : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <h1 className='font-bold text-2xl text-zinc-950 font-display'>{user?.fullname}</h1>
                                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                                        {user?.role}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 mt-1 max-w-md">
                                    {user?.profile?.bio || "No biography provided yet. Click edit to add your career summary."}
                                </p>
                            </div>
                        </div>

                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2 rounded-xl border-zinc-300 hover:border-zinc-950"
                        >
                            <Pen className="w-3.5 h-3.5" />
                            <span>Edit Profile</span>
                        </Button>
                    </div>

                    {/* Contact & Bio Info */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-zinc-100 text-sm'>
                        <div className='flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100'>
                            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-medium">Email Address</p>
                                <p className="font-semibold text-zinc-900 truncate">{user?.email || "Not specified"}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100'>
                            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-medium">Phone Number</p>
                                <p className="font-semibold text-zinc-900">{user?.phoneNumber || "Not specified"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills Matrix */}
                    <div className='py-6 border-b border-zinc-100'>
                        <h3 className='text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3'>
                            Skills & Proficiencies
                        </h3>
                        <div className='flex flex-wrap items-center gap-2'>
                            {user?.profile?.skills && user.profile.skills.length > 0 ? (
                                user.profile.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="bg-zinc-100 text-zinc-900 border-zinc-200 text-xs py-1 px-3">
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-xs text-zinc-400 italic">No skills listed yet</span>
                            )}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className='pt-6'>
                        <h3 className='text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3'>
                            Curriculum Vitae / Resume
                        </h3>
                        {user?.profile?.resume ? (
                            <a 
                                target='_blank' 
                                rel="noreferrer" 
                                href={user?.profile?.resume} 
                                className='group inline-flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-950 transition-all w-full max-w-md'
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900 line-clamp-1 group-hover:underline">
                                            {user?.profile?.resumeOriginalName || "Resume Document"}
                                        </p>
                                        <p className="text-xs text-zinc-400">PDF Document</p>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                            </a>
                        ) : (
                            <p className="text-xs text-zinc-400 italic">No resume uploaded. Update profile to upload your PDF resume.</p>
                        )}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='space-y-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className='text-xl font-bold text-zinc-950 font-display'>
                                Application History
                            </h2>
                            <p className="text-xs text-zinc-500 mt-0.5">Track and manage your submitted applications</p>
                        </div>
                    </div>
                    
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={handleDialogClose} />
        </div>
    )
}

export default Profile