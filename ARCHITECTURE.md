# Architecture Documentation

## Overview

This is an MVP of an ecommerce system with modular extnsible discount rule system.

## System Design

```
            ┌────────────────────┐
            │     Frontend       │
            │  (React, Vite)     │
            └─────────┬──────────┘
                      │ GraphQL Query/Mutation
                      ▼
          ┌────────────────────────────┐
          │          Backend           │
          │  (Node.js, TypeScript)     │
          │     GraphQL Resolvers      │
          │  ───────────────────────   │
          │  |  Business Logic    |    │
          │  | ────────────────   |    │
          │  |  Discount Engine   |    │
          │  |    (Strategy:      |    │
          │  |    Multiple Rules) |    │
          │  └─────────┬──────────┘    │
          │            │               |      
          │            │               
          │   ┌────────┼─────────┐
          │   │        │         │
          ▼   ▼        ▼         ▼
   ┌─────────┐ ┌─────────┐ ┌─────────────┐
   │Products │ │Baskets  │ │DiscountRules│
   └─────────┘ └─────────┘ └─────────────┘
        │            │          │
        └──────┬─────┴────┬─────┘
               ▼          ▼
           ┌─────────────────┐
           │    Database     │
           │   (Postgres)    │
           └─────────────────┘

```

## Key Components

### 1. Frontend(React/Vite):
 - Communicates with the backend via a single GraphQL endpoint for all app features

### 2. Backend (Node.js/TypeScript, GraphQL):
 - Handles all business logic, entity loading, and applies every enabled discount rule for each basket/checkout query.
 - Centralizes all discount calculations, ensuring rules are enforced.

### 3. Database (PostgreSQL):
- Stores all business data and the full configuration for each discount rule.
- Allows admins/business users to edit or add new discount rules in real time.
  
### 4. Discount Rule Engine
 - Loads the relevant rule configs from the database, builds rule objects, and applies them one by one to the current context for every cart.
- Delivers the total discount and itemized breakdown (for UI).

## Discount Rule System

### Design Approach
- The discount rule system loads rule definitions and basket info from the database, instantiates each rule as a separate backend class, and centrally applies all logic on the backend to produce a pricing breakdown. 
- "Admins" can enable, disable, or tune existing discount rule types through the admin/database, but adding a brand new discount rule logic always requires a new backend class and a code deploy.

### Rule Types Implemented
1. **Quantity-based discount**
   - _How it works_

2. **Repeat purchase discount**
   - _How it works_

3. **VIP customer discount**
   - _How it works_

### Extensibility: Adding New Rules
- The ystem uses the `Strategy Pattern` combined with a `Factory/Registry` approach to make adding new discount rules straightforward and maintainable:
- Each discount rule is implemented as a separate class following a common interface (the "strategy"). This encapsulates the specific discount logic in isolated, testable units.
- A central factory holds a registry mapping discount rule types to their constructors. When a new discount is added in the database, the factory uses the type from the config to instantiate the correct rule class.
- To add a new discount type, a developer writes a new class implementing the discount interface and registers this class in the factory's registry with a unique type string.
- Once registered, admins can create new discount rule instances of this type by adding configurations to the database—no backend code changes are needed for new instances of existing rule types.
  
## Design Patterns Used

- `Strategy Pattern`: All discount rules are defined as classes with a common interface, each encapsulating a different discount algorithm. The engine applies all rule strategies to the basket context.
- `Factory/Registry Pattern`: A central registry maps rule types to their constructors, enabling dynamic creation of rule instances from database config.
- `Repository Pattern`: All access to data (like baskets, products, customers, orders, rule configs) is handled through repository classes, abstracting direct database operations.
- `Separation of Concerns`: Business logic, data persistence, and API layer are all kept separate for maintainability and clarity.

## Data Flow

- User adds/removes/updates items in the basket in the frontend app.
  - The BasketContext (React context) tracks the local basket state and triggers updates on every user action.

- Frontend calls backend via GraphQL mutation or query.
  - Every time the basket changes (add, remove, update), the frontend sends the current state or triggers a fresh "HYDRATE" query.
  - This triggers the server to re-fetch not just the basket, but also customer, product, order history, and all ENABLED discount rule configs.

- Backend builds a complete "discount calculation context".
  - The backend composes the context: basket items, product prices/descriptions, customer info (incl. VIP/order history), and rules.

- The discount engine processes the context.
  - Each discount rule’s apply() method is called in turn. Rules check context and return discount amounts and messages if they apply.
  - The engine sums up all applicable discounts and generates a full breakdown.

- Backend responds to frontend with up-to-date prices.
  - The API response contains: subtotal, discount total, applied rule breakdowns, and updated basket state.

- Frontend shows fresh values.
  - The basket UI (and summary) updates instantly with the new prices and readable rule descriptions.
  - Since every change triggers a new backend calculation, the numbers are ALWAYS correct and up-to-date, even when rules change in the DB
  
## Key Architectural Decisions

### Basket State
State of the basket is stored in the database, for reliability, server-side control, and consistency across sessions and devices. This allows the backend to always recalculate the latest totals and discounts, making the logic easy to extend and debug.

### Discount Rule Design Pattern
- The discount rule engine leverages the factory/registry and strategy pattern, meaning discount logic for each rule type is kept as a separate backend class. This ensures all discount logic is testable, safe, and does not drift into messy conditionals or frontend trickery.
- All calculations (subtotal, discounts, total) occur on the backend for every basket or customer data change so the business and customers always see the latest, correct breakdown.
- Breakdown and auditability: Every applied discount returns a human-readable message, giving clarity on why a price was changed.
  
### Data access
- Data access (baskets, orders, rules, etc.) goes through repositories for modularity and to allow easy changes to persistence logic in the future.

## Trade-offs and Limitations
- Adding a new kind of discount logic, we must create a new backend class and register it in the factory, which means a new backend deployment.
- The centralized system guarantees latest pricing, but means the backend has to be consulted every time we want to see the real total.
- Scaling to very large baskets or a huge number of rules means all evaluation happens server-side, which could be a bottleneck if overly complex or abused—but for normal e-commerce, this is highly efficient.

- Simpler than a full-blown DDD structure, the design keeps domains and concerns separate but doesnt fully satisfy DDD (aggregate/entity/value object pattern)


## Future Improvements
- E2E automated testing
- DiscountRuleType CRUD
  - full admin UI and backend endpoint for managing available discount rule types (e.g., quantity, VIP, weekend) directly from the database. This eliminates the need to hardcode selectable types in the frontend and backend.
- Support user-friendly creation of new rule instances:
  - Admins can define new instances of discount rules wihtout the need to deploy new backend code.
    - This means we have to move the logic to a more automated workflow AI engine (reusable building blocks)
- Bulk creation or editing of discount rules
- Rule chaining and conflict resolution:
  - create priority of discount rules to not conflict with other promos.
- Performance & scalability improvements
  - Optimizing how rule evaluation and basket queries scale as the store grows, possibly caching certain computed discounts when appropriate.