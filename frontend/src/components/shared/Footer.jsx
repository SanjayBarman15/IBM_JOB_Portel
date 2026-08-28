import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Linkedin, Github, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'contact@talentspot.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Tech Avenue, Silicon Boulevard' },
  ];

  const footerLinks = [
    { 
      title: 'For Job Seekers', 
      links: [
        { label: 'Browse Jobs', to: '/jobs' },
        { label: 'Explore Categories', to: '/browse' },
        { label: 'Profile Setup', to: '/profile' },
        { label: 'Salary Estimator', to: '/jobs' }
      ] 
    },
    { 
      title: 'For Employers', 
      links: [
        { label: 'Post a Job', to: '/admin/jobs/create' },
        { label: 'Company Hub', to: '/admin/companies' },
        { label: 'Review Applicants', to: '/admin/jobs' },
        { label: 'Hiring Insights', to: '/admin/companies' }
      ] 
    },
    { 
      title: 'Platform', 
      links: [
        { label: 'About TalentSpot', to: '/' },
        { label: 'Security & Privacy', to: '/' },
        { label: 'Terms of Service', to: '/' },
        { label: 'Contact Support', to: '/' }
      ] 
    },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className='w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200'>
                <Sparkles className="w-4 h-4 text-zinc-950" />
              </div>
              <span className='text-2xl font-bold tracking-tight text-white font-display'>
                Talent<span className="text-zinc-500 font-medium">Spot</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              The high-performance job network connecting exceptional builders, engineers, and creatives with industry-defining companies.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all duration-200"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider font-display">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.to}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar & Contacts */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-2">
                <info.icon className="w-3.5 h-3.5 text-zinc-400" />
                <span>{info.text}</span>
              </div>
            ))}
          </div>

          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} TalentSpot Inc. Built with modern precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;