import type { Product } from "../types/Product";
import { useMutation } from "@apollo/client/react";
import { DEFAULT_CUSTOMER_ID } from "../context/BasketContext";
import { ADD_TO_BASKET } from "../graphql/mutations";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({ product }: { product: Product }) {
  const [addToBasket] = useMutation(ADD_TO_BASKET);

  const handleAddToBasket = async () => {
    await addToBasket({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: product.id,
        quantity: 1,
      },
      refetchQueries: ["GetBasket"],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-stretch min-h-[170px] overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="sm:w-32 w-full h-28 sm:h-32 flex justify-center items-center bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain max-w-[112px] max-h-[88px] rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 px-4 py-3">
        <div>
          <h3 className="text-lg font-semibold mb-1 text-gray-900">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-1 bg-blue-50 rounded text-xs text-blue-600">
              Accessories
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-700 font-bold text-base">
            ${product.price}
          </span>
          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-semibold shadow"
            onClick={handleAddToBasket}
            aria-label="Add to Basket"
          >
            <AddIcon className="w-5 h-5" />
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
