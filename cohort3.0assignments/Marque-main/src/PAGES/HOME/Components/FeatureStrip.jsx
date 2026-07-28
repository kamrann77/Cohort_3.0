import React from 'react'
import { Truck, ShieldCheck, BadgePercent } from 'lucide-react'

const FEATURES = [
    { icon: Truck, title: 'Fast Delivery', hint: 'Same-day on select items' },
    { icon: ShieldCheck, title: 'Secure Payments', hint: '100% encrypted checkout' },
    { icon: BadgePercent, title: 'Best Prices', hint: 'Price-match guarantee' },
]

const FeatureStrip = () => {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                    <div
                        key={feature.title}
                        className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <Icon size={20} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                        <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">{feature.title}</p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">{feature.hint}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FeatureStrip
