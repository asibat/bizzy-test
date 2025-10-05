import { BasketItem } from "@prisma/client";
import { IBasketRepository } from "../infrastructure/repositories/BasketRepository";

export class BasketService {
  constructor(private basketRepo: IBasketRepository) {}

  async addToBasket(customerId: string, item: BasketItem) {
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

  async getBasket(customerId: string) {
    return await this.basketRepo.findByCustomerId(customerId);
  }
}
