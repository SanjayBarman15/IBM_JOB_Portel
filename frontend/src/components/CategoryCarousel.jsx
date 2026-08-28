import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code2, Server, Database, Sparkles, Layers, Cpu, Smartphone, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    { name: "Frontend Developer", icon: Code2, count: "120+ Jobs" },
    { name: "Backend Developer", icon: Server, count: "95+ Jobs" },
    { name: "FullStack Developer", icon: Layers, count: "150+ Jobs" },
    { name: "Data Science", icon: Database, count: "80+ Jobs" },
    { name: "AI & ML Engineer", icon: Cpu, count: "65+ Jobs" },
    { name: "Mobile Developer", icon: Smartphone, count: "45+ Jobs" },
    { name: "UI/UX Designer", icon: Palette, count: "50+ Jobs" },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">Explore Disciplines</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 font-display mt-1">
                        Browse by High-Demand Roles
                    </h2>
                </div>
                <button
                    onClick={() => navigate("/browse")}
                    className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                    <span>View all categories</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <Carousel className="w-full">
                <CarouselContent className="-ml-3 md:-ml-4">
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="pl-3 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <motion.div 
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => searchJobHandler(cat.name)}
                                className="cursor-pointer group h-full"
                            >
                                <div className="h-full p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm group-hover:border-zinc-950 group-hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all duration-300">
                                        <cat.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-950 line-clamp-1">
                                            {cat.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 mt-1 font-medium">
                                            {cat.count}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-6">
                    <CarouselPrevious className="static transform-none border-zinc-200 hover:border-zinc-900 hover:bg-zinc-100 rounded-xl" />
                    <CarouselNext className="static transform-none border-zinc-200 hover:border-zinc-900 hover:bg-zinc-100 rounded-xl" />
                </div>
            </Carousel>
        </section>
    );
};

export default CategoryCarousel;