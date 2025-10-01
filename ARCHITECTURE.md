# Architecture Documentation

## Overview

_Provide a brief description of your system architecture and design approach._

## System Design

_Include a visual representation of your architecture here. This can be:_
- _A diagram (e.g., component diagram, class diagram)_
- _A flowchart showing the discount calculation flow_
- _An ASCII diagram_
- _A link to an external diagram tool (draw.io, Lucidchart, etc.)_
- _An embedded image_

```
Example:
┌─────────────┐
│   Frontend  │
│   (React)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     API     │
│   Layer     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Business   │
│   Logic     │
└─────────────┘
```

## Key Components

### 1. [Component Name]
_Description of the component and its responsibilities_

### 2. [Component Name]
_Description of the component and its responsibilities_

## Discount Rule System

### Design Approach
_Explain how your discount rule system is architected_

### Rule Types Implemented
1. **Quantity-based discount**
   - _How it works_

2. **Repeat purchase discount**
   - _How it works_

3. **VIP customer discount**
   - _How it works_

### Extensibility: Adding New Rules
_Describe the process for adding a new discount rule type. What needs to be modified? What stays the same?_

## Design Patterns Used

_List and briefly explain the design patterns you've implemented:_
- Repository Pattern: _how you used it_
- Strategy Pattern: _how you used it_
- Other patterns: _..._

## Data Flow

_Explain how data flows through your system, especially for the discount calculation process_

## Key Architectural Decisions

### Decision 1: [Title]
- **Context:** _What was the problem?_
- **Decision:** _What did you decide?_
- **Rationale:** _Why did you choose this approach?_
- **Alternatives considered:** _What other options did you evaluate?_

### Decision 2: [Title]
- **Context:** _What was the problem?_
- **Decision:** _What did you decide?_
- **Rationale:** _Why did you choose this approach?_
- **Alternatives considered:** _What other options did you evaluate?_

## Trade-offs and Limitations

_Discuss any trade-offs you made and known limitations of your implementation:_
- _What did you optimize for (readability, performance, flexibility)?_
- _What would break if [scenario]?_
- _What edge cases are not handled?_
- _Performance considerations for your discount rule evaluation?_

## Future Improvements

_If you had more time, what would you improve or add?_
