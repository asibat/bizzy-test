import { BasketService } from "../application/BasketService";

// Mock repositories
const basketRepo = {
  findByCustomerId: jest.fn(),
  create: jest.fn(),
  addItem: jest.fn(),
  updateItemQuantity: jest.fn(),
  removeItem: jest.fn(),
};

const productRepo = { findAll: jest.fn() };
const discountRuleRepo = { findMany: jest.fn() };
const customerRepo = { findById: jest.fn(), findOrderHistory: jest.fn() };

// Mock DiscountEngine to always return zero discount
jest.mock("../domain/discount/DiscountEngine", () => ({
  DiscountEngine: jest.fn().mockImplementation(() => ({
    applyAll: () => ({ totalDiscount: 0, breakdown: [] }),
  })),
}));

describe("BasketService", () => {
  beforeEach(() => jest.clearAllMocks());

  it("creates a new basket if one does not exist when adding an item", async () => {
    basketRepo.findByCustomerId.mockResolvedValueOnce(null);
    basketRepo.create.mockResolvedValueOnce({
      id: "b1",
      customerId: "c1",
      items: [{ productId: "p1", quantity: 2 }],
    });

    const service = new BasketService(
      basketRepo as any,
      productRepo as any,
      discountRuleRepo as any,
      customerRepo as any
    );
    const basket = await service.addToBasket("c1", {
      productId: "p1",
      quantity: 2,
    });
    expect(basketRepo.create).toHaveBeenCalled();
    expect(basket.items[0].productId).toBe("p1");
    expect(basket.items[0].quantity).toBe(2);
  });

  it("adds an item to existing basket", async () => {
    basketRepo.findByCustomerId.mockResolvedValueOnce({
      id: "b2",
      customerId: "c1",
      items: [],
    });
    basketRepo.addItem.mockResolvedValueOnce({
      id: "b2",
      customerId: "c1",
      items: [{ productId: "p2", quantity: 1 }],
    });

    const service = new BasketService(
      basketRepo as any,
      productRepo as any,
      discountRuleRepo as any,
      customerRepo as any
    );
    const basket = await service.addToBasket("c1", {
      productId: "p2",
      quantity: 1,
    });
    expect(basketRepo.addItem).toHaveBeenCalled();
    expect(basket.items[0].productId).toBe("p2");
  });
});
