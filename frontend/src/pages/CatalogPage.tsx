import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Typography } from "@mui/material";
import CatalogList from "../components/CatalogList";
import type { Product } from "../types/Product";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      category
      sku
      imageUrl
    }
  }
`;

interface ProductData {
  products: Product[];
}
export default function CatalogPage() {
  const { data, loading, error } = useQuery<ProductData>(GET_PRODUCTS);
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading products.</Typography>;

  if (!data || !data.products.length) {
    return <Typography>No Products</Typography>;
  }
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8 w-full">
      <Typography variant="h4" className="mb-6 font-bold text-gray-900">
        Product Catalog
      </Typography>
      <CatalogList products={data.products} />
    </div>
  );
}
