📈 Change Point Analysis of Brent Oil Prices

Bayesian Modeling of Geopolitical and Economic Impacts

📌 Project Overview

This project analyzes how major geopolitical events, economic shocks, and OPEC policy decisions have impacted Brent crude oil prices over time. Using Bayesian Change Point Analysis, the study identifies statistically significant structural breaks in the oil price time series and associates them with real-world events.

The analysis is designed to support:

Investors seeking to manage risk and optimize returns

Policymakers working on economic stability and energy security

Energy companies planning operations and supply chains in volatile markets

The project is developed as part of a data science challenge and emphasizes statistical rigor, interpretability, and clear communication.

🎯 Objectives

Detect structural breaks in Brent oil prices using Bayesian change point models

Quantify how price behavior changes before and after major events

Associate detected change points with:

Political decisions

Conflicts in oil-producing regions

Economic sanctions

OPEC policy changes

Communicate insights through:

A technical report

An interactive dashboard

🛢️ Dataset

Source: Historical Brent oil prices

Frequency: Daily

Period: May 20, 1987 – September 30, 2022

Key fields:

Date – trading date

Price – Brent oil price (USD per barrel)

Raw data is stored unchanged in:

data/raw/BrentOilPrices.csv

🧠 Methodology
Core Approach

Exploratory Data Analysis (EDA)

Time series diagnostics:

Trend analysis

Stationarity testing

Volatility inspection

Bayesian Change Point Detection using PyMC

Discrete change point (τ)

Pre- and post-change parameters

MCMC inference and posterior analysis

Important Note on Interpretation

Change point detection identifies statistical changes in time, not definitive causality.
Event associations are hypotheses supported by temporal alignment and economic reasoning, not causal proof.

🗂️ Repository Structure
brent-oil-change-point-analysis/
│
├── data/
│   ├── raw/        # Original Brent price data
│   ├── events/     # Geopolitical & economic event dataset
│
├── notebooks/      # EDA and modeling notebooks
│
├── reports/
│   ├── interim_report.md
│   └── final_report.md
│
├── backend/        # Flask API (Task 3)
├── frontend/       # React dashboard (Task 3)
│
└── README.md

🧪 Project Tasks
Task 1 – Foundation

Define analysis workflow

Perform initial EDA

Compile key geopolitical and economic events

Document assumptions and limitations

Task 2 – Change Point Modeling

Build Bayesian change point models

Interpret posterior results

Quantify impacts of detected changes

Associate changes with real-world events

Task 3 – Interactive Dashboard

Flask backend for data & model outputs

React frontend for visualization

Interactive exploration of price movements and events

🔀 Branching Strategy

main – stable, final code

task-1-foundation – EDA, event data, interim report

task-2-change-point-modeling – Bayesian models & results

task-3-dashboard – Flask + React dashboard

🛠️ Tools & Technologies

Python (pandas, numpy, matplotlib, seaborn)

PyMC (Bayesian inference & MCMC)

Flask (API backend)

React (interactive dashboard)

Git & GitHub (version control)

📬 Communication

Results are intended to be communicated through:

Technical reports

Policy-focused summaries

Interactive dashboards for stakeholders