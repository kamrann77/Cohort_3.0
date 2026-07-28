import { Star } from "lucide-react";
import { useContext } from "react";
import { MyStore } from "../../../Context/MyContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AddToCartButton from "../../../components/AddToCartButton";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { setCartToggle, cartData, setCartData, productsData, setProductsData } = useContext(MyStore)

  function addToCart() {
    const upDataCartData = [...cartData, { ...product, quantity: (product.quantity || 0) + 1 }]
    const updateAllData = productsData.map((val) => {
      return val.id === product.id ? { ...val, added: false } : val
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
      onClick={() => navigate(`/shop/product/${product.id}`)}
      className="group w-full max-w-70 cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors duration-150 hover:border-neutral-300 sm:rounded-2xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <div className="relative h-36 overflow-hidden bg-neutral-50 sm:h-64 dark:bg-neutral-800">
        <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[10px] text-neutral-600 sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs dark:bg-neutral-900/90 dark:text-neutral-300">
          {product.category}
        </span>
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
        />
      </div>

      <div className="p-2.5 sm:p-4">
        <p className="text-[10px] text-neutral-400 sm:text-xs dark:text-neutral-500">{product.category}</p>
        <h3 className="mt-0.5 truncate text-sm font-semibold text-neutral-900 transition-colors duration-150 group-hover:text-indigo-600 sm:mt-1 sm:text-base dark:text-white dark:group-hover:text-indigo-400">
          {product.title}
        </h3>

        <div className="mt-1 flex items-center gap-1 text-xs text-neutral-400 sm:mt-2 sm:text-sm dark:text-neutral-500">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" />
          <span>{product.rating}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between border-t border-neutral-100 pt-2 sm:mt-3 sm:pt-3 dark:border-neutral-800">
          <span className="text-sm font-medium text-neutral-900 sm:text-lg dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton
            added={product.added}
            onAdd={(e) => {
              e.stopPropagation()
              addToCart()
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard
