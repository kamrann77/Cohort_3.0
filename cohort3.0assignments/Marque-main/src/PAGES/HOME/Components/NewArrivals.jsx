import React, { useContext } from 'react'
import { Zap, ArrowRight } from 'lucide-react'
import { MyStore } from '../../../Context/MyContext'
import NewProducts from './NewProducts'
import { useNavigate } from 'react-router'

const NewArrivals = () => {
    const { productsData } = useContext(MyStore)
    const navigate = useNavigate()

    const newArrivals = [...productsData]
        .sort((a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt))
        .slice(0, 5)

    function seeAllHandler() {
        navigate('/shop', { state: { viewMode: 'newArrivals' } })
    }

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    <Zap size={16} className="text-indigo-600 dark:text-indigo-400" fill="currentColor" /> New Arrivals
                </h3>
                <button
                    type="button"
                    onClick={seeAllHandler}
                    className="flex items-center gap-1 text-[13px] font-medium text-indigo-600 transition-transform duration-150 hover:scale-105 active:scale-95 dark:text-indigo-400"
                >
                    See all <ArrowRight size={13} />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {newArrivals.map((item) => (
                    <NewProducts key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default NewArrivals
