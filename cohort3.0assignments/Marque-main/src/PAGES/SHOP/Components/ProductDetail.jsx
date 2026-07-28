import { Star, ArrowLeft, ChevronLeft, ChevronRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { MyStore } from "../../../Context/MyContext";
import ProductCard from "./ProductCard";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from 'react-toastify'
import AddToCartButton from "../../../components/AddToCartButton";

const perkClass = "flex flex-col items-center gap-1 rounded-xl border border-neutral-200 px-2 py-3 text-center sm:gap-2 sm:py-4 dark:border-neutral-800"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [singleProduct, setsingleProduct] = useState(null)

  const { setCartToggle, cartData, setCartData, productsData, setProductsData } = useContext(MyStore)
  const currIndex = productsData.findIndex((item) => item.id === Number(id))

  const singleProductData = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`)
      setsingleProduct(res.data)
    } catch (error) {
      console.log('error =>', error)
    }
  }

  useEffect(() => {
    setsingleProduct(null)
    singleProductData()
    window.scrollTo(0, 0)
  }, [id])

  function addToCart() {
    const upDataCartData = [...cartData, { ...singleProduct, quantity: (singleProduct.quantity || 0) + 1 }]
    const updateAllData = productsData.map((val) => {
      return val.id === singleProduct.id ? { ...val, added: false } : val
    })
    setProductsData(updateAllData)
    setCartData(upDataCartData)
    setCartToggle(true)

    localStorage.setItem('savedProducts', JSON.stringify(updateAllData))
    localStorage.setItem('cartItems', JSON.stringify(upDataCartData))
    toast.success('Added to Cart🛒')
  }

  if (!singleProduct) {
    return (
      <div className="animate-pulse">
        <div className="mb-6 h-4 w-40 rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="h-56 rounded-xl bg-neutral-100 sm:h-96 lg:h-130 lg:rounded-2xl dark:bg-neutral-800" />
          <div className="flex flex-col gap-4">
            <div className="h-5 w-24 rounded-full bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-8 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-4 w-32 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-10 w-28 rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-20 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-12 w-full rounded-full bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    )
  }

  const relatedProducts = productsData.filter(
    (item) => item.category === singleProduct.category && item.id !== singleProduct.id
  )

  return (
    <div className="text-neutral-900 dark:text-white">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 sm:mb-6 sm:gap-2 sm:text-sm dark:text-neutral-500">
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Products</span>
        </button>
        <span>/</span>
        <span>{singleProduct.category}</span>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white">{singleProduct.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="flex h-56 items-center justify-center rounded-xl bg-neutral-50 sm:h-96 lg:h-130 lg:rounded-2xl dark:bg-neutral-900">
          <img
            src={singleProduct.images[0]}
            alt={singleProduct.title}
            className="h-full w-full rounded-xl object-cover lg:rounded-2xl"
          />
        </div>

        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            {singleProduct.category}
          </span>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
            {singleProduct.title}
          </h1>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-400 sm:mt-3 dark:text-neutral-500">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-neutral-900 dark:text-white">{singleProduct.rating}</span>
            <span>({singleProduct.reviews?.length || 0} reviews)</span>
          </div>

          <div className="mt-4 border-t border-neutral-200 pt-4 sm:mt-6 sm:pt-6 dark:border-neutral-800">
            <span className="text-3xl font-bold text-indigo-600 sm:text-4xl dark:text-indigo-400">
              ${singleProduct.price.toFixed(2)}
            </span>
          </div>

          <p className="mt-4 border-t border-neutral-200 pt-4 text-sm leading-relaxed text-neutral-500 sm:mt-6 sm:pt-6 sm:text-base dark:border-neutral-800 dark:text-neutral-400">
            {singleProduct.description}
          </p>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-3 sm:mt-6">
            <AddToCartButton
              size="lg"
              added={productsData[currIndex]?.added}
              onAdd={() => addToCart()}
            />
          </div>

          {/* Perks */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
            <div className={perkClass}>
              <Truck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <p className="text-[11px] font-medium sm:text-xs">Free Delivery</p>
              <p className="text-[9px] text-neutral-400 sm:text-[10px] dark:text-neutral-500">On orders $50+</p>
            </div>
            <div className={perkClass}>
              <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <p className="text-[11px] font-medium sm:text-xs">Secure Pay</p>
              <p className="text-[9px] text-neutral-400 sm:text-[10px] dark:text-neutral-500">256-bit SSL</p>
            </div>
            <div className={perkClass}>
              <RotateCcw className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <p className="text-[11px] font-medium sm:text-xs">Easy Returns</p>
              <p className="text-[9px] text-neutral-400 sm:text-[10px] dark:text-neutral-500">30-day policy</p>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-5 flex items-center gap-3 sm:mt-6">
            <button
              onClick={() => {
                if (currIndex === 1) {
                  navigate(`/shop/product/${productsData[productsData.length - 1].id}`)
                  return
                }
                const prevIndex = (currIndex - 1)
                navigate(`/shop/product/${productsData[prevIndex].id}`)
              }}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-neutral-100 py-3 text-sm font-medium text-neutral-900 transition-colors duration-150 hover:bg-neutral-200 active:scale-95 sm:text-base dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() => {
                const nextIndex = (currIndex + 1) % productsData.length
                navigate(`/shop/product/${productsData[nextIndex].id}`)
              }}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-indigo-600 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500 active:scale-95 sm:text-base">
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10 sm:mt-14 lg:mt-16">
          <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">Related Products</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail
