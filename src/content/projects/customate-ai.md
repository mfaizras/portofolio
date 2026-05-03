---
title: "Customate — AI-Powered Omnichannel Customer Service Platform"
description: "full-stack omnichannel customer service platform that consolidates incoming messages from multiple messaging channels into a single, unified dashboard."
categories: ["web", "ai"]
techStack:
  - label: "Python"
    icon: "https://www.svgrepo.com/show/452091/python.svg"
  - label: "FastAPI"
    icon: "https://www.svgrepo.com/show/330413/fastapi.svg"
  - label: "LangChain"
  - label: "ChromaDB"
    icon: "https://brandlogos.net/wp-content/uploads/2025/06/chroma-logo_brandlogos.net_1z1qk-512x339.png"
  - label: "Google Gemini"
    icon: "https://www.svgrepo.com/show/475656/google-color.svg"
  - label: "RAG Architecture"
  - label: "Laravel"
    icon: "https://www.svgrepo.com/show/394247/laravel.svg"
  - label: "PHP"
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
  - label: "React"
    icon: "https://www.svgrepo.com/show/452092/react.svg"
  - label: "TypeScript"
    icon: "https://www.svgrepo.com/show/374146/typescript-official.svg"
  - label: "Inertia.js"
  - label: "Tailwind CSS"
    icon: "https://www.svgrepo.com/show/374118/tailwind.svg"
  - label: "Vite"
    icon: "https://www.svgrepo.com/show/374167/vite.svg"
  - label: "MySQL"
    icon: "https://www.svgrepo.com/show/303251/mysql-logo.svg"
  - label: "Laravel Reverb"
    icon: "https://www.svgrepo.com/show/394247/laravel.svg"
  - label: "Telegram Bot API"
github: "https://github.com/mfaizras/customate-ai-microservice"
heroImage: "/assets/projects/customate/1.jpg"
gallery:
  - "/assets/projects/customate/1.jpg"
  - "/assets/projects/customate/2.jpg"
  - "/assets/projects/customate/3.jpg"
  - "/assets/projects/customate/5.jpg"
  - "/assets/projects/customate/6.jpg"
  - "/assets/projects/customate/12.jpg"
  - "/assets/projects/customate/customate.png"
---

# Customate — AI-Powered Omnichannel Customer Service Platform

> A unified messaging dashboard with an intelligent LLM adapter and RAG-based knowledge management, built for scalable, context-aware customer support automation.

---

## Background

Customate was originally developed as a submission for **Gemastik** (Pagelaran Mahasiswa Nasional bidang Teknologi Informasi dan Komunikasi), competing in the **ICT Business Development** division. This repository represents the **MVP (Minimum Viable Product)** — a working proof-of-concept that demonstrates the core value proposition of the platform.

While the project did not advance to the next stage of the competition, the technical foundation built here remains solid and serves as the baseline for a future, more complete version of Customate.

--- 

## Overview

Customate is a full-stack omnichannel customer service platform that consolidates incoming messages from multiple messaging channels into a single, unified dashboard. At its core, the system is designed around a modular service architecture that keeps channel integrations decoupled from the AI layer — making it extensible, maintainable, and ready for production workloads.

The platform currently supports **Telegram Bot** as its primary messaging channel, with the architecture already prepared for WhatsApp Business, Facebook Messenger, Instagram Direct, and Discord. On the intelligence side, a dedicated **AI microservice** acts as an LLM adapter, enabling the omnichannel system to send conversations to a language model enriched with custom, user-managed knowledge — functioning as a **Retrieval-Augmented Generation (RAG)** pipeline.

---

## Architecture

The system is split into two repositories, each serving a distinct responsibility:

### 1. Omnichannel Dashboard (`omnichannel`)
The main application, built with **Laravel 11** on the backend and **React 18 + TypeScript** on the frontend, served via **Inertia.js** as a seamless SPA. It handles:

- Receiving and storing incoming messages through platform webhooks
- Displaying all conversations in a real-time unified chat interface
- Managing per-user channel configurations (API tokens, webhook setup)
- Providing an admin panel for managing platform availability and help content

### 2. AI Microservice (`customate-ai-microservice`)
A lightweight **FastAPI** microservice written in Python that acts as the LLM gateway. It handles:

- Storing and retrieving knowledge documents via **ChromaDB** (vector database)
- Embedding and semantic search powered by **Google Generative AI Embeddings**
- Routing conversation history to **Gemini** (via `langchain_google_genai`) with injected context from the vector store
- Exposing REST endpoints for training, updating, and querying per-agent knowledge bases

---

## Key Features

**Unified Messaging Dashboard**
All conversations from connected channels appear in one interface. Agents can read and reply to messages without switching between apps.

**Pluggable Channel Architecture**
Each messaging platform is implemented as a service class that conforms to a shared `ChannelServiceInterface`. Adding a new platform requires implementing a single contract — no changes to the core application logic.

**Auto Webhook Management**
Users can connect a Telegram bot by simply entering their token. The system automatically registers the webhook with Telegram's API and begins receiving messages immediately.

**AI Knowledge Management (RAG)**
Users can upload or configure knowledge documents through the dashboard. These documents are embedded and stored in a vector database scoped per agent. When a message arrives, the AI microservice performs semantic retrieval and injects the most relevant knowledge into the LLM prompt before generating a response.

**Per-Agent Isolation**
Each agent (or user) gets their own isolated collection in the vector store. This allows multiple teams or clients to use the same infrastructure with completely separate knowledge bases.

**Secure Token & API Key Handling**
Bot tokens are encrypted at rest. The AI microservice is protected by API key authentication on every endpoint, and agent IDs are sanitized to prevent injection attacks.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend (main app) | Laravel 11, PHP 8.1+, Eloquent ORM |
| Frontend | React 18, TypeScript, Inertia.js, Vite |
| UI Components | Tailwind CSS, Shadcn UI |
| Database | MySQL / SQLite |
| AI Microservice | Python, FastAPI, Uvicorn |
| LLM | Google Gemini (via LangChain) |
| Vector Store | ChromaDB |
| Embeddings | Google Generative AI Embeddings |
| Messaging Integration | Telegram Bot API |
| DevOps | Docker, GitHub Actions |

---

## How It Works

```
User sends message on Telegram
        ↓
Telegram sends webhook → /webhook/telegram (Laravel)
        ↓
Message stored in database (chat_lists, chats tables)
        ↓
Dashboard displays message in real-time
        ↓
[AI Mode] → POST /query/{agent_id} → FastAPI microservice
        ↓
Microservice fetches conversation history from omnichannel API
        ↓
ChromaDB performs semantic search over agent's knowledge base
        ↓
Relevant documents injected into Gemini prompt
        ↓
AI response returned → sent back to user via Telegram Bot API
```

---

## Database Design

The schema is built around four core tables:

- **`channels`** — Platform definitions (Telegram, WhatsApp, etc.) with JSON configuration and HTML help text
- **`user_channels`** — Per-user credentials (encrypted tokens) linking a user to a channel
- **`chat_lists`** — Individual conversations (grouped by chat ID from the platform)
- **`chats`** — Individual messages within each conversation, supporting multiple message types (text, photo, video, voice, document, sticker, location)

---

## API Surface

The AI microservice exposes four endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/train/{agent_id}` | Add new knowledge documents to vector store |
| `PUT` | `/train/{agent_id}` | Update existing documents by UUID |
| `POST` | `/chat/{agent_id}` | Chat directly with the agent using message history |
| `POST` | `/query/{agent_id}` | Fetch conversation from omnichannel and respond via LLM |

---

## What I Learned

One of the biggest milestones in this project was implementing the real-time messaging layer — and it was my **first time building a real-time system from scratch**. I used **Laravel Reverb** as the WebSocket server and **Laravel Echo** on the frontend to listen for events. Going into it, I had a rough idea of how WebSockets worked in theory, but actually wiring up a broadcast event in Laravel, running Reverb as a standalone server, and then subscribing to the right channel in Echo was a different kind of challenge.

Beyond the real-time layer, this project also pushed me to think carefully about **separation of concerns at the infrastructure level** — not just within a single codebase, but across services. Designing the LLM adapter as an independent microservice meant I had to define a clear contract between the main application and the AI layer, handle retry logic with exponential backoff, and think about how vector store collections should be scoped to prevent data leakage between agents.

The RAG implementation using ChromaDB also deepened my understanding of how embedding models work in practice — particularly around how retrieval quality directly affects the coherence of LLM responses, and why isolating each agent's knowledge base matters when serving multiple users on shared infrastructure.

---

## MVP Scope & Known Limitations

This MVP was built under competition time constraints. The following are known limitations that will be addressed in the next version:

- Only Telegram is fully integrated; other platforms (WhatsApp, Messenger) are architecture-ready but not implemented
- No analytics or reporting dashboard
- Real-time updates rely on polling in some areas and could be fully migrated to WebSocket broadcasts

---

## Planned Next Version

A redesigned version of Customate is planned under a new `customate` repository, which will treat this MVP as **V1** and build on top of its lessons. Key improvements will include a proper knowledge management UI, additional channel integrations, analytics, and a more robust real-time layer.

---

## Repositories

- **Omnichannel Dashboard**: [github.com/mfaizras/omnichannel](https://github.com/mfaizras/omnichannel)
- **AI Microservice**: [github.com/mfaizras/customate-ai-microservice](https://github.com/mfaizras/customate-ai-microservice)