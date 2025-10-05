import { basketResolvers } from "./basket.resolver";
import { discountRuleResolvers } from "./discountRule.resolver";
import { productResolvers } from "./product.resolver";

export const resolvers = {
  Query: {
    ...productResolvers.Query,
    ...basketResolvers.Query,
    ...discountRuleResolvers.Query,
  },
  Mutation: {
    ...basketResolvers.Mutation,
    ...discountRuleResolvers.Mutation,
  },
};
