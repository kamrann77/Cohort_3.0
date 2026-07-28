import React, { useContext } from 'react'
import { Star, ArrowRight } from 'lucide-react'
import { MyStore } from '../../../Context/MyContext'
import TopProducts from './TopProducts'
import { useNavigate } from 'react-router'

const TopRated = () => {
    const navigate = useNavigate()
    const { productsData } = useContext(MyStore)

    const topRatedProducts = [...productsData]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)

    function seeAllHandler() {
        navigate('/shop', { state: { viewMode: 'topRated' } })
    }

    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    <Star size={16} className="text-amber-400" fill="currentColor" /> Top Rated
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
                {topRatedProducts.map((item) => (
                    <TopProducts key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default TopRated
