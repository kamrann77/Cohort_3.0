import React from 'react'
import { Package, Users, Star, Truck, ShieldCheck, Heart, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import Logo from '../../components/Logo'

const STATS = [
    { icon: Package, value: '20K+', label: 'Products' },
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Star, value: '4.9', label: 'Avg. Rating' },
    { icon: Truck, value: '99%', label: 'On-time Delivery' },
]

const VALUES = [
    { icon: ShieldCheck, title: 'Trust', text: 'Every product is verified for quality and authenticity before listing.' },
    { icon: Truck, title: 'Speed', text: 'We obsess over delivery times so your orders arrive when promised.' },
    { icon: Heart, title: 'Community', text: 'Built around real customer feedback, not just business metrics.' },
    { icon: Star, title: 'Quality', text: 'We curate the best — no filler, no junk, just great products.' },
]

const TEAM = [
    { name: 'Aryan Shah', role: 'Founder & CEO' },
    { name: 'Priya Mehta', role: 'Head of Product' },
    { name: 'Rohan Verma', role: 'Lead Engineer' },
    { name: 'Sneha Kapoor', role: 'Design Director' },
]

const About = () => {
    const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

            <div className="flex flex-col items-center text-center">
                <Logo size="lg" wordmark={false} className="mb-6" />
                <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl dark:text-white">
                    About <span className="text-indigo-600 dark:text-indigo-400">Marque</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                    Marque is a next-generation e-commerce platform built to make online
                    shopping fast, fair, and enjoyable — for everyone.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {STATS.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-200 py-6 transition-colors hover:border-indigo-200 sm:py-7 dark:border-neutral-800 dark:hover:border-indigo-500/30">
                            <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
                            <p className="text-xl font-bold text-neutral-900 sm:text-2xl dark:text-white">{stat.value}</p>
                            <p className="text-xs text-neutral-400 sm:text-sm dark:text-neutral-500">{stat.label}</p>
                        </div>
                    )
                })}
            </div>

            <div className="mt-12 rounded-2xl border border-neutral-200 p-6 sm:p-8 md:p-10 dark:border-neutral-800">
                <h2 className="mb-5 text-xl font-bold text-neutral-900 sm:text-2xl dark:text-white">Our Story</h2>
                <div className="space-y-4 text-sm leading-relaxed text-neutral-500 sm:text-base dark:text-neutral-400">
                    <p>
                        Marque started in 2022 as a small side project — two engineers tired of
                        bloated, slow e-commerce experiences. We asked ourselves: what if shopping
                        online was actually <span className="italic text-neutral-700 dark:text-neutral-300">enjoyable</span>?
                    </p>
                    <p>
                        Three years later, Marque serves over 50,000 customers across the country.
                        We stock electronics, fashion, jewelry, and everyday essentials — all at
                        prices that don't require a second mortgage.
                    </p>
                    <p>
                        We're still the same team at heart: obsessed with speed, transparency, and
                        making you feel good about every purchase you make here.
                    </p>
                </div>
            </div>

            <h2 className="mb-8 mt-16 text-center text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">
                What We Stand For
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                {VALUES.map((val) => {
                    const Icon = val.icon
                    return (
                        <div key={val.title} className="flex gap-4 rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-indigo-200 sm:p-6 dark:border-neutral-800 dark:hover:border-indigo-500/30">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                                <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="mb-1 font-semibold text-neutral-900 dark:text-white">{val.title}</h3>
                                <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{val.text}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <h2 className="mb-8 mt-16 text-center text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">
                Meet the Team
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {TEAM.map(({ name, role }) => (
                    <div key={name} className="flex flex-col items-center px-4 py-8 text-center rounded-2xl border border-neutral-200 transition-colors hover:border-indigo-200 dark:border-neutral-800 dark:hover:border-indigo-500/30">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                            {name[0]}
                        </div>
                        <p className="text-sm font-semibold text-neutral-900 sm:text-base dark:text-white">{name}</p>
                        <p className="mt-1 text-xs text-neutral-400 sm:text-sm dark:text-neutral-500">{role}</p>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex flex-col items-center rounded-2xl border border-dashed border-indigo-200 px-6 py-12 text-center dark:border-indigo-500/30">
                <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">Ready to shop?</h2>
                <p className="mt-2 text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                    Explore thousands of products at unbeatable prices.
                </p>
                <button
                    onClick={() => navigate('/shop')}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-indigo-500">
                    Browse Products <ArrowRight size={18} />
                </button>
            </div>

        </div>
    )
}

export default About
