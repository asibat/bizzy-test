import { BasketItem } from "@prisma/client";
import { IBasketRepository } from "../infrastructure/repositories/BasketRepository";
import { ICustomerRepository } from "../infrastructure/repositories/CustomerRepository";
import { IProductRepository } from "../infrastructure/repositories/ProductRepository";
import { IDiscountRuleRepository } from "../infrastructure/repositories/DiscountRuleRepository";
import { discountRuleFactory } from "../domain/discount/DiscountRuleFactory";
import { DiscountEngine } from "../domain/discount/DiscountEngine";

export class BasketService {
  constructor(
    private basketRepo: IBasketRepository,
    private productRepo: IProductRepository,
    private discountRuleRepo: IDiscountRuleRepository,
    private customerRepo: ICustomerRepository
  ) {}

  async addToBasket(
    customerId: string,
    item: Omit<BasketItem, "id" | "basketId">
  ) {
    let basket = await this.basketRepo.findByCustomerId(customerId);
    if (!basket) {
      basket = await this.basketRepo.create({
        customerId,
        items: [item],
      });
    } else {
      basket = await this.basketRepo.addItem(customerId, item);
    }
    return basket;
  }

  async updateBasketItem(
    customerId: string,
    productId: string,
    quantity: number
  ) {
    // Optionally, business rule: Don't allow negative quantities
    if (quantity < 1) {
      return this.removeBasketItem(customerId, productId);
    }
    return this.basketRepo.updateItemQuantity(customerId, productId, quantity);
  }

  async removeBasketItem(customerId: string, productId: string) {
    return this.basketRepo.removeItem(customerId, productId);
  }

  async getBasket(customerId: string) {
    return await this.basketRepo.findByCustomerId(customerId);
  }
  async getBasketWithDiscount(customerId: string) {
    const basket = await this.basketRepo.findByCustomerId(customerId);
    if (!basket) throw new Error("Basket not found");

    const customer = await this.customerRepo.findById(customerId);
    if (!customer) throw new Error("Customer not found");

    const orderHistory = await this.customerRepo.findOrderHistory(customerId);
    const products = await this.productRepo.findAll();

    // Load discount rules
    const ruleEntities = await this.discountRuleRepo.findMany({
      enabled: true,
    });

    // Instantiate domain discount rules
    const domainRules = ruleEntities.map((rule) =>
      discountRuleFactory({ ...rule, ...(rule.config as object) })
    );
    console.log(domainRules);

    const engine = new DiscountEngine(domainRules);

    // Prepare the discount context
    const discountContext = {
      basket: {
        ...basket,
        items: basket.items
          .filter((item) => item.id)
          .map((item) => ({
            id: item.id!,
            productId: item.productId,
            quantity: item.quantity,
          })),
      },
      customer,
      orderHistory: (orderHistory || []).map((order) => ({
        id: order.id,
        total: order.total,
        date: order.createdAt.toISOString(),
      })),
      products: products.map((p) => ({
        ...p,
        imageUrl: p.imageUrl ?? null,
      })),
    };

    // Apply the discount engine
    const { totalDiscount, breakdown } = engine.applyAll(discountContext);

    // Calculate subtotal and total
    const subtotal = basket.items.reduce((sum, item) => {
      const p = products.find((prod) => prod.id === item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);

    // Return the enriched basket object
    return {
      ...basket,
      subtotal,
      discount: totalDiscount,
      discountBreakdown: breakdown, // [{ amount, message }]
      total: subtotal - totalDiscount,
    };
  }
}
