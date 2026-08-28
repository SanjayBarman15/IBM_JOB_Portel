import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Compass, SearchX } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1'>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900 mb-2">
                            <Compass className="w-3.5 h-3.5" />
                            <span>Browse Catalog</span>
                        </div>
                        <h1 className='text-3xl font-extrabold tracking-tight text-zinc-950 font-display'>
                            Discover Open Roles
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Showing <span className="font-semibold text-zinc-900">{allJobs.length}</span> positions available across all categories
                            {searchedQuery && <span> for "<strong className="text-zinc-900">{searchedQuery}</strong>"</span>}
                        </p>
                    </div>

                    <Button 
                        onClick={() => navigate('/jobs')} 
                        variant="outline"
                        className="self-start sm:self-auto border-zinc-300 hover:border-zinc-950"
                    >
                        Filter By Category
                    </Button>
                </div>

                {allJobs.length === 0 ? (
                    <div className='flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-zinc-200 text-center shadow-sm'>
                        <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mb-4">
                            <SearchX className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-950">No Results Found</h3>
                        <p className="text-sm text-zinc-500 max-w-sm mt-1 mb-6">
                            We couldn't find any roles matching your search keyword.
                        </p>
                        <Button 
                            onClick={() => { dispatch(setSearchedQuery("")); navigate('/jobs'); }}
                            className="bg-zinc-950 text-white hover:bg-zinc-800"
                        >
                            Explore All Jobs
                        </Button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12'>
                        {allJobs.map((job) => (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                key={job._id}
                                className="h-full"
                            >
                                <Job job={job}/>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse