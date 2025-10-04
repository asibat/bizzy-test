import { Context } from "../../types/context";

export const productResolvers = {
  Query: {
    products: async (_: any, __: any, context: Context) => {
      return await context.services.productService.getAllProducts();
    },

    product: async (_: any, { id }: { id: string }, context: Context) => {
      return await context.services.productService.getProductById(id);
    },
  },
};
