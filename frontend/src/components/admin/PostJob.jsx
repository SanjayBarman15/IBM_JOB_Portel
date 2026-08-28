import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, ArrowLeft, Briefcase, Plus, Building2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 1,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.companyId) {
            toast.error("Please select a registered company for this role");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message || "Job published successfully");
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1'>
                <button 
                    onClick={() => navigate("/admin/jobs")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to jobs</span>
                </button>

                <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b border-zinc-100">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl text-zinc-950 font-display'>Create Job Posting</h1>
                            <p className="text-xs text-zinc-500">Publish a new role to attract qualified engineering candidates</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-5">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Role Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Senior Frontend Engineer"
                                        className="mt-1"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Hiring Organization</Label>
                                    {companies.length > 0 ? (
                                        <div className="mt-1">
                                            <Select onValueChange={selectChangeHandler}>
                                                <SelectTrigger className="w-full h-10 border-zinc-200 rounded-xl bg-white">
                                                    <SelectValue placeholder="Select Organization" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white rounded-xl border border-zinc-200 shadow-xl">
                                                    <SelectGroup>
                                                        {companies.map((company) => (
                                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                                {company.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-zinc-500 mt-2 italic">
                                            No companies registered. <span onClick={() => navigate('/admin/companies/create')} className="text-zinc-950 underline font-semibold cursor-pointer">Register one first</span>.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs font-semibold text-zinc-700">Job Description & Responsibilities</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. We are seeking a talented engineer to lead web performance..."
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-semibold text-zinc-700">
                                    Skills & Requirements <span className="text-zinc-400 font-normal">(comma separated)</span>
                                </Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="React, TypeScript, Next.js, GraphQL, TailwindCSS"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Salary (LPA)</Label>
                                    <Input
                                        type="text"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 18"
                                        className="mt-1"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Bangalore / Remote"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Employment Type</Label>
                                    <Input
                                        type="text"
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        placeholder="Full-time, Contract"
                                        className="mt-1"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Experience (Years)</Label>
                                    <Input
                                        type="text"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. 3"
                                        className="mt-1"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-xs font-semibold text-zinc-700">Open Positions</Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        placeholder="1"
                                        min="1"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => navigate("/admin/jobs")}
                                className="flex-1 rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={loading || companies.length === 0}
                                className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800 rounded-xl"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className='h-4 w-4 animate-spin' /> Publishing...
                                    </span>
                                ) : (
                                    "Publish Opening"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob