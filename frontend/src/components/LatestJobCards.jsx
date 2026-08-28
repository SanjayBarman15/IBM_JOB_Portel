import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, ArrowUpRight, Sparkles } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)} 
            className='group relative p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-zinc-950 hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between h-full'
        >
            <div>
                {/* Company & Location Header */}
                <div className='flex items-start justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-colors duration-300'>
                            {job?.company?.logo ? (
                                <img src={job?.company?.logo} alt={job?.company?.name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <Building2 className="w-5 h-5" />
                            )}
                        </div>
                        <div>
                            <h3 className='font-semibold text-sm sm:text-base text-zinc-900 line-clamp-1'>
                                {job?.company?.name || "Verified Enterprise"}
                            </h3>
                            <div className='flex items-center gap-1 text-xs text-zinc-500 mt-0.5'>
                                <MapPin className="w-3 h-3 text-zinc-400" />
                                <span>{job?.location || "India"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-950 group-hover:border-zinc-950 transition-all">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </div>

                {/* Job Title & Summary */}
                <div className='my-4'>
                    <h2 className='font-bold text-base sm:text-lg text-zinc-950 group-hover:text-zinc-900 transition-colors line-clamp-1'>
                        {job?.title}
                    </h2>
                    <p className='text-xs sm:text-sm text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed font-normal'>
                        {job?.description}
                    </p>
                </div>
            </div>

            {/* Badges in pure monochrome style */}
            <div className='flex flex-wrap items-center gap-2 pt-3 border-t border-zinc-100 mt-auto'>
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-800 text-[11px] font-medium border-zinc-200">
                    {job?.position ? `${job?.position} Openings` : "Actively Hiring"}
                </Badge>
                <Badge variant="outline" className="text-zinc-700 text-[11px] font-medium border-zinc-200">
                    {job?.jobType || "Full Time"}
                </Badge>
                <Badge variant="noir" className="text-[11px] font-semibold ml-auto">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards