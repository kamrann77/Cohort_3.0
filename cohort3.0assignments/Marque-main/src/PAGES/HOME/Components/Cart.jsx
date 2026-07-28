import { PackageOpen, ShoppingBag, X } from 'lucide-react'
import React, { useContext } from 'react'
import { MyStore } from '../../../Context/MyContext'
import CartItem from '../Components/CartItem'
import { useNavigate } from 'react-router'
import { toast } from "react-toastify"

const Cart = () => {
    const { setCartToggle, cartData, setCartData, productsData, setProductsData } = useContext(MyStore)

    const isEmpty = cartData.length
    const navigate = useNavigate()

    return (
        <div
            onClick={() => setCartToggle(false)}
            className='fixed z-30 flex h-screen w-screen animate-fadein justify-end bg-black/50 backdrop-blur-[2px]'>
            <div
                onClick={(e) => e.stopPropagation()}
                className='flex h-screen w-full animate-slidein flex-col border-l border-neutral-200 bg-white sm:w-[70%] md:w-[45%] lg:w-[28%] dark:border-neutral-800 dark:bg-neutral-900'>

                <div className='flex items-center justify-between border-b border-neutral-200 p-4.5 dark:border-neutral-800'>
                    <div className='flex items-center gap-3'>
                        <ShoppingBag className='text-indigo-600 dark:text-indigo-400' size={20} />
                        <p className='text-lg font-medium text-neutral-900 dark:text-white'>Cart</p>
                        {!isEmpty && (
                            <span className='rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white'>
                                {cartData.length} items
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        aria-label="Close cart"
                        onClick={() => setCartToggle(false)}
                        className='text-neutral-400 transition-colors duration-150 hover:text-neutral-900 dark:hover:text-white'
                    >
                        <X size={20} />
                    </button>
                </div>

                {!isEmpty ? (
                    <div className='flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center'>
                        <div className='flex h-20 w-20 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800'>
                            <PackageOpen size={32} className='text-neutral-400 dark:text-neutral-500' />
                        </div>
                        <div>
                            <p className='text-lg font-medium text-neutral-900 dark:text-white'>Cart is empty</p>
                            <p className='mt-1 text-sm text-neutral-400 dark:text-neutral-500'>Go shop something cool!</p>
                        </div>
                        <button
                            onClick={() => {
                                setCartToggle(false)
                                navigate('/shop')
                            }}
                            className='mt-2 rounded-full bg-indigo-600 px-6 py-2.5 font-medium text-white transition-colors duration-150 hover:bg-indigo-500'>
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <>
                        <div className='scrollbar-none flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4'>
                            {cartData.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                        <div className='flex flex-col gap-3 border-t border-neutral-200 p-4.5 dark:border-neutral-800'>
                            <div className='flex items-center justify-between text-neutral-900 dark:text-white'>
                                <p className='text-base'>Total</p>
                                <p className='text-xl font-semibold'>${cartData.reduce((acc, curr) => {
                                    return acc + (curr.price * curr.quantity)
                                }, 0).toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => {
                                    toast.success("Order Placed🛒")
                                    const resetCart = productsData.map((val) => {
                                        return { ...val, added: true }
                                    })
                                    setProductsData(resetCart)
                                    setCartData([])

                                    localStorage.setItem('cartItems', JSON.stringify([]))
                                    localStorage.setItem('savedProducts', JSON.stringify(resetCart))
                                    setCartToggle(false)
                                }}
                                className='flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 py-3 font-medium text-white transition-colors duration-150 hover:bg-indigo-500'>
                                Checkout →
                            </button>
                            <button
                                onClick={() => {
                                    const resetCart = productsData.map((val) => {
                                        return { ...val, added: true }
                                    })
                                    setProductsData(resetCart)
                                    setCartData([])

                                    localStorage.setItem('cartItems', JSON.stringify([]))
                                    localStorage.setItem('savedProducts', JSON.stringify(resetCart))
                                }}
                                className='text-center text-xs text-neutral-400 transition-colors duration-150 hover:text-neutral-900 dark:hover:text-white'>
                                Clear cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Cart
