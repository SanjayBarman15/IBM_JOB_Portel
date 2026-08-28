import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery && searchedQuery.trim()) {
            const query = searchedQuery.toLowerCase().trim();

            // Check if query is a salary range filter (e.g. "0-5 LPA", "5-10 LPA", "10-20 LPA", "20+ LPA")
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

                // Match if any search term or word is contained in any of the job fields
                return queryWords.some((word) => combinedText.includes(word));
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs