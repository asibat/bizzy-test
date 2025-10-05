import { DiscountRule } from "./DiscountRule";
import { QuantityDiscountRule } from "./discountRules/QuantityDiscountRule";
import { RepeatCustomerDiscountRule } from "./discountRules/RepeatCustomerDiscountRule";
import { VipCustomerDiscountRule } from "./discountRules/VipCustomerDiscountRule";
import { WeekendDiscountRule } from "./discountRules/WeekendDiscountRule";

type DiscountRuleConstructor = (config: any) => DiscountRule;

const ruleRegistry: Record<string, DiscountRuleConstructor> = {
  quantity: (config) =>
    new QuantityDiscountRule(
      config.productId,
      config.minQty,
      config.percentOff
    ),
  vip: (config) => new VipCustomerDiscountRule(config.percentOff),
  weekend: (config) =>
    new WeekendDiscountRule(config.productId, config.minQty, config.percentOff),
  repeat: (config) =>
    new RepeatCustomerDiscountRule(config.minOrders, config.percentOff),
};

export function registerRule(type: string, ctor: DiscountRuleConstructor) {
  ruleRegistry[type] = ctor;
}

export function discountRuleFactory(ruleConfig: any): DiscountRule {
  const ctor = ruleRegistry[ruleConfig.type];
  if (!ctor) throw new Error("Unknown discount rule type: " + ruleConfig.type);
  return ctor(ruleConfig);
}

registerRule(
  "weekend",
  (config) =>
    new WeekendDiscountRule(config.productId, config.minQty, config.percentOff)
);

registerRule(
  "quantity",
  (config) =>
    new QuantityDiscountRule(config.productId, config.minQty, config.percentOff)
);

registerRule("vip", (config) => new VipCustomerDiscountRule(config.percentOff));
registerRule(
  "repeat",
  (config) =>
    new RepeatCustomerDiscountRule(config.minOrders, config.percentOff)
);
