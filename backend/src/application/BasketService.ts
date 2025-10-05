import { BasketItem } from "@prisma/client";
import { IBasketRepository } from "../infrastructure/repositories/BasketRepository";

export class BasketService {
  constructor(private basketRepo: IBasketRepository) {}

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
}
