# Progress

Update this at the end of every session. Share it at the start of every new chat.

## Where I am

- Current week: 2 (learn React, build the screens with fake data)
- Last session: 2026-11-23 - made the React + Vite project in frontend/. Built the Main Screen and the Workout Page with fake data. Learned state and made App switch pages with a temporary button
- Next step: Week 2 - props. Make the real Start button in MainScreen switch to the Workout Page (MainScreen gets an on-start function prop from App), then delete the temporary button in App

## Day 1 checklist

- [x] VS Code installed
- [x] Node.js (LTS) installed, `node -v` prints a version
- [x] Git installed, `git -v` prints a version
- [x] GitHub account created
- [x] Chrome installed

## Done so far

- Project scope and roadmap agreed (see ROADMAP.md)
- Git repo created (local identity set for this repo only), branch renamed to main, pushed to GitHub
- Practised the daily loop: edit -> git add -> git commit -> git push
- Design question 1 done: user stories, each tagged must or later (DESIGN.md)
- Design question 2 done: data model with 4 entities - User, Workout, Exercise, Set (DESIGN.md)
- Design question 3 done: 6 screens, each with Shows / Actions / Exits (DESIGN.md)
- Design question 4 done: 11 API endpoints (DESIGN.md)
- Design question 5 done: thinnest version - 2 screens, 4 endpoints, and the order to widen it (DESIGN.md)
- Week 2: React + Vite project created in frontend/ (TypeScript, ESLint)
- Week 2: MainScreen component (heading + Start button, no behaviour yet)
- Week 2: WorkoutPage with types (Workout, WorkoutSet) and a fake workout, list made with .map and key
- Week 2: App holds the state for which page shows, switched by a temporary button

## Decisions made

- TypeScript everywhere
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Tests: Vitest
- CI/CD: GitHub Actions
- Version 1 scope: sign up / log in, record workouts, history, progress chart
- A workout in version 1 is one gym session on one day. Saved plans (whole week organized) are for later
- Exercises come from a shared list (catalogue), the user does not type the name freely
- Set is the entity that connects things: it holds workoutId and exerciseId. Exercise holds no foreign keys
- This project uses terminal Git and GitHub, separate from the work setup
- Finish workout is the save, there is no separate save button
- Workout has no title, the Workout Page shows its date
- Workout gets a finished field (true/false) so the app knows if a workout is still in progress
- Only one unfinished workout at a time. The main screen button continues it, and "Current workout" in the burger shows only while one exists
- Editing reps and weight happens on the Workout Page by tapping a set. History only shows workouts
- Search for exercises stays later (story 5), version 1 picks from the list
- Sign-up is its own screen
- The backend sets the date of a new workout to today, the user does not pick it
- Adding an exercise sends one request for each set (POST /sets)
- Progress chart shows the heaviest set of each day
- Nothing can be deleted in version 1
- App decides which screen is visible. main.tsx only draws App
- Screens live in frontend/src/screens/
- Workout Page uses fake data in the same shape as GET /workouts/:id, so the real backend can replace it later
- Thinnest version: tap the workout button, add an exercise with reps and weight, see it in the list, refresh and it is still there
- In the thinnest version the user is faked (one user written in the backend). Sign-up, log-in and log out come in week 6
- In the thinnest version the popup adds one set at a time and the main button always creates a new workout

## Things I learned (in my own words)

- I've learned what main branch is, how to add and commit files to git repo, how to ammend latest copy. Also learned how to create a repo and check its status. Ive learned what entities are, fields and how 'one to many' relations work and what foreign keys are.
- Week 2: a component is a function that returns JSX and its name starts with a capital letter. {} in JSX puts a TypeScript value in. .map turns an array into a list of JSX and every item needs a unique key. A type can use another type by name, and Thing[] means an array of Things. useState remembers a value and the setter tells React to redraw. onClick needs a function, so () => ... and not a direct call. Use === and not ==.

## Open questions / things that confused me

- Props: how does a child component tell its parent that something happened
