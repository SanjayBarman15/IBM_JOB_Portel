import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1'>
                <button 
                    onClick={() => navigate("/admin/jobs")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to jobs</span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900 mb-2">
                            <Users className="w-3.5 h-3.5" />
                            <span>Candidate Review</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-display">
                            Applicants Pipeline ({applicants?.applications?.length || 0})
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Review candidate profiles, resumes, and update recruitment status
                        </p>
                    </div>
                </div>

                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants