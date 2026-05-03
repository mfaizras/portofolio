---
title: "AI Learning Insight — Student Behavior Classification"
description: "Designed and developed the full Machine Learning pipeline for an AI-powered learning analytics system."
categories: ["ai","api"]
featured: true
techStack:
  - label: "Python"
    icon: "https://www.svgrepo.com/show/452091/python.svg"
  - label: "Scikit-Learn"
    icon: "https://www.svgrepo.com/show/473778/scikitlearn.svg"
  - label: "FastAPI"
  - label: "Docker"
    icon: "https://www.svgrepo.com/show/452192/docker.svg"
demo: "https://a25-cs231.mewdev.web.id/"
heroImage: "/assets/projects/ai-learning-insight/1.jpg"
gallery:
  - "/assets/projects/ai-learning-insight/1.jpg"
  - "/assets/projects/ai-learning-insight/2.jpg"
  - "/assets/projects/ai-learning-insight/3.jpg"
  - "/assets/projects/ai-learning-insight/4.jpg"
  - "/assets/projects/ai-learning-insight/5.jpg"
  - "/assets/projects/ai-learning-insight/6.jpg"
  - "/assets/projects/ai-learning-insight/7.jpg"
  - "/assets/projects/ai-learning-insight/8.jpg"
  - "/assets/projects/ai-learning-insight/7.jpg"
  - "/assets/projects/ai-learning-insight/9.jpg"
  - "/assets/projects/ai-learning-insight/10.jpg"
  - "/assets/projects/ai-learning-insight/ai-learning.png"
  - "/assets/projects/ai-learning-insight/ai-learning-2.png"
  - "/assets/projects/ai-learning-insight/ai-learning-3.png"
---

# AI Learning Insight — Student Behavior Classification

* **Capstone Project** · Dicoding × Accenture (Asah Program)
* **Role:** ML Engineer

---

## What I Built

I designed and developed the full Machine Learning pipeline for an AI-powered learning analytics system — from raw data all the way to a deployed REST API. The system classifies student learning behavior into 9 distinct archetypes, giving educators and platform teams actionable insight into how each student actually learns.

---

## My Contributions

### 1. Synthetic Data Generation
The original dataset contained only **30 entries** — far too small to train a reliable classifier. I tackled this by implementing a **Kernel Density Estimation (KDE)** pipeline to generate synthetic data that preserves the statistical distribution of the real samples, enabling the model to learn meaningful patterns without overfitting.

### 2. Labeling — Rule-Based with Percentile Thresholds
With no pre-existing labels, I designed the labeling methodology from scratch. I chose a **rule-based, percentile-driven approach** to account for the skewed distributions observed across features. The dataset is split into **tertiles (33.33% each)**, producing dynamic thresholds that determine Low / Medium / High scores per dimension — which are then combined into one of **9 behavioral archetypes**:

| Label | Description |
|---|---|
| 🆕 **New Learner** | Insufficient data for classification |
| 🏆 **High Achiever** | High speed, consistency, and academic performance |
| ⚡ **Fast Learner** | High speed with strong exam results |
| 🔍 **Perfectionist** | Frequently revisits and revises for maximum results |
| 📅 **Consistent Learner** | Highly disciplined, strong completion rates |
| 🐢 **Slow Learner** | Low speed but stable pass rates |
| 🎲 **Sporadic Learner** | Irregular activity or very low login frequency |
| ⚠️ **Struggling Learner** | Low academic performance or stalled progress |
| 📊 **Average Learner** | Median metrics across all dimensions |

### 3. ML Modeling
I trained and evaluated multiple classification algorithms, ultimately selecting **Random Forest** as the final model based on its accuracy and generalization stability across all 9 classes. The model takes in **14 features** across 4 behavioral dimensions as input:

| Dimension | Features |
|---|---|
| **Speed** | Completion Rate, Study Duration Ratio, Avg. Completion Time per Tutorial, Active Days Percentage |
| **Consistency** | Learning Frequency per Week, Avg. Enrolling Times, Total Study Days |
| **Review & Perfectionism** | Revisit Rate, Revision Rate, Avg. Submission Rating, Quiz Retake Rate |
| **Performance** | Avg. Exam Score, Exam Pass Rate, Total Submissions |