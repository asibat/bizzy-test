# Shopping Basket Discount System - Technical Assignment

## Overview

Build a shopping basket system with a flexible discount rule engine. This assignment evaluates your approach to software architecture, API design, and code organization.

**Time allocation:** 2-4 hours

## Objectives

Create a fullstack application (Node.js/TypeScript + React) that allows:
1. Browsing a product catalog
2. Adding products to a shopping basket
3. Applying discount rules to calculate the final price
4. Managing discount rules dynamically

## Technical Requirements

### Tech Stack
- **Backend:** Node.js with TypeScript
- **API:** GraphQL (we use GraphQL at Bizzy - bonus points for using it here)
- **Frontend:** React (with TypeScript recommended)
- **Data Storage:** Use the provided JSON files or in-memory storage (no database setup required)

### Core Features

#### 1. Product Catalog
- Display products from the provided data
- Show product details (name, price, etc.)

#### 2. Shopping Basket
- Add/remove products
- View basket contents
- Display quantities

#### 3. Discount Calculation Engine
Implement a flexible system that applies discount rules to the basket. The system should support:

**Required Discount Types:**
- **Quantity-based discounts:** e.g., "Buy 3+ of Product X, get 10% off"
- **Repeat customer discounts:** Discount based on customer's order history
- **VIP customer discounts:** Special pricing for VIP customers

#### 4. Discount Rule Management
- Create/modify discount rules
- Rules should be configurable (not hardcoded)
- Demonstrate extensibility: show how new rule types can be added

### Architecture & Design Principles

Your solution should demonstrate:
- **Clean separation of concerns** (domain logic, API, UI)
- **SOLID principles**
- **Repository pattern** for data access
- **DRY (Don't Repeat Yourself)**
- **Domain-Driven Design** concepts

Focus on **business logic and architecture** rather than:
- Authentication/authorization
- Database setup
- UI styling (minimal/functional UI is fine)

### Team Collaboration Considerations

Your code will be reviewed as if it were being submitted to a team repository. Consider:
- How would a new team member understand your API?
- How would someone know if they broke something when making changes?
- Can the codebase be maintained without excessive external dependencies?
- What happens when something goes wrong? How would you debug it?
- Could a junior developer understand and extend your discount rule system?
- What trade-offs did you make, and what alternatives did you consider?

## Provided Data

The `data/` folder contains sample data:
- **products.json** - Product catalog
- **customers.json** - Customer profiles (including VIP status)
- **orders.json** - Historical orders for discount calculation

## Deliverables

### 1. Working Application
- Application runs with a single command (e.g., `npm start` or `npm run dev`)
- Include setup instructions below

### 2. Architecture Documentation
Update the `ARCHITECTURE.md` file with:
- Visual representation of your system design (diagram, flowchart, or any visual format)
- Explanation of key architectural decisions
- Description of how the discount rule system works
- How new discount rules can be added

### 3. Code Organization
- Well-structured folder hierarchy
- Clear component/module boundaries
- Meaningful file and variable names

### 4. Git Commits
- Small, focused commits
- Clear commit messages
- Demonstrate your development process

## Getting Started

1. **Fork this repository** to your own GitHub account
2. Clone your fork locally
3. Review the provided data files in `data/`
4. Set up your project structure
5. Implement the backend API
6. Create the frontend interface
7. Document your architecture in `ARCHITECTURE.md`
8. Ensure your solution is maintainable and team-ready
9. Commit your work with clear messages
10. Share the link to your forked repository when complete

## Setup Instructions

_Update this section with your setup instructions after implementation_

```bash
# Example:
# npm install
# npm run dev
```

## Notes

- Focus on demonstrating your architectural skills
- It's okay to make assumptions - document them in ARCHITECTURE.md
- Quality over quantity - a well-architected partial solution is better than a rushed complete one
- The discount rule system extensibility is the key feature to showcase

---

**Questions?** If anything is unclear, document your assumptions and proceed.

Good luck!
