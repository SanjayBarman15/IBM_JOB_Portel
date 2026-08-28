import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal, RotateCcw } from 'lucide-react'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"]
    },
    {
        fitlerType: "Role & Discipline",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
    },
    {
        fitlerType: "Salary Range",
        array: ["0-5 LPA", "5-10 LPA", "10-20 LPA", "20+ LPA"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    const clearFilter = () => {
        setSelectedValue('');
    };

    return (
        <div className='w-full bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm'>
            <div className='flex items-center justify-between pb-4 border-b border-zinc-100'>
                <div className='flex items-center gap-2'>
                    <SlidersHorizontal className="w-4 h-4 text-zinc-900" />
                    <h2 className='font-bold text-base text-zinc-950 font-display'>Filter Roles</h2>
                </div>
                {selectedValue && (
                    <button 
                        onClick={clearFilter} 
                        className='text-xs text-zinc-500 hover:text-zinc-950 hover:underline flex items-center gap-1 font-medium transition-colors'
                    >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                    </button>
                )}
            </div>

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="mt-4 space-y-6">
                {fitlerData.map((data, index) => (
                    <div key={index} className="space-y-2.5">
                        <h3 className='font-semibold text-xs text-zinc-400 uppercase tracking-wider'>
                            {data.fitlerType}
                        </h3>
                        <div className="space-y-1.5">
                            {data.array.map((item, idx) => {
                                const itemId = `filter-${index}-${idx}`;
                                const isSelected = selectedValue === item;
                                return (
                                    <div 
                                        key={idx}
                                        onClick={() => changeHandler(item)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                                            isSelected 
                                                ? 'bg-zinc-950 text-white font-medium shadow-sm' 
                                                : 'text-zinc-700 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <div className='flex items-center space-x-2.5'>
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId} 
                                                className={isSelected ? "border-white" : "border-zinc-300"} 
                                            />
                                            <Label htmlFor={itemId} className={`cursor-pointer ${isSelected ? 'text-white font-medium' : 'text-zinc-700'}`}>
                                                {item}
                                            </Label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard