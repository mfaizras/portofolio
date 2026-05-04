---
title: "Electrical eCommerce Platform"
description: "Migrated the entire application from native PHP to Laravel, restructuring the codebase following SOLID principles with a clear separation of concerns across controllers, service layers, and models."
categories: ["web"]
featured: true
techStack:
  - label: "Laravel"
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg"
  - label: "MySQL"
    icon: "https://www.svgrepo.com/show/303251/mysql-logo.svg"
  - label: "Redis"
    icon: "https://www.svgrepo.com/show/303460/redis-logo.svg"
  - label: "Payment Gateway"
order: 1
---
# Electrical Equipment eCommerce Platform
## Overview

This project is an official Indonesian eCommerce platform specializing in electrical equipment and supplies, serving both retail and wholesale customers across the country. The platform hosts a catalog of **16,000+ products** spanning 15+ categories — from lighting and power distribution to EV chargers, PLCs, and industrial tools — and operates offices and showrooms in Jakarta and Bali.

I contributed to this project as a developer during my time at **Indo Web City**, where I was tasked with leading a **full codebase refactoring** from a legacy native PHP application to a modern, structured Laravel framework — transforming an aging and hard-to-maintain codebase into a scalable, production-ready platform.

---

## What I Did

### Architecture Modernization
Migrated the entire application from native PHP to Laravel, restructuring the codebase following **SOLID principles** with a clear separation of concerns across controllers, service layers, and models. Business logic was modularized into dedicated service classes, with **interfaces defined for critical modules** — including Payment and Shipping — ensuring each integration remains swappable.

### Dual Customer Flow
The platform serves two distinct user segments with separate checkout experiences:
- **B2C (Retail):** A streamlined regular checkout flow for individual buyers.
- **B2B (Wholesale):** A dedicated ordering flow with **negotiable discount capabilities**, allowing wholesale buyers to request custom pricing before completing a transaction.

Both flows are fully connected to payment gateways for end-to-end transaction processing.

### Redis Caching for High-Load Catalog
Integrated **Redis caching** to serve the platform's main product catalog, which handles a large and frequently-accessed dataset of 16,000+ Products. Load testing revealed a clear trade-off: while the legacy application was slightly faster under normal conditions, it failed to maintain reliability under load. The Laravel + Redis implementation achieved a **100% success rate** during stress testing, compared to the legacy system's sub-100% rate — making stability the clear winner.

### Event-Driven Architecture
Adopted Laravel's built-in **Events and Listeners** system across multiple modules to decouple side-effect logic from the main request cycle, keeping web traffic lean and responsive. Events were implemented for:
- Email notification dispatch (order confirmations, status updates)
- Website viewer tracking
- etc

### Background Job Processing
Offloaded heavy processes to **Laravel Queue**, running jobs asynchronously in the background to prevent long-running tasks from blocking HTTP responses. This significantly improved perceived performance and response times for end users.

### Third-Party Integrations
Integrated the platform with multiple external service providers:
- **Nicepay** — Payment gateway integration
- **DOKU** — Secondary payment gateway
- **JNE API** — Shipping rate calculation and logistics

---

## Key Outcomes

| Area | Result |
|---|---|
| Reliability | 100% request success rate under load testing |
| Maintainability | Modular services with interfaces for Payment & Shipping |
| Performance | Redis-backed catalog serving for high-concurrency stability |
| Scalability | Async queue processing for heavy background tasks |
| Integrations | DOKU, Nicepay (payments) + JNE (shipping) fully connected |