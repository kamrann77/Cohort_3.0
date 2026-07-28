import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { MyStore } from '../../../Context/MyContext'

const CartItem = ({ item }) => {
    const { cartData, setCartData, productsData, setProductsData } = useContext(MyStore)

    function delCartItem() {
        const updatedCartData = cartData.filter((val) => val.id !== item.id)
        const updateAllProduct = productsData.map((prod) => {
            return prod.id === item.id ? { ...prod, added: true } : prod
        })
        setProductsData(updateAllProduct)
        localStorage.setItem('savedProducts', JSON.stringify(updateAllProduct))
        setCartData(updatedCartData)
        localStorage.setItem('cartItems', JSON.stringify(updatedCartData))
    }

    return (
        <div className='group flex gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 transition-colors duration-150 hover:bg-neutral-100 sm:gap-4 dark:border-neutral-800 dark:bg-neutral-800/60 dark:hover:bg-neutral-800'>

            <div className='h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20 dark:bg-neutral-950'>
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className='h-full w-full object-contain'
                />
            </div>

            <div className='flex min-w-0 flex-1 flex-col justify-between'>
                <div className='flex items-start justify-between gap-2'>
                    <p className='truncate text-sm font-medium text-neutral-900 sm:text-base dark:text-white'>
                        {item.title}
                    </p>
                    <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => delCartItem()}
                        className='shrink-0 text-neutral-400 opacity-70 transition-colors duration-150 hover:text-red-500 group-hover:opacity-100'
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className='mt-2 flex items-end justify-between'>

                    <div className='flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-2 py-1 sm:gap-3 dark:border-neutral-700 dark:bg-neutral-950'>
                        <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => {
                                if (item.quantity === 1) {
                                    delCartItem()
                                    return
                                }
                                const updateQty = cartData.map((val) => {
                                    return val.id === item.id ? { ...val, quantity: (val.quantity || 0) - 1 } : val
                                })
                                setCartData(updateQty)
                                localStorage.setItem('cartItems', JSON.stringify(updateQty))
                            }}
                            className='text-neutral-400 transition-colors duration-150 hover:text-indigo-600 dark:hover:text-indigo-400'
                        >
                            <Minus size={14} />
                        </button>
                        <span className='w-4 text-center text-sm text-neutral-900 dark:text-white'>
                            {item.quantity}
                        </span>
                        <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => {
                                const updateQty = cartData.map((val) => {
                                    return val.id === item.id ? { ...val, quantity: (val.quantity || 0) + 1 } : val
                                })
                                setCartData(updateQty)
                                localStorage.setItem('cartItems', JSON.stringify(updateQty))
                            }}
                            className='text-neutral-400 transition-colors duration-150 hover:text-indigo-600 dark:hover:text-indigo-400'
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <div className='text-right'>
                        <p className='text-sm font-semibold text-indigo-600 sm:text-base dark:text-indigo-400'>
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className='text-[10px] text-neutral-400 sm:text-xs dark:text-neutral-500'>
                            ${item.price.toFixed(2)} each
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
