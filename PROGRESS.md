# Progress

Update this at the end of every session. Share it at the start of every new chat.

## Where I am

- Current week: 2 finished (React with fake data). Week 3 is next (backend)
- Last session: 2026-11-24 - learned props and a function as a prop (child tells parent). The Start button now switches to the Workout Page. On the Workout Page: sets live in state, controlled inputs for reps and weight, exercise dropdown, and a popup form (open/close with a boolean state) that adds a set. From this session on, lessons are in US English
- Next step: Week 3 - start the backend. Learn what a backend and an API are, then set up backend/ with Node.js + Express + TypeScript and make the first endpoint. Order follows the thinnest version in DESIGN.md: GET /exercises first (simplest, a hand-written list), then POST /workouts, GET /workouts/:id, POST /sets
- Optional small cleanups on the frontend, can wait: Cancel in the popup does not clear the typed text; the form could become its own component later (YAGNI for now)

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
- Week 2: props - MainScreen takes an onStartClick function prop from App, the real Start button switches the page, temporary button deleted
- Week 2: Workout Page sets moved into state (useState with the fake sets as the starting value)
- Week 2: controlled inputs for reps and weight, Add button builds a new set and adds it with the spread pattern
- Week 2: Exercise type and a hand-written exercises list, dropdown stores the chosen exercise id, the name is found with .find()
- Week 2: popup form on the Workout Page, shown or hidden by a boolean state, closes and clears after Add

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
- Data flows down through props, and a child tells its parent by calling a function the parent passed as a prop
- Data that changes lives in state. The starting constant is only the starting value, everything after reads the state
- The set stores exerciseId, the exercise name is looked up from the list (one source of truth)
- The popup is a plain form shown or hidden with a boolean state. A styled overlay popup can wait
- Variable names start lowercase, capitals are for types and components. State is named [thing, setThing]
- Lessons are in US English from now on

## Things I learned (in my own words)

- I've learned what main branch is, how to add and commit files to git repo, how to ammend latest copy. Also learned how to create a repo and check its status. Ive learned what entities are, fields and how 'one to many' relations work and what foreign keys are.
- Week 2: a component is a function that returns JSX and its name starts with a capital letter. {} in JSX puts a TypeScript value in. .map turns an array into a list of JSX and every item needs a unique key. A type can use another type by name, and Thing[] means an array of Things. useState remembers a value and the setter tells React to redraw. onClick needs a function, so () => ... and not a direct call. Use === and not ==.

## Open questions / things that confused me

- None right now (the props question was answered in week 2)
