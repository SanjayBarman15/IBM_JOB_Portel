import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft, Building2, MapPin, Briefcase, Calendar, Users, DollarSign, Award, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [applying, setApplying] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            setApplying(true);
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...(singleJob.applications || []), { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to submit application");
        } finally {
            setApplying(false);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    }, [jobId, dispatch, user?._id]);

    const requirementsList = Array.isArray(singleJob?.requirements) 
        ? singleJob.requirements 
        : typeof singleJob?.requirements === 'string' 
            ? singleJob.requirements.split(',').map(s => s.trim()).filter(Boolean)
            : [];

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            
            <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1'>
                {/* Back Navigation */}
                <button 
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to listings</span>
                </button>

                {/* Hero Header Card */}
                <div className='bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
                                {singleJob?.company?.logo ? (
                                    <img src={singleJob.company.logo} alt={singleJob?.company?.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <Building2 className="w-8 h-8" />
                                )}
                            </div>
                            <div>
                                <h1 className='text-2xl sm:text-3xl font-extrabold text-zinc-950 font-display'>
                                    {singleJob?.title}
                                </h1>
                                <p className='text-base font-semibold text-zinc-600 mt-1'>
                                    {singleJob?.company?.name || "Leading Enterprise"}
                                </p>
                                
                                <div className='flex flex-wrap items-center gap-2 mt-3'>
                                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-800 text-xs">
                                        {singleJob?.position || 1} Open Positions
                                    </Badge>
                                    <Badge variant="outline" className="text-zinc-700 text-xs">
                                        {singleJob?.jobType || "Full-time"}
                                    </Badge>
                                    <Badge variant="noir" className="text-xs">
                                        {singleJob?.salary} LPA
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0 flex sm:self-center">
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied || applying}
                                size="lg"
                                className={`w-full sm:w-auto px-8 rounded-xl font-semibold transition-all ${
                                    isApplied 
                                        ? 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed shadow-none' 
                                        : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-md'
                                }`}
                            >
                                {applying ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                                    </span>
                                ) : isApplied ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-zinc-400" /> Already Applied
                                    </span>
                                ) : (
                                    'Apply For This Role'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Key Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-1">
                            <MapPin className="w-4 h-4" /> Location
                        </div>
                        <p className="font-bold text-sm text-zinc-900">{singleJob?.location || "India"}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-1">
                            <Award className="w-4 h-4" /> Experience
                        </div>
                        <p className="font-bold text-sm text-zinc-900">{singleJob?.experience || 0} Years</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-1">
                            <Users className="w-4 h-4" /> Total Applicants
                        </div>
                        <p className="font-bold text-sm text-zinc-900">{singleJob?.applications?.length || 0} Candidates</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-1">
                            <Calendar className="w-4 h-4" /> Posted Date
                        </div>
                        <p className="font-bold text-sm text-zinc-900">{singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "Recently"}</p>
                    </div>
                </div>

                {/* Main Content Details */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-8">
                    {/* Role Overview */}
                    <div>
                        <h2 className='text-lg font-bold text-zinc-950 font-display pb-3 border-b border-zinc-100'>
                            Role Overview & Description
                        </h2>
                        <div className='mt-4 text-zinc-700 leading-relaxed text-sm sm:text-base whitespace-pre-line'>
                            {singleJob?.description}
                        </div>
                    </div>

                    {/* Requirements / Skills */}
                    {requirementsList.length > 0 && (
                        <div>
                            <h2 className='text-lg font-bold text-zinc-950 font-display pb-3 border-b border-zinc-100'>
                                Requirements & Skills
                            </h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4'>
                                {requirementsList.map((req, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                                        <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                                        <span className="text-sm font-medium text-zinc-800">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JobDescription