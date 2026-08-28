import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Briefcase, Calendar, Building2, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusBadge = (status) => {
        const lower = status?.toLowerCase();
        if (lower === 'accepted') {
            return (
                <Badge variant="noir" className="bg-zinc-950 text-white font-semibold text-xs py-1 px-3">
                    Accepted
                </Badge>
            );
        }
        if (lower === 'rejected') {
            return (
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-400 border border-zinc-200 text-xs py-1 px-3 line-through">
                    Rejected
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="border-zinc-300 bg-white text-zinc-800 text-xs py-1 px-3">
                In Review
            </Badge>
        );
    };

    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                    <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">No applications submitted</h3>
                <p className="text-xs text-zinc-500 mt-1 mb-5 max-w-sm mx-auto">
                    You have not applied for any jobs yet. Start exploring opportunities tailored for you.
                </p>
                <Link to="/jobs">
                    <Button size="sm" className="bg-zinc-950 text-white hover:bg-zinc-800">
                        Explore Openings
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[140px]">Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Decision Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell className="text-xs text-zinc-500 font-medium">
                                {appliedJob?.createdAt ? appliedJob.createdAt.split("T")[0] : 'Recently'}
                            </TableCell>
                            <TableCell className="font-semibold text-zinc-900">
                                {appliedJob.job?.title || "Role Unavailable"}
                            </TableCell>
                            <TableCell className="text-zinc-600">
                                {appliedJob.job?.company?.name || "Company"}
                            </TableCell>
                            <TableCell className="text-right">
                                {getStatusBadge(appliedJob?.status)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable