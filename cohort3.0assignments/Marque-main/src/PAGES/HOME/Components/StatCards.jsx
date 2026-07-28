import React, { useContext } from 'react'
import { Package, TrendingUp, Star, Tag } from 'lucide-react'
import { MyStore } from '../../../Context/MyContext'

const STAT_STYLES = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    blue: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
}

const StatCard = ({ icon, tone, value, label, hint }) => {
    const Icon = icon
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${STAT_STYLES[tone]}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-lg font-semibold text-neutral-900 dark:text-white">{value}</p>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{label}</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">{hint}</p>
            </div>
        </div>
    )
}

const StatCards = () => {
    const { cartData } = useContext(MyStore)

    const cartValue = cartData.reduce((acc, curr) => acc + (curr.price + curr.quantity), 0).toFixed(2)

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Package} tone="indigo" value={cartData.length} label="Cart Items" hint="In your bag" />
            <StatCard icon={TrendingUp} tone="blue" value={`$${cartValue}`} label="Cart Value" hint="Ready to checkout" />
            <StatCard icon={Star} tone="amber" value="5" label="Top Products" hint="Highly rated" />
            <StatCard icon={Tag} tone="violet" value="6" label="Categories" hint="To explore" />
        </div>
    )
}

export default StatCards
