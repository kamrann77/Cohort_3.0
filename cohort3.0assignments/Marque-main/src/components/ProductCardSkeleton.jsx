const ProductCardSkeleton = () => (
    <div className="w-full animate-pulse overflow-hidden rounded-xl bg-white sm:rounded-2xl dark:bg-neutral-900">
        <div className="h-36 bg-neutral-100 sm:h-64 dark:bg-neutral-800" />
        <div className="space-y-2 p-2.5 sm:p-4">
            <div className="h-3 w-16 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-4 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-3 w-10 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
    </div>
)

export default ProductCardSkeleton
