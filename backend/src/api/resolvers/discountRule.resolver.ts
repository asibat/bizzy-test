// import { Context } from "../../types/context";

// interface DiscountRuleInput {
//   name: string;
//   type: string;
//   description?: string;
//   parameters: any;
//   enabled?: boolean;
//   priority?: number;
// }

// export const discountRuleResolvers = {
//   Query: {
//     discountRules: async (
//       _: any,
//       { enabled }: { enabled?: boolean },
//       context: Context
//     ) => {
//       return await context.services.discountRuleService.getDiscountRules(
//         enabled
//       );
//     },

//     discountRule: async (_: any, { id }: { id: string }, context: Context) => {
//       return await context.services.discountRuleService.getDiscountRuleById(id);
//     },
//   },
// };
