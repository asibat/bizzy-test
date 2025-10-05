import { basketResolvers } from "./basket.resolver";
import { productResolvers } from "./product.resolver";

export const resolvers = {
  Query: {
    ...productResolvers.Query,
    ...basketResolvers.Query,
  },
  Mutation: {
    ...basketResolvers.Mutation,
  },
};
