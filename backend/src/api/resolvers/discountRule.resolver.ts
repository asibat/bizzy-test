export const discountRuleResolvers = {
  Query: {
    discountRules: (_parent: any, _args: any, { prisma }: any) =>
      prisma.discountRule.findMany(),
    discountRule: (_parent: any, { id }: any, { prisma }: any) =>
      prisma.discountRule.findUnique({ where: { id } }),
  },
  Mutation: {
    createDiscountRule: (_parent: any, { input }: any, { prisma }: any) =>
      prisma.discountRule.create({ data: input }),
    updateDiscountRule: (_parent: any, { id, input }: any, { prisma }: any) =>
      prisma.discountRule.update({ where: { id }, data: input }),
    deleteDiscountRule: async (_parent: any, { id }: any, { prisma }: any) => {
      await prisma.discountRule.delete({ where: { id } });
      return true;
    },
  },
};
