---
title: "Gunadarma Telegram Chatbot"
description: "Built a university info chatbot with RAG retrieval and natural language answers."
categories: ["ai"]
order: 1
techStack:
  - label: "Python"
    icon: "https://www.svgrepo.com/show/452091/python.svg"
  - label: "Gemini LLM"
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg"
  - label: "Chroma Vector DB"
    icon: "https://brandlogos.net/wp-content/uploads/2025/06/chroma-logo_brandlogos.net_1z1qk-512x339.png"
  - label: "RAG Architecture"
  - label: "Telegram Bot API"
demo: "https://web.telegram.org/k/#@infogundar_bot"
github: "https://github.com/mfaizras/gunadarma-telegram-chatbot"
blog: "https://library.gunadarma.ac.id/repository/pengembangan-chatbot-informasi-universitas-gunadarma-berbasis-telegram-menggunakan-arsitektur-retrieval-augmented-generation-dengan-model-bahasa-besar-gemini-ssm"
heroImage: "/assets/projects/ug-telebot.png"
gallery:
  - "/assets/projects/ug-telebot.png"

---
# Gunadarma Telegram Chatbot – RAG + Gemini LLM

*   **Paper:** [Gunadarma Repository](https://library.gunadarma.ac.id/repository/pengembangan-chatbot-informasi-universitas-gunadarma-berbasis-telegram-menggunakan-arsitektur-retrieval-augmented-generation-dengan-model-bahasa-besar-gemini-ssm)

## Background
Developed as a core component of my Scientific Writing project for the Informatics Department at Universitas Gunadarma in 2025, this system addresses the need for a centralized information hub. The goal was to move away from static FAQ pages and provide students with a conversational interface capable of retrieving specific university data through a verified knowledge base.
## Overview
This project is an implementation of a Retrieval-Augmented Generation (RAG) chatbot designed specifically for the Universitas Gunadarma ecosystem. By integrating Google's Gemini LLM with a local vector database, the chatbot provides highly accurate, context-aware responses to university-related inquiries directly through the Telegram platform.

## Architecture
The system utilizes a modular RAG architecture to ensure data integrity and response relevance:
*   **Interface Layer:** Built on the Telegram Bot API to handle user interactions and asynchronous message delivery.
*   **Embedding Layer:** Uses the `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` model to convert natural language queries into high-dimensional vectors.
*   **Retrieval Layer:** Employs ChromaDB as a vector store to manage and query document embeddings based on cosine similarity.
*   **Inference Layer:** Integrates the Gemini LLM to synthesize the retrieved context into coherent, natural language answers.

## Key Features
*   **Semantic Search Retrieval:** Goes beyond keyword matching to understand the intent behind student questions, pulling relevant context from internal university documents.
*   **LLM-Powered Generation:** Leverages Gemini's reasoning capabilities to produce human-like responses that are grounded in the retrieved facts.
*   **Multi-language Support:** Capable of processing and responding to queries in both Indonesian and English through a multilingual embedding model.
*   **Telegram Native Interface:** Provides an accessible and lightweight UI for students to interact with the system without needing to install new applications.
*   **Accuracy Evaluation:** Includes a built-in evaluation framework using the Likert scale to measure user satisfaction and the quality of generated responses.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **LLM Engine** | Gemini LLM (Google DeepMind) |
| **Vector Database** | ChromaDB |
| **Embedding Model** | `paraphrase-multilingual-MiniLM-L12-v2` |
| **Bot Platform** | Telegram Bot API |
| **Language** | Python |

## How It Works
1.  **Ingestion:** University documents are split into manageable chunks and stored as vectors in ChromaDB.
2.  **Input:** A user sends a query via the Telegram bot (e.g., questions about campus facilities or academic procedures).
3.  **Vectorization:** The system converts the user's message into a vector embedding using the MiniLM model.
4.  **Retrieval:** ChromaDB identifies the most relevant document segments by comparing the query vector against the stored document vectors.
5.  **Synthesis:** The retrieved context and the original question are bundled into a prompt for the Gemini LLM.
6.  **Response:** The LLM generates a grounded response, which is then sent back to the user via the Telegram interface.
