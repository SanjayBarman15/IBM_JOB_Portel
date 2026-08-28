import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                    <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">No Companies Found</h3>
                <p className="text-xs text-zinc-500 mt-1 mb-5 max-w-sm mx-auto">
                    You have not registered any companies yet or no companies match your search.
                </p>
                <Button 
                    onClick={() => navigate("/admin/companies/create")}
                    size="sm" 
                    className="bg-zinc-950 text-white hover:bg-zinc-800"
                >
                    <Plus className="w-4 h-4 mr-1.5" /> Register First Company
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company?._id || company?.name} className="hover:bg-zinc-50/80">
                            <TableCell>
                                <Avatar className="h-10 w-10 border border-zinc-200">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                    <AvatarFallback className="bg-zinc-100 text-zinc-800 font-bold text-xs">
                                        {company?.name ? company.name.slice(0, 2).toUpperCase() : 'CO'}
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-semibold text-zinc-950">
                                {company.name}
                            </TableCell>
                            <TableCell className="text-xs text-zinc-500 font-medium">
                                {company.createdAt ? company.createdAt.split("T")[0] : 'Recently'}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="w-8 h-8 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 inline-flex items-center justify-center transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 p-1.5 bg-white rounded-xl border border-zinc-200 shadow-lg" align="end">
                                        <button 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors text-left'
                                        >
                                            <Edit2 className='w-3.5 h-3.5' />
                                            <span>Edit Profile</span>
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

export default CompaniesTable