import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Briefcase, Plus, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                    <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">No Posted Jobs</h3>
                <p className="text-xs text-zinc-500 mt-1 mb-5 max-w-sm mx-auto">
                    You haven't posted any job openings yet or no jobs match your search filter.
                </p>
                <Button 
                    onClick={() => navigate("/admin/jobs/create")}
                    size="sm" 
                    className="bg-zinc-950 text-white hover:bg-zinc-800"
                >
                    <Plus className="w-4 h-4 mr-1.5" /> Create First Job
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Role Title</TableHead>
                        <TableHead>Date Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job?._id} className="hover:bg-zinc-50/80">
                            <TableCell className="font-semibold text-zinc-900">
                                {job?.company?.name || "Enterprise"}
                            </TableCell>
                            <TableCell className="font-medium text-zinc-950">
                                {job?.title}
                            </TableCell>
                            <TableCell className="text-xs text-zinc-500 font-medium">
                                {job?.createdAt ? job.createdAt.split("T")[0] : 'Recently'}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="w-8 h-8 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 inline-flex items-center justify-center transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-1.5 bg-white rounded-xl border border-zinc-200 shadow-lg" align="end">
                                        <button 
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                            className='flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors text-left'
                                        >
                                            <Users className='w-3.5 h-3.5' />
                                            <span>View Applicants</span>
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable