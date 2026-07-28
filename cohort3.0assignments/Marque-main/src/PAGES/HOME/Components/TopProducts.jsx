import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MyStore } from '../../../Context/MyContext'
import { toast } from 'react-toastify'
import AddToCartButton from '../../../components/AddToCartButton'

const TopProducts = ({ item }) => {
    const navigate = useNavigate()
    const { setCartToggle, cartData, setCartData, productsData, setProductsData } = useContext(MyStore)

    function addToCart() {
        const upDataCartData = [...cartData, { ...item, quantity: (item.quantity || 0) + 1 }]
        const updateAllData = productsData.map((val) => {
            return val.id === item.id ? { ...val, added: false } : val
        })
        setProductsData(updateAllData)
        setCartData(upDataCartData)
        setCartToggle(true)

        localStorage.setItem('savedProducts', JSON.stringify(updateAllData))
        localStorage.setItem('cartItems', JSON.stringify(upDataCartData))
        toast.success('Added to Cart🛒')
    }

    return (
        <div
            onClick={() => navigate(`/shop/product/${item.id}`)}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-neutral-100 px-3 py-2 transition-colors duration-150 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <img src={item.images[0]} alt={item.title} className="h-full w-full object-contain" />
                </div>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</span>
            </div>
            <AddToCartButton
                size="sm"
                added={item.added}
                onAdd={(e) => {
                    e.stopPropagation()
                    addToCart()
                }}
            />
        </div>
    )
}

export default TopProducts
