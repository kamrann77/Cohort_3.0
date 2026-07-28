import { Search, ChevronDown, X } from "lucide-react";
import { useContext, useEffect } from "react";
import { MyStore } from "../../../Context/MyContext";

const selectClass = "w-full appearance-none rounded-full border border-neutral-200 bg-white py-2.5 pl-4 pr-9 text-sm text-neutral-700 transition-colors hover:border-neutral-300 focus:border-indigo-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-600"

function FilterChip({ label, onClear }) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400">
      {label}
      <button type="button" onClick={onClear} aria-label={`Remove ${label} filter`} className="hover:text-indigo-800 dark:hover:text-indigo-200">
        <X size={12} />
      </button>
    </span>
  )
}

export default function SearchBarStrip() {
  const { productsData, categoryMap, setFilterData, selectedFeature, setSelectedFeature, searchTerm, setSearchTerm, category, setCategory } = useContext(MyStore);

  useEffect(() => {
    if (!productsData) return;

    let result = [...productsData];

    if (searchTerm.trim() !== '') {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All Categories') {
      result = result.filter((item) =>
        categoryMap[category]?.includes(item.category)
      );
    }

    if (selectedFeature === 'Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedFeature === 'High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedFeature === 'Top Rated') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (selectedFeature === 'Lowest Rated') {
      result.sort((a, b) => a.rating - b.rating);
    }

    setFilterData(result);

  }, [searchTerm, category, selectedFeature, productsData]);

  const hasActiveFilters = category !== 'All Categories' || selectedFeature !== 'Featured'

  return (
    <div className="my-6 flex flex-col gap-3">
      <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-2 sm:flex-row sm:items-center sm:gap-3 sm:rounded-full dark:border-neutral-800 dark:bg-neutral-900">

        <div className="flex flex-1 items-center gap-2 px-3">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" />
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <input
            id="product-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 outline-none dark:text-white dark:placeholder-neutral-500"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-none">
            <label htmlFor="category-select" className="sr-only">Category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClass}
            >
              <option value="All Categories">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Home">Home</option>
              <option value="Sports">Sports</option>
              <option value="Accessories">Accessories</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="relative flex-1 sm:flex-none">
            <label htmlFor="sort-select" className="sr-only">Sort by</label>
            <select
              id="sort-select"
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
              className={selectClass}
            >
              <option value="Featured">Featured</option>
              <option value="Low to High">Price: Low to High</option>
              <option value="High to Low">Price: High to Low</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Lowest Rated">Lowest Rated</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {category !== 'All Categories' && (
            <FilterChip label={category} onClear={() => setCategory('All Categories')} />
          )}
          {selectedFeature !== 'Featured' && (
            <FilterChip label={selectedFeature} onClear={() => setSelectedFeature('Featured')} />
          )}
          <button
            type="button"
            onClick={() => {
              setCategory('All Categories')
              setSelectedFeature('Featured')
            }}
            className="flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
          >
            Clear All <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
