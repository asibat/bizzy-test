import type { Product } from "../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-stretch min-h-[170px] overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="sm:w-32 w-full h-28 sm:h-32 flex justify-center items-center bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain max-w-[112px] max-h-[88px] rounded-lg"
        />
      </div>

      {/* DETAILS RIGHT */}
      <div className="flex flex-col justify-between flex-1 px-4 py-3">
        <div>
          <h3 className="text-lg font-semibold mb-1 text-gray-900">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          {/* Sample tags */}
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-1 bg-blue-50 rounded text-xs text-blue-600">
              Accessories
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">
              QWERTY
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-700 font-bold text-base">
            ${product.price}
          </span>
          {/* Heart/Wishlist icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <svg width={22} height={22} fill="none" stroke="currentColor">
              <path
                d="M6 7C6 4.2386 8.2386 2 11 2C13.7614 2 16 4.2386 16 7C16 9.021 15.1843 10.5247 13.9802 11.8696C13.2363 12.7078 12.414 13.4215 11.7112 13.9891C11.4977 14.1677 11.2493 14.3128 11 14.3128C10.7507 14.3128 10.5023 14.1677 10.2888 13.9891C9.58597 13.4215 8.76367 12.7078 8.01984 11.8696C6.81571 10.5247 6 9.021 6 7Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
