import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Briefcase, SearchX, Sparkles } from 'lucide-react';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Button } from './ui/button';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchedQuery && searchedQuery.trim()) {
            const query = searchedQuery.toLowerCase().trim();

            const isSalaryRange = /^\d+(\-\d+|\+)\s*lpa$/i.test(query);

            let minSalary = 0;
            let maxSalary = Infinity;

            if (isSalaryRange) {
                if (query.includes("+")) {
                    minSalary = parseFloat(query.replace(/[^0-9.]/g, '')) || 0;
                    maxSalary = Infinity;
                } else if (query.includes("-")) {
                    const parts = query.replace("lpa", "").trim().split("-");
                    minSalary = parseFloat(parts[0]) || 0;
                    maxSalary = parseFloat(parts[1]) || Infinity;
                }
            }

            const queryWords = query.split(/\s+/).filter(Boolean);

            const filteredJobs = allJobs.filter((job) => {
                const jobSalary = Number(job?.salary) || 0;

                if (isSalaryRange) {
                    return jobSalary >= minSalary && (maxSalary === Infinity ? true : jobSalary <= maxSalary);
                }

                const title = (job?.title || "").toLowerCase();
                const description = (job?.description || "").toLowerCase();
                const location = (job?.location || "").toLowerCase();
                const companyName = (job?.company?.name || "").toLowerCase();
                const jobType = (job?.jobType || "").toLowerCase();
                const requirements = Array.isArray(job?.requirements)
                    ? job.requirements.join(" ").toLowerCase()
                    : (job?.requirements || "").toLowerCase();

                const combinedText = `${title} ${description} ${location} ${companyName} ${jobType} ${requirements} ${jobSalary}lpa`;

                return queryWords.some((word) => combinedText.includes(word));
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1'>
                {/* Page Heading & Search Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-zinc-200 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
                            Available Positions
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Showing <span className="font-semibold text-zinc-900">{filterJobs.length}</span> verified career opportunities
                            {searchedQuery && <span> matching "<strong className="text-zinc-900">{searchedQuery}</strong>"</span>}
                        </p>
                    </div>

                    {searchedQuery && (
                        <Button 
                            onClick={() => dispatch(setSearchedQuery(""))} 
                            variant="outline" 
                            size="sm"
                            className="self-start sm:self-auto text-xs border-zinc-300 hover:border-zinc-950"
                        >
                            Clear search filter
                        </Button>
                    )}
                </div>

                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Left Filter Sidebar */}
                    <aside className='w-full md:w-72 shrink-0'>
                        <div className="sticky top-24">
                            <FilterCard />
                        </div>
                    </aside>

                    {/* Right Jobs Listing */}
                    <main className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-zinc-200 text-center shadow-sm'>
                                <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-4">
                                    <SearchX className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-950">No matching jobs found</h3>
                                <p className="text-sm text-zinc-500 max-w-sm mt-1 mb-6">
                                    Try adjusting your search criteria or resetting filters to see all available roles.
                                </p>
                                <Button 
                                    onClick={() => dispatch(setSearchedQuery(""))}
                                    className="bg-zinc-950 text-white hover:bg-zinc-800"
                                >
                                    Reset All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-12'>
                                <AnimatePresence>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25 }}
                                            key={job?._id}
                                            className="h-full"
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Jobs