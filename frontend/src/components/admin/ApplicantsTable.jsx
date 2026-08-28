import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, CheckCircle2, XCircle, Users, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Badge } from '../ui/badge';

const shortlistingStatus = [
    { label: "Accept", value: "Accepted" },
    { label: "Reject", value: "Rejected" }
];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message || `Application status updated to ${status}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }

    if (!applicants?.applications || applicants.applications.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                    <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">No Candidates Applied Yet</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    When candidates submit applications for this role, they will appear in this review table.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((item) => (
                        <TableRow key={item._id} className="hover:bg-zinc-50/80">
                            <TableCell className="font-semibold text-zinc-950">
                                {item?.applicant?.fullname || 'Candidate'}
                            </TableCell>
                            <TableCell className="text-zinc-600 text-xs">
                                {item?.applicant?.email || 'N/A'}
                            </TableCell>
                            <TableCell className="text-zinc-600 text-xs">
                                {item?.applicant?.phoneNumber || 'N/A'}
                            </TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors" 
                                        href={item?.applicant?.profile?.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>Resume</span>
                                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                                    </a>
                                ) : (
                                    <span className="text-xs text-zinc-400 italic">None</span>
                                )}
                            </TableCell>
                            <TableCell className="text-xs text-zinc-500 font-medium">
                                {item?.createdAt ? item.createdAt.split("T")[0] : 'Recently'}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="w-8 h-8 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 inline-flex items-center justify-center transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 p-1.5 bg-white rounded-xl border border-zinc-200 shadow-lg" align="end">
                                        <div className="space-y-1">
                                            {shortlistingStatus.map((status, index) => (
                                                <button 
                                                    onClick={() => statusHandler(status.value, item?._id)} 
                                                    key={index} 
                                                    className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                                                        status.value === 'Accepted'
                                                            ? 'text-zinc-900 hover:bg-zinc-100'
                                                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                                    }`}
                                                >
                                                    {status.value === 'Accepted' ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <XCircle className="w-3.5 h-3.5" />
                                                    )}
                                                    <span>{status.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ApplicantsTable;
