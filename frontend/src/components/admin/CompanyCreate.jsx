import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName || !companyName.trim()) {
            toast.error("Please enter your company or organization name");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message || "Company registered");
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to register company");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1'>
                <button 
                    onClick={() => navigate("/admin/companies")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to companies</span>
                </button>

                <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h1 className='font-bold text-2xl text-zinc-950 font-display'>Register New Enterprise</h1>
                        <p className='text-xs text-zinc-500'>
                            What is the name of your organization or company? You can customize logo, website, and details on the next step.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-xs font-semibold text-zinc-700">Company Name</Label>
                        <Input
                            id="companyName"
                            type="text"
                            placeholder="e.g. OpenAI, Stripe, Linear, Vercel"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="h-11"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') registerNewCompany();
                            }}
                        />
                    </div>

                    <div className='flex items-center gap-3 pt-4 border-t border-zinc-100'>
                        <Button 
                            variant="outline" 
                            onClick={() => navigate("/admin/companies")}
                            className="flex-1 rounded-xl border-zinc-300"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={registerNewCompany}
                            disabled={loading}
                            className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800 rounded-xl"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Continue <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate