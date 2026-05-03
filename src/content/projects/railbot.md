---
title: "RailBot"
description: "Delivered an LLM-powered rail schedule assistant with contextual question handling. And impelemnting Knowledge Based Authentication"
categories: ["ai","api","web"]
techStack:
  - label: "Python"
    icon: "https://www.svgrepo.com/show/452091/python.svg"
  - label: "Gemini LLM"
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg"
  - label: "Chroma Vector DB"
    icon: "https://brandlogos.net/wp-content/uploads/2025/06/chroma-logo_brandlogos.net_1z1qk-512x339.png"
  - label: "RAG Architecture"
  - label: "LangChain"
demo: "https://www.youtube.com/watch?v=DmLei8X8Dsg"
github: "https://github.com/mfaizras/compsphere-microservice-krl"
heroImage: "/assets/projects/railbot/1.jpg"
gallery:
  - "/assets/projects/railbot/1.jpg"
  - "/assets/projects/railbot/2.jpg"
  - "/assets/projects/railbot/3.jpg"
  - "/assets/projects/railbot/5.jpg"
---

# RailBot: Smart Travel Assistant
### Background
This project was built during Hacksphere 2025, an intensive 3-day offline hackathon. We identified significant friction points in existing intercity train applications, specifically long queue times just to view schedules, unreliable OTP systems that frequently failed, and broken trip planning features. Our goal was to design a faster, more reliable alternative for commuters to plan their journeys without application bottlenecks.

### Overview
RailBot is an intelligent chatbot assistant designed to simplify the process of finding train schedules and planning trips. To solve the persistent authentication issues found in existing apps, we introduced a Knowledge-Based Authentication (KBA) system. This feature acts as a secure, personalized alternative to standard OTPs by utilizing the user's own travel history to verify their identity.

### Architecture
The architecture follows a client-server model built around an AI integration. The frontend interacts directly with users through a chat-based interface. The backend handles API requests, manages user travel data stored in a relational database, and orchestrates calls to the LLM to dynamically generate context-aware security questions based on that data. 

### Key Features
*   **Conversational Scheduling:** Allows users to request train schedules naturally, bypassing the rigid, queue-based UI of traditional ticketing apps.
*   **Knowledge-Based Authentication (KBA):** Replaces standard OTPs with dynamic security questions (e.g., asking the exact payment amount of a specific past trip) generated via AI.
*   **Trip Planner:** Provides flexible, data-driven travel recommendations without the downtime or errors experienced in standard applications.

### Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | ReactJS, Vite, TypeScript, Tailwind CSS |
| **Backend** | JavaScript, Python, MySQL |
| **AI & Tools**| Gemini API, Postman |

### How It Works
1. A user interacts with the frontend chatbot to request a train schedule or initiate a booking.
2. When authentication is triggered, the backend queries the user's travel history from the MySQL database.
3. The backend sends this history to the Gemini API, which generates a specific, knowledge-based security question (KBA).
4. The user answers the question within the chat interface.
5. Upon successful verification, the system proceeds to display the requested schedules or process the trip plan.

### What I Learned
This was my first time participating in a 3-day offline, sleepover hackathon. The turning point for me was realizing that under extreme time constraints and sleep deprivation, system architecture has to be relentlessly pragmatic. Integrating the Gemini API to generate KBA questions in real-time taught me a lot about managing external dependencies during a time-crunch. I had to learn how to balance building an innovative security feature with the harsh reality of MVP scoping, discovering that getting the core data flow working is far more critical than polishing edge cases.

### Known Limitations / MVP Scope
*   **Verification Latency:** The primary technical limitation we encountered was that the KBA system takes significantly longer to verify users compared to traditional methods, as it must communicate back and forth with the external Gemini LLM server to generate and validate questions.
*   **Future Roadmap:** Future improvements would focus on optimizing this response performance and expanding the platform to include a voice bot feature.