# Fitness Tracking App - Roadmap

Goal: a small, complete full-stack app for my resume (junior full-stack developer).
Time budget: 2 hours a day, about 8 weeks plus 1-2 weeks of buffer.

## What the app does (version 1)

- Sign up and log in
- Record a workout (exercises, sets, reps, weight)
- See workout history
- See a progress chart per exercise

Anything else waits until all of this works.

## Tech stack (TypeScript everywhere)

| Part     | Tool                 | Why                                                        |
|----------|----------------------|------------------------------------------------------------|
| Frontend | React + Vite         | Most requested in junior job ads, reused by React Native   |
| Backend  | Node.js + Express    | Small and readable, nothing hidden                         |
| Database | PostgreSQL + Prisma  | Industry-standard database, Prisma talks to it in TypeScript |
| Tests    | Vitest               | Simple, works for frontend and backend                     |
| CI/CD    | GitHub Actions       | Free and built into GitHub                                 |

CI/CD: every time I upload code, a robot runs my tests (CI) and, if they pass,
publishes the new version automatically (CD).

## Programs to install

- VS Code
- Node.js (LTS version)
- Git, plus a GitHub account
- Chrome (for DevTools)
- PostgreSQL (not needed until week 4)

## Weekly plan

1. Week 1: Set up the tools, learn Git basics, design the app on paper.
2. Week 2: Learn React, build the screens with fake data.
3. Week 3: Build the backend, an API that sends and receives workouts.
4. Week 4: Add the database so data survives a restart.
5. Week 5: Connect the frontend to the backend.
6. Week 6: Add sign up and log in.
7. Week 7: Write tests and practise debugging properly.
8. Week 8: Set up CI/CD, publish the app, write the README and the resume entry.

## How to design a system (same five questions, same order)

1. What does the user do? Plain sentences, like "I can log a workout."
2. What must the app remember? The nouns (user, workout, exercise, set) become database tables.
3. What screens are needed? Sketch them as boxes on paper.
4. What travels between screen and data? Each action becomes one API endpoint.
5. What is the thinnest version that works end to end? Build that first, then widen it.

## Working rules

- If a task feels overwhelming, split it until each piece takes 30 minutes or less.
- Change one thing at a time, then test it.
- Save with Git every time something works.
- Keep it simple (KISS). Don't build things I don't need yet (YAGNI). Don't repeat myself (DRY).

## How sessions run

- Short theory, then a task in plain language. I write all the code.
- Hints before answers. Full solutions only when I ask.
- One chat per session or topic. Start each new chat by sharing PROGRESS.md.
- Sonnet 5.5 for daily sessions. Opus 5.5 or Fable only for system design or a stubborn bug.
