import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Plus, Search, Building2, Sparkles } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies } = useSelector(store => store.company);

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1'>
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900 mb-2">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>Employer Portal</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
                            Registered Companies
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Manage your registered enterprise profiles and job postings
                        </p>
                    </div>

                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-zinc-950 text-white hover:bg-zinc-800 flex items-center gap-2 rounded-xl"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Register Company</span>
                    </Button>
                </div>

                {/* Filter and Content */}
                <div className="space-y-6">
                    <div className="flex items-center max-w-sm">
                        <div className="relative w-full">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <Input
                                className="pl-10 bg-white border-zinc-200 rounded-xl"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies