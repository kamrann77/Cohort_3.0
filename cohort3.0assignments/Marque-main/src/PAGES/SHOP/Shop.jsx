import React, { useContext, useMemo } from 'react'
import { PackageSearch } from 'lucide-react'
import SearchBarStrip from './Components/SearchBarStrip'
import { MyStore } from '../../Context/MyContext'
import ProductCard from './Components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import EmptyState from '../../components/EmptyState'
import { Outlet, useLocation } from 'react-router'

const PRODUCT_GRID_CLASS = 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'

const Shop = () => {
    const { filterData, productsData, setCategory, setSelectedFeature, setSearchTerm } = useContext(MyStore)
    const location = useLocation()
    const isProductDetail = location.pathname.includes('/product/')

    const viewMode = location.state?.viewMode

    const newArrivals = useMemo(() => {
        return [...productsData]
            .sort((a, b) => new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0))
            .slice(0, 5)
    }, [productsData])

    const topRateProduct = useMemo(() => {
        return [...productsData]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
    }, [productsData])

    const isLoading = productsData.length === 0

    function clearFilters() {
        setCategory('All Categories')
        setSelectedFeature('Featured')
        setSearchTerm('')
    }

    if (isProductDetail) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div>
                <h1 className="text-3xl font-medium text-neutral-900 dark:text-white">All Products</h1>
                <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">
                    {productsData.length} products found
                </p>
            </div>

            <SearchBarStrip />

            {isLoading ? (
                <div className={PRODUCT_GRID_CLASS}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <>
                    {viewMode === 'newArrivals' && (
                        <div className="mt-6">
                            <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white">New Arrivals</h2>
                            <div className={PRODUCT_GRID_CLASS}>
                                {newArrivals.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <div className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
                        </div>
                    )}

                    {viewMode === 'topRated' && (
                        <div className="mt-6">
                            <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white">Top Rated</h2>
                            <div className={PRODUCT_GRID_CLASS}>
                                {topRateProduct.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            <div className="my-6 border-t border-neutral-200 dark:border-neutral-800" />
                        </div>
                    )}

                    {filterData.length === 0 ? (
                        <EmptyState
                            className="mt-6"
                            icon={PackageSearch}
                            title="No products found"
                            message="Try adjusting your search or filters."
                            actionLabel="Clear filters"
                            onAction={clearFilters}
                        />
                    ) : (
                        <div className={`mt-6 ${PRODUCT_GRID_CLASS}`}>
                            {filterData.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Shop
