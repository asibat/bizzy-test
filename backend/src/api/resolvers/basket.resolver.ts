export const basketResolvers = {
  Mutation: {
    addToBasket: async (
      _: any,
      {
        customerId,
        productId,
        quantity,
      }: { customerId: string; productId: string; quantity: number },
      { dataSources }: { dataSources: any }
    ) => {
      let basket = await dataSources.basketRepository.findByCustomerId(
        customerId
      );
      if (!basket) {
        basket = await dataSources.basketRepository.create({
          customerId,
          items: [],
        });
      }
      const updatedBasket = await dataSources.basketRepository.addItem(
        customerId,
        { productId, quantity }
      );
      return updatedBasket;
    },
  },
  Query: {
    getBasket: async (_: any, { customerId }: any, { services }: any) => {
      return await services.basketService.getBasket(customerId);
    },
  },
};
