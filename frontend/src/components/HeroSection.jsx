import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Search, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    const searchJobHandler = (searchTarget) => {
        const term = typeof searchTarget === 'string' ? searchTarget : query;
        if (term && term.trim()) {
            dispatch(setSearchedQuery(term.trim()));
        }
        navigate("/browse");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        // Three.js setup
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        
        const handleResize = () => {
            if (!canvas) return;
            const width = window.innerWidth;
            const height = Math.min(window.innerHeight, 700);
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Create monochrome particles
        const particlesCount = 1200;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 8;
            posArray[i + 1] = (Math.random() - 0.5) * 6;
            posArray[i + 2] = (Math.random() - 0.5) * 6;

            // Monochromatic gradient from pure white to dark charcoal
            const shade = Math.random() > 0.4 ? 0.9 : 0.2;
            colorArray[i] = shade;
            colorArray[i + 1] = shade;
            colorArray[i + 2] = shade;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 2.8;

        // Mouse parallax
        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.0008;
            particlesMesh.rotation.x += 0.0004;

            // Smooth parallax ease
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    const popularTags = ["Frontend", "FullStack", "React", "Node.js", "AI Engineer", "Remote"];

    return (
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-100">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-70" />
            
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                {/* Modern Pill Badge */}
                <motion.div 
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-sm text-xs font-semibold text-zinc-800"
                >
                    <span className="flex h-2 w-2 rounded-full bg-zinc-950 animate-pulse" />
                    <span>The Premier Tech Career Network</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </motion.div>

                {/* Hero Headline */}
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 font-display leading-[1.1]"
                >
                    Search, Apply & Build <br className="hidden sm:block" />
                    Your <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-400 bg-clip-text text-transparent">Dream Career.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-base sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed"
                >
                    Connect with world-class engineering teams, innovative startups, and enterprise leaders shaping the future of software and design.
                </motion.p>

                {/* High-Performance Monochrome Search Bar */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full max-w-2xl mt-4"
                >
                    <div className="relative flex items-center p-2 rounded-2xl bg-white border border-zinc-200 shadow-card hover:border-zinc-300 transition-all group focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10">
                        <div className="pl-3.5 pr-2 text-zinc-400 group-focus-within:text-zinc-950 transition-colors">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Job title, skill, or company (e.g. Senior Frontend Developer)..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 py-2.5 text-sm sm:text-base border-none bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400"
                        />
                        <Button
                            onClick={() => searchJobHandler()}
                            className="bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm rounded-xl px-5 h-11 transition-all flex items-center gap-1.5 shrink-0"
                        >
                            <span className="font-semibold text-sm">Find Jobs</span>
                        </Button>
                    </div>

                    {/* Quick Query Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                        <span className="text-zinc-500 font-medium flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> Popular:
                        </span>
                        {popularTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setQuery(tag);
                                    searchJobHandler(tag);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-900 hover:text-zinc-950 hover:bg-zinc-50 transition-all font-medium"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;