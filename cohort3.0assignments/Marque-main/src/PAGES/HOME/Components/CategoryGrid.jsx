import React, { useContext } from 'react'
import { Laptop, Shirt, Armchair, Home, Dumbbell, Backpack, ArrowRight } from 'lucide-react'
import { MyStore } from '../../../Context/MyContext'
import { useNavigate } from 'react-router'

const CATEGORIES = [
    { name: 'Electronics', icon: Laptop },
    { name: 'Clothing', icon: Shirt },
    { name: 'Furniture', icon: Armchair },
    { name: 'Home', icon: Home },
    { name: 'Sports', icon: Dumbbell },
    { name: 'Accessories', icon: Backpack },
]

const CategoryGrid = () => {
    const navigate = useNavigate()
    const { productsData, categoryMap, setCategory } = useContext(MyStore)

    const subCategoryCount = productsData.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1
        return acc
    }, {})

    const counts = Object.fromEntries(
        Object.entries(categoryMap).map(([mainCat, subCats]) => [
            mainCat,
            subCats.reduce((acc, sub) => acc + (subCategoryCount[sub] || 0), 0),
        ])
    )

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Shop by Category</h2>
                <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="flex items-center gap-1 text-sm font-medium text-indigo-600 transition-transform duration-150 hover:scale-105 active:scale-95 dark:text-indigo-400"
                >
                    View All <ArrowRight size={14} />
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon
                    return (
                        <button
                            key={cat.name}
                            type="button"
                            onClick={() => {
                                setCategory(cat.name)
                                navigate('/shop')
                            }}
                            className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-5 text-center transition-all duration-150 hover:-translate-y-1 hover:border-indigo-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-500/30"
                        >
                            <Icon size={22} className="text-indigo-600 dark:text-indigo-400" />
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{cat.name}</p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">{counts[cat.name]} items</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryGrid
