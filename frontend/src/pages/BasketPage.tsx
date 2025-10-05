import { useBasket } from "../context/BasketContext";
import { useProducts } from "../context/ProductContext";

export default function BasketPage() {
  const { basket, dispatch } = useBasket();
  const { products, loading: productsLoading } = useProducts();

  if (productsLoading) return <div>Loading products...</div>;
  if (!basket) return <div>Loading basket...</div>;
  if (basket.items.length === 0) return <div>Your basket is empty.</div>;

  const productMap = new Map(products.map((product) => [product.id, product]));

  // Hydrate basket items
  const enrichedItems = basket.items.map((item) => ({
    ...item,
    product: productMap.get(item.productId),
  }));

  if (!basket.items.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <span className="text-6xl mb-2">🛒</span>
        <p className="text-xl">Your basket is empty</p>
        <a
          href="/products"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700"
        >
          Go Shopping
        </a>
      </div>
    );
  }

  const total = enrichedItems.reduce((sum, item) => {
    const price =
      typeof item.product?.price === "number" ? item.product.price : 0;
    return sum + price * item.quantity;
  }, 0);
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Your Basket</h2>
      <div className="space-y-4">
        {enrichedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-lg shadow p-4 gap-4 relative border hover:border-blue-300 transition"
          >
            <img
              src={item.product?.imageUrl || "/no-image.png"}
              alt={item.product?.name}
              className="w-20 h-20 rounded object-contain bg-gray-100 border"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg">{item.product?.name}</div>
              <div className="text-gray-500 text-sm truncate">
                {item.product?.description}
              </div>
              <div className="mt-1 text-blue-600 font-bold">
                €{item.product?.price.toFixed(2) ?? "N/A"}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  className="bg-gray-100 text-lg px-2 hover:bg-blue-100"
                  disabled={item.quantity === 1}
                  onClick={() => dispatch({ type: "DECREMENT", id: item.id })}
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  className="bg-gray-100 text-lg px-2 hover:bg-blue-100"
                  onClick={() => dispatch({ type: "INCREMENT", id: item.id })}
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 text-xs hover:underline"
                onClick={() => dispatch({ type: "REMOVE", id: item.id })}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <div className="bg-gray-50 rounded-lg px-6 py-4 w-full max-w-xs shadow-md text-right">
          <div className="flex justify-between mb-2">
            <span className="text-lg font-semibold text-gray-700">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              €{total.toFixed(2)}
            </span>
          </div>
          <button className="mt-3 w-full py-2 bg-blue-600 rounded text-white font-semibold text-lg hover:bg-blue-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
