import { QuantityDiscountRule } from "./QuantityDiscountRule";
import { VipCustomerDiscountRule } from "./VipCustomerDiscountRule";
import { DiscountRule } from "./DiscountRule";

export function discountRuleFactory(ruleConfig: any): DiscountRule {
  switch (ruleConfig.type) {
    case "quantity":
      return new QuantityDiscountRule(
        ruleConfig.name,
        ruleConfig.description,
        ruleConfig.productId,
        ruleConfig.minQty,
        ruleConfig.percentOff
      );
    case "vip":
      return new VipCustomerDiscountRule(
        ruleConfig.name,
        ruleConfig.description,
        ruleConfig.percentOff
      );
    default:
      throw new Error("Unknown discount rule type: " + ruleConfig.type);
  }
}
