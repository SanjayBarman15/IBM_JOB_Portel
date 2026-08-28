import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4'>
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-900 mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Curated Opportunities</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-display'>
                        Featured & Recent Openings
                    </h2>
                    <p className='mt-2 text-sm sm:text-base text-zinc-500 max-w-xl'>
                        Explore verified engineering, design, and leadership roles tailored for your background.
                    </p>
                </div>

                <Button 
                    onClick={() => navigate('/jobs')} 
                    variant="outline" 
                    className="self-start md:self-auto flex items-center gap-2 border-zinc-200 hover:border-zinc-950"
                >
                    <span>View All Jobs</span>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            >
                {allJobs.length === 0 ? (
                    <div className='col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-300'>
                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-semibold text-zinc-900">No Job Openings Available</h3>
                        <p className="text-xs text-zinc-500 mt-1">Check back later or explore other categories.</p>
                    </div>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <motion.div key={job._id} variants={cardVariants}>
                            <LatestJobCards job={job}/>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </section>
    )
}

export default LatestJobs