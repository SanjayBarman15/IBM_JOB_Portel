import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search, Briefcase } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1'>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Recruiter Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
              Job Postings
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Review and manage your created job openings and applicant pipelines
            </p>
          </div>

          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-zinc-950 text-white hover:bg-zinc-800 flex items-center gap-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center max-w-sm">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                className="pl-10 bg-white border-zinc-200 rounded-xl"
                placeholder="Filter by role or company..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>

          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs