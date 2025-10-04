import { productResolvers } from "./product.resolver";

export const resolvers = {
  Query: {
    ...productResolvers.Query,
  },
};
