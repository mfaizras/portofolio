---
title: "Discord BOT Assignment Reminder"
description: "Automated assignment reminders by scraping portals and sending Discord alerts."
categories: ["ai"]
techStack:
  - label: "Python"
    icon: "https://www.svgrepo.com/show/452091/python.svg"
  - label: "BeautifulSoup"
github: "https://github.com/mfaizras/tugas-bot"
heroImage: "/assets/projects/tugas-bot.png"
gallery:
  - ""
---

# Discord Assignment Reminder

## Overview
I developed a specialized Discord bot designed to centralize academic management for university students. The project addresses the fragmentation of information across multiple university portals (V-Class, IFLab, BAAK, and Student Site). By aggregating assignments and official announcements into a single Discord channel, the bot eliminates the need for manual checking across various sites, ensuring students never miss critical deadlines.

## What I Did

### Multi-Source Data Aggregation
I engineered a robust scraping engine capable of navigating and extracting data from four distinct university platforms. I implemented a hybrid approach using **BeautifulSoup4** for static content and **Selenium** for portals requiring authenticated session handling and dynamic JavaScript rendering.

### Automated Notification Pipeline
I designed a scheduling system that periodically polls the university servers for new data. I implemented logic to filter duplicate entries and transform raw HTML data into structured Discord embeds, providing students with clean, readable summaries of their pending tasks.

### Reliability and Error Handling
To ensure daily productivity with minimal manual overhead, I built the bot with a focus on uptime. I implemented custom exception handling to manage intermittent portal downtimes and session timeouts, allowing the bot to recover gracefully and retry synchronization without crashing.

## Technical Highlights

| Feature | Implementation |
| :--- | :--- |
| **Data Extraction** | Hybrid scraping using BeautifulSoup4 and Selenium (Headless) |
| **Platform Integration** | Discord.py API for rich embed delivery and command handling |
| **Task Scheduling** | Automated background loops for periodic portal synchronization |
| **Architecture** | Decoupled scraper modules to easily add or update portal sources |
