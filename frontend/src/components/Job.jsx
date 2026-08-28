import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, Building2, MapPin, ArrowUpRight, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [bookmarked, setBookmarked] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        return days === 0 ? "Today" : `${days}d ago`;
    }

    const toggleBookmark = (e) => {
        e.stopPropagation();
        setBookmarked(!bookmarked);
        toast.success(!bookmarked ? "Job saved to bookmarks" : "Removed from bookmarks");
    };
    
    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)}
            className='group p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-zinc-950 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full cursor-pointer'
        >
            <div>
                {/* Header: Date Posted & Bookmark */}
                <div className='flex items-center justify-between pb-3 border-b border-zinc-100'>
                    <div className='flex items-center gap-1.5 text-xs text-zinc-400 font-medium'>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{daysAgoFunction(job?.createdAt)}</span>
                    </div>
                    <button 
                        onClick={toggleBookmark}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            bookmarked 
                                ? 'bg-zinc-950 text-white border-zinc-950' 
                                : 'bg-white text-zinc-400 border-zinc-200 hover:text-zinc-950 hover:border-zinc-300'
                        }`}
                        title="Save for later"
                    >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                </div>

                {/* Company Information */}
                <div className='flex items-center gap-3 my-4'>
                    <div className='w-11 h-11 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-colors duration-300 shrink-0'>
                        {job?.company?.logo ? (
                            <img src={job?.company?.logo} alt={job?.company?.name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            <Building2 className="w-5 h-5" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className='font-semibold text-sm text-zinc-900 truncate'>{job?.company?.name || "Enterprise Company"}</h3>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                            <span className="truncate">{job?.location || "India"}</span>
                        </div>
                    </div>
                </div>

                {/* Role Title & Summary */}
                <div className="my-3">
                    <h2 className='font-bold text-base text-zinc-950 group-hover:text-zinc-800 transition-colors line-clamp-1'>
                        {job?.title}
                    </h2>
                    <p className='text-xs sm:text-sm text-zinc-500 line-clamp-2 mt-1.5 leading-relaxed font-normal'>
                        {job?.description}
                    </p>
                </div>
            </div>

            {/* Badges & Actions */}
            <div className="mt-4 pt-4 border-t border-zinc-100 space-y-4">
                <div className='flex flex-wrap items-center gap-1.5'>
                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-800 text-[11px] font-medium border-zinc-200">
                        {job?.position ? `${job?.position} Openings` : "Open"}
                    </Badge>
                    <Badge variant="outline" className="text-zinc-700 text-[11px] font-medium border-zinc-200">
                        {job?.jobType || "Full-time"}
                    </Badge>
                    <Badge variant="noir" className="text-[11px] font-semibold ml-auto">
                        {job?.salary} LPA
                    </Badge>
                </div>

                <div className='flex items-center gap-2 pt-1'>
                    <Button 
                        onClick={(e) => { e.stopPropagation(); navigate(`/description/${job?._id}`); }} 
                        variant="outline" 
                        size="sm"
                        className="flex-1 font-medium text-xs rounded-xl border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50"
                    >
                        View Details
                    </Button>
                    <Button 
                        onClick={toggleBookmark}
                        size="sm"
                        className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800 font-medium text-xs rounded-xl"
                    >
                        {bookmarked ? "Saved" : "Save Job"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Job