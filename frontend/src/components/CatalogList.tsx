import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

export default function CatalogList({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-col gap-6 w-full sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
