# Progress

Update this at the end of every session. Share it at the start of every new chat.

## Where I am

- Current week: 4 (database). Week 5 was done first on purpose, and the thinnest version now works end to end. The backend still keeps data in arrays (lost on restart)
- Last session: 2026-11-27 to 28 - finished the thinnest version (the Workout Page shows the real workout, Add saves sets, a refresh keeps the same workout). Started week 4: PostgreSQL, the fitness database, Prisma packages. Debugged: passing and receiving a prop, a wrong Content-Type header, reloadCount++ handing over the old value, saving the old state value to localStorage
- Next step:
  1. Run `git status` first. If backend/package.json, backend/package-lock.json and PROGRESS.md are not committed and pushed, do that before changing anything
  2. Add .env to backend/.gitignore BEFORE any password is written to a file (there is no .gitignore in the root folder)
  3. In backend/ run `npx prisma init --datasource-provider postgresql --output ../generated/prisma --no-skills` (it makes prisma/schema.prisma, prisma7.config.ts and .env)
  4. Put the connection text for the fitness database in .env: postgresql://postgres:PASSWORD@localhost:5432/fitness?schema=public (characters like @ # : / in the password need encoding). The real password never goes in the chat or in Git
  5. Prisma 7 needs "type": "module" in backend/package.json, and tsconfig.json may need to change with it (not tested yet)
  6. Describe Workout, Set and Exercise as Prisma models, run the first migration, then replace the arrays one route at a time (the routes should barely change)
- Optional small cleanups, can wait: App.tsx and WorkoutPage.tsx both have a type named Workout with different fields. WorkoutIdPropType would be clearer as WorkoutPageProps. No error handling on fetch yet (after a backend restart the saved id gives a blank page, delete the workoutId row in Local storage). Backend - validate reps/weight types in POST /sets (week 7). The popup form could become its own component later (YAGNI for now)

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
- Week 3: backend/ project created (npm init, Express, TypeScript, tsx, @types), own .gitignore, `npm run dev` runs tsx watch on src/index.ts, port 3000
- Week 3: GET /exercises (hand-written list in a const outside the handler)
- Week 3: POST /workouts (date = today as YYYY-MM-DD, finished false, id counter, status 201)
- Week 3: GET /workouts/:id (route param converted with Number, 404 when missing, returns the workout plus its sets)
- Week 3: POST /sets (body read with express.json(), 404 if the workout or the exercise does not exist, status 201)
- Week 3: sets in the GET response built with .filter (sets of this workout) and .map (add exerciseName with .find)
- Week 3: full walk of the 4 endpoints passed with curl
- Week 5: Vite proxy in frontend/vite.config.ts sends /api/... to port 3000 and removes /api
- Week 5: Workout Page loads the exercises with useEffect and fetch, the hand-written list is gone from the frontend, the chosen id is set from the loaded data
- Week 5: Start sends POST /api/workouts, reads the JSON with a type (id, date, finished), then shows the Workout Page
- Week 5: App keeps the workout id in state and passes it to WorkoutPage as the workoutId prop
- Week 5: Workout Page loads GET /api/workouts/:id in a second useEffect and shows its date and sets, fakeWorkout deleted
- Week 5: Add sends POST /api/sets (Content-Type header and JSON.stringify), then reloadCount makes the workout load again
- Week 5: the workout id is saved in localStorage, the page state and the Page type are gone
- Thinnest version works end to end (the demo in DESIGN.md)
- Week 4: PostgreSQL 19 installed and running, SQL Shell (psql) connects
- Week 4: database fitness created with CREATE DATABASE
- Week 4: Prisma 7.10.1 installed in backend/ (prisma, @prisma/client, @prisma/adapter-pg, pg, dotenv), prisma init not run yet

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
- Until week 4 the backend keeps data in arrays in memory. The database replaces the arrays later, the routes should barely change
- The set type in code is named WorkoutSet (Set is a built-in JavaScript type)
- New workout date is the UTC date from toISOString. Known small limitation (late evening can show tomorrow), fine for version 1
- POST /sets only checks that the workout and the exercise exist. Checking reps/weight types waits for week 7
- Counters are named newWorkoutId and newSetsId so they do not clash with names from req.body
- Testing without the frontend: browser for GET, curl.exe for POST. In cmd.exe wrap the JSON in double quotes and escape the inner ones with a backslash (Thunder Client in VS Code is the no-quoting alternative)
- Connect the frontend to the backend before adding the database, to get an end-to-end demo early
- In development the frontend calls /api/... and the Vite proxy passes it to the backend, so no CORS setup is needed for now (the published setup is decided in week 8)
- The app remembers the current workout id in localStorage under the key workoutId. Later the backend can say which workout is unfinished
- The workout id alone decides the screen: 0 shows the Main Screen, any other number shows the Workout Page. A page state comes back when History and Progress arrive
- After Add, the Workout Page asks the backend for the workout again instead of adding to its own list, and the backend gives the set id
- Until Finish workout exists there is no button back to the Main Screen
- Prisma version 7, not 8 (8 was only a release candidate in November 2026). Use the version 7 docs: https://www.prisma.io/docs/v7/prisma-orm/add-to-existing-project/postgresql
- Development uses a local PostgreSQL database named fitness

## Things I learned (in my own words)

- I've learned what main branch is, how to add and commit files to git repo, how to ammend latest copy. Also learned how to create a repo and check its status. Ive learned what entities are, fields and how 'one to many' relations work and what foreign keys are.
- Week 2: a component is a function that returns JSX and its name starts with a capital letter. {} in JSX puts a TypeScript value in. .map turns an array into a list of JSX and every item needs a unique key. A type can use another type by name, and Thing[] means an array of Things. useState remembers a value and the setter tells React to redraw. onClick needs a function, so () => ... and not a direct call. Use === and not ==.

## Open questions / things that confused me

- Worth a quick recap: which server gets the request first (Vite on 5173, then Express on 3000); state does not change on the line right after calling its setter (came up twice on 2026-11-27); how to write a type and attach it to a value; how a prop travels (label, type, the whole props object, props.label)
- Suggested points for 2026-11-27 (write them in your words): what a prop is; why changing something inside [ ] makes useEffect run again; what method, headers and body do in a POST; why reloadCount++ was a bug; what localStorage is, why it holds only text and why a refresh needs it
- Suggested points for week 4 so far (write them in your words): what a database, a table and a row are; why arrays lose data on a restart; what SQL is and what CREATE DATABASE does; what @7 after a package name means
- Suggested points for week 5 (write them in your words): what a proxy does and why the browser needs it here; GET vs POST; when fetch goes in useEffect and when in a click; what async and await do; what response.json() does; why an empty list on the first draw matters; why data from the backend gets a type
- Suggested points for your own "Things I learned" (write them in your words): what a backend, an API, HTTP and JSON are; what a route is (method + path); req.params vs req.body; why express.json() is needed; status codes 201 and 404; why an arrow function with braces needs return; what .filter, .map and .find each do and how they combine; what ?. does; why TypeScript did not catch logic bugs
