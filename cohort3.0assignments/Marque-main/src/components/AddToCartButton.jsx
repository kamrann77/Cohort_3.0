import { ShoppingCart } from 'lucide-react'

const addedClass = 'flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 font-medium text-emerald-600 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-400'
const actionClass = 'flex items-center justify-center gap-1.5 rounded-full bg-indigo-600 font-medium text-white transition-transform duration-150 hover:bg-indigo-500 active:scale-95'

const SIZES = {
    sm: { added: `${addedClass} px-3 py-1 text-xs`, action: 'flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors duration-150 hover:bg-indigo-600 hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white' },
    md: { added: `${addedClass} px-3 py-1 text-xs`, action: `${actionClass} px-4 py-2 text-xs sm:text-sm` },
    lg: { added: `${addedClass} flex-1 py-3 text-sm`, action: `${actionClass} flex-1 py-3 text-sm` },
}

const AddToCartButton = ({ added, onAdd, size = 'md', className = '' }) => {
    const s = SIZES[size]

    if (!added) {
        return (
            <span className={`${s.added} ${className}`}>
                {size !== 'sm' && <ShoppingCart className="h-3.5 w-3.5" />}
                Added
            </span>
        )
    }

    return (
        <button type="button" onClick={onAdd} aria-label="Add to cart" className={`${s.action} ${className}`}>
            <ShoppingCart className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            {size !== 'sm' && <span>Add to cart</span>}
        </button>
    )
}

export default AddToCartButton
