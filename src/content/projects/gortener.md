---
title: "Gortener"
description: "High-performance URL Shortener Service API using Redis for sub-millisecond URL lookups and an event-driven processing pipeline for scalable analytics, click tracking, and statistical reporting."
categories: ["web"]
featured: true
order: 1
techStack:
  - label: "Go"
    icon: "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Aqua.svg"
  - label: "Redis"
    icon: "https://www.svgrepo.com/show/303460/redis-logo.svg"
  - label: "Kafka"
    icon:: "https://upload.wikimedia.org/wikipedia/commons/0/01/Apache_Kafka_logo.svg"
  - label: "PostgreSQL"
    icon:: "https://www.svgrepo.com/show/303301/postgresql-logo.svg"
github: "https://github.com/mfaizras/gortener"
gallery:
  - ""
---

# Gortener
**Project Metadata**

* **Repository:** [https://github.com/mfaizras/gortener](https://github.com/mfaizras/gortener)
* **Type:** Backend API & Background Worker
* **Tech Stack:** Go (Gin), PostgreSQL, Redis, Kafka, Docker

## Overview

Gortener is a high-performance backend URL shortener written in Go. I built it to handle custom and randomly generated short links with secure user authentication (JWT). To ensure the redirection service remains extremely fast and resilient under heavy traffic, I implemented aggressive in-memory caching and rate limiting with Redis, and decoupled all access-logging and click-statistics operations into a separate asynchronous worker utilizing Apache Kafka.

## Architecture

I designed the system using strict Clean Architecture principles, ensuring that the core business logic (`internal/usecase`) is completely isolated from external frameworks, databases, and message brokers.

* **Web API (`cmd/web`)**: The primary entry point that handles HTTP routing via Gin (`internal/http`). It manages user sessions, URL creation, and immediate redirection logic.
* **Asynchronous Worker (`cmd/worker`)**: A standalone process dedicated to consuming events from Kafka (`internal/delivery/messaging`), saving access logs, and updating the access count in the database.
* **Infrastructure Layer**: Concrete implementations for the data layer (`internal/infrastructure/pgsql` and `internal/infrastructure/redis`), message publishing (`internal/gateway/messaging`), and security (`internal/infrastructure/jwt`), all interacting with the core domain strictly through repository interfaces.

## Key Features

* **Custom & Automated Short Links**
Users can generate short URLs with a custom slug or allow the system to automatically generate a randomized, collision-resistant string.
* **Instant Redirection via Caching**
I integrated Redis to cache URL lookups. This bypasses relational database queries on hot links, significantly decreasing latency during redirection.
* **Strict IP-Based Rate Limiting**
To protect the service from abuse and DDOS attacks, I implemented a Redis-backed rate limiter that restricts traffic to a maximum of 10 requests per minute per unique `slug + IP` combination.
* **Asynchronous Analytics Processing**
Instead of writing access logs synchronously during a redirect, the API publishes an event to a Kafka topic. A background worker picks this up to execute the heavy database writes, keeping the main HTTP thread fast and unblocked.
* **Full URL Lifecycle Management**
Protected by JWT Bearer tokens, users can list, view detailed statistics, update expiration statuses, or delete the short URLs they have generated.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Language** | Go (v1.25+) |
| **HTTP Framework** | Gin |
| **Primary Database** | PostgreSQL |
| **Cache & Rate Limiter** | Redis |
| **Event Streaming** | Apache Kafka |
| **Deployment** | Docker & Docker Compose |

## How It Works

1. A client sends a `GET` request to the API with a specific `/:slug`.
2. The router passes the request to the controller, which immediately queries Redis to check the rate limit for the client's IP and requested slug. If the limit (10 req/min) is exceeded, an `HTTP 429` is returned.
3. The system checks the Redis cache for the slug. On a cache miss, it fetches the destination URL and expiration status from PostgreSQL, updating the cache for subsequent requests.
4. If the URL is active, the API issues an HTTP redirect to the `target_url`.
5. Before the HTTP cycle concludes, the Kafka producer (`internal/gateway/messaging`) asynchronously publishes a click event to the `statistics` topic.
6. Independently, the background worker (`cmd/worker`) consumes the Kafka topic, writes a new access log entry to PostgreSQL, and increments the URL's total `access_count`.

## What I Learned

This project was a deep dive into system design and highly concurrent architecture in Go. Implementing the asynchronous analytics worker using Kafka was a major learning moment for me. The turning point was realizing that moving analytics out of the main HTTP thread wasn't just about speeding up the response time—it was about protecting system integrity. By utilizing a message broker, I learned how to ensure that a sudden spike in traffic wouldn't overwhelm PostgreSQL with write locks, allowing the core redirection service to remain blazing fast under load.

Additionally, adhering to Clean Architecture taught me the true power of interfaces in Go. When I first set up the strict layer boundaries, writing the boilerplate felt a bit verbose. However, when I needed to implement the Kafka publisher and consumer alongside the HTTP controllers, I realized I could wire up completely different delivery mechanisms without touching a single line of my core `internal/usecase` logic. Mastering that dependency inversion taught me more about scalable software design than any tutorial ever had.