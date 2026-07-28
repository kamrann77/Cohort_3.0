import React, { useContext } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { MyStore } from '../../../Context/MyContext'

function greet() {
    const hour = new Date().getHours()
    return hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
}

const WelcomeBanner = () => {
    const navigate = useNavigate()
    const { profile } = useContext(MyStore)

    return (
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 sm:px-10 sm:py-10 dark:border-neutral-800 dark:bg-neutral-900">
            <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #8080801a 1px, transparent 1px), linear-gradient(to bottom, #8080801a 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 60% 100% at 100% 0%, black, transparent)',
                }}
            />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="w-full lg:max-w-lg">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
                        {greet()} 👋
                    </p>
                    <h1 className="text-3xl font-medium leading-tight text-neutral-900 sm:text-4xl dark:text-white">
                        Welcome back, <br />
                        <span className="text-indigo-600 dark:text-indigo-400">{profile.name}</span>
                    </h1>
                    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                        Discover today's picks — hand-curated products across electronics, fashion, and more.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => navigate('/shop')}
                            className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 sm:px-6"
                        >
                            Shop Now <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={() => navigate('/shop')}
                            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-400 hover:bg-neutral-100 sm:px-6 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                            View All Products
                        </button>
                    </div>
                </div>

                <div className="flex w-full flex-row gap-3 lg:w-auto lg:flex-col">
                    <div className="flex-1 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-4 text-center sm:px-6 lg:flex-none dark:border-indigo-500/20 dark:bg-indigo-500/10">
                        <p className="text-xl font-semibold text-indigo-600 sm:text-2xl dark:text-indigo-400">20+</p>
                        <p className="text-xs text-neutral-500 sm:text-[13px] dark:text-neutral-400">Products Available</p>
                    </div>
                    <div className="flex-1 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-center sm:px-6 lg:flex-none dark:border-neutral-800 dark:bg-neutral-950">
                        <p className="text-xl font-semibold text-neutral-900 sm:text-2xl dark:text-white">Free</p>
                        <p className="text-xs text-neutral-500 sm:text-[13px] dark:text-neutral-400">Delivery on $999+</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeBanner
