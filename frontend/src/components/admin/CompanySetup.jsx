import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Image as ImageIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message || "Company profile updated");
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1'>
                <button 
                    onClick={() => navigate("/admin/companies")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to companies</span>
                </button>

                <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-100">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 shrink-0">
                            {singleCompany?.logo ? (
                                <img src={singleCompany.logo} alt={singleCompany.name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <Building2 className="w-6 h-6" />
                            )}
                        </div>
                        <div>
                            <h1 className='font-bold text-xl text-zinc-950 font-display'>Company Setup & Details</h1>
                            <p className="text-xs text-zinc-500">Configure your organization brand profile</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <Label className="text-xs font-semibold text-zinc-700">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Acme Corp"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-semibold text-zinc-700">Website URL</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://acme.com"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs font-semibold text-zinc-700">Location / Headquarter</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="e.g. Bangalore, India / Remote"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label className="text-xs font-semibold text-zinc-700">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="e.g. Building developer tools for high-scale internet systems"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label className="text-xs font-semibold text-zinc-700">Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-1 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-800 hover:file:bg-zinc-200 cursor-pointer"
                            />
                        </div>

                        <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1 rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="flex-1 bg-zinc-950 text-white hover:bg-zinc-800 rounded-xl"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className='h-4 w-4 animate-spin' /> Updating...
                                    </span>
                                ) : (
                                    "Save Company Profile"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup