import { GraphQLContext } from "../../main";

export const basketResolvers = {
  Mutation: {
    addToBasket: async (
      _: any,
      {
        customerId,
        productId,
        quantity,
      }: { customerId: string; productId: string; quantity: number },
      context: GraphQLContext
    ) => {
      if (
        !customerId ||
        !productId ||
        typeof quantity !== "number" ||
        quantity < 1
      ) {
        throw new Error(
          "Invalid input: customerId, productId, and quantity are required."
        );
      }
      try {
        return await context.services.basketService.addToBasket(customerId, {
          productId,
          quantity,
        });
      } catch (err) {
        // Error handling (mapping, hiding internals, etc.)
        throw new Error(`Failed to add to basket: ${(err as Error).message}`);
      }
    },

    updateBasketItem: async (
      _: any,
      {
        customerId,
        productId,
        quantity,
      }: { customerId: string; productId: string; quantity: number },
      context: GraphQLContext
    ) => {
      if (!customerId || !productId || typeof quantity !== "number") {
        throw new Error(
          "Invalid input: customerId, productId, and quantity are required."
        );
      }
      try {
        return await context.services.basketService.updateBasketItem(
          customerId,
          productId,
          quantity
        );
      } catch (err) {
        throw new Error(
          `Failed to update basket item: ${(err as Error).message}`
        );
      }
    },

    removeBasketItem: async (
      _: any,
      { customerId, productId }: { customerId: string; productId: string },
      context: GraphQLContext
    ) => {
      if (!customerId || !productId) {
        throw new Error(
          "Invalid input: customerId and productId are required."
        );
      }
      try {
        return await context.services.basketService.removeBasketItem(
          customerId,
          productId
        );
      } catch (err) {
        throw new Error(
          `Failed to remove basket item: ${(err as Error).message}`
        );
      }
    },
  },

  Query: {
    getBasket: async (_: any, { customerId }: any, context: GraphQLContext) => {
      if (!customerId) {
        throw new Error("customerId required");
      }
      try {
        const basket =
          await context.services.basketService.getBasketWithDiscount(
            customerId
          );

        if (!basket) {
          throw new Error("Basket not found");
        }

        return {
          id: basket.id,
          customerId: basket.customerId,
          items: basket.items || [],
          subtotal: basket.subtotal ?? 0,
          discount: basket.discount ?? 0,
          discountBreakdown: basket.discountBreakdown ?? [],
          total: basket.total ?? 0,
        };
      } catch (err) {
        throw new Error("Could not get basket");
      }
    },
  },
};
