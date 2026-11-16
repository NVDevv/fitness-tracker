## User stories

1. If user has no account, they sign-up so that they have an account. ## must
2. If user has an account, they log-in so that they get access to the app. ## must
3. User creates new workout. ## must
4. User picks an exercise from the list of exercises so that they can record exercise. ## must
5. User can search for the exercise in the search bar if they cannot find it in the list so that they find the exercise easier. ## later
6. User can track reps, weight, and sets so that they can keep track for the exercise. ## must
7. User can edit the reps, weight and sets after saving so that he can fix if he wrote something wrong by mistake. ## must
8. User saves the exercise to workout session so that they can look at it in progress after. ## must
9. User finishes workout so that they can end the session. ## must
10. User can log out so that someone else can log-in. ## must
11. User can view history so that they can see how many times they've been in the gym. ## must
12. User can select an exercise so that they can see a progress chart on that specific exercise. ## must
13. User can use TDEE calculator to calculate their TDEE. ## later
14. User can track their weight in the profile. ## later
15. User can log-in with FACE ID. ## later
16. User can have whole week workouts already organized. ## later

## Data

## Entities

User
Workout
Exercise
Set

## Fields

## Thoughts:
    - 1 user has many workouts.
    - 1 exercise has many sets.
    - 1 workout has many sets.

User -> id, email, password
Workout -> id, date, userId, finished
Exercise -> id, name
Set -> id, workoutId, exerciseId, reps, weight

## Screens

Burger is on every screen after log in. Log out inside it covers story 10.
"Current workout" is in the burger only while there is an unfinished workout.

1. Login (2)
    Shows
        Nothing from the data, user is not logged in yet.

    Actions
        Text fields to write email and password. Button to log in. Blue text under it to sign-up.
    
    Exits
        Button to log in -> Main screen
        Sign-up blue text -> Sign-up page

2. Sign-up (1)
    Shows
        Nothing from the data, user has no account yet.

    Actions
        Text fields to write email and password. Button to sign up. Blue text under it to go back to log in.
    
    Exits
        Button to sign up -> Main screen
        Log in blue text -> Login

3. Main Screen (3)
    Shows
        If there is an unfinished workout or not (Workout.finished).

    Actions
        Click button to create new workout. If there is an unfinished workout, the button continues that one instead. Tap burger to expand to all dropdown options.
    
    Exits
        Button for workout -> Workout Page
        Inside burger:
        Progress -> Progress Page
        History -> History Page
        Log out -> log in page

4. Workout Page (4, 6, 7, 8, 9)
    Shows
        Date of the workout (Workout.date). List of exercises added so far (Exercise.name), and under each one its sets with reps and weight (Set.reps, Set.weight). List of all exercises to choose from when adding (Exercise.name).

    Actions
        Tap add exercise. Choose an exercise from the list. Popup to enter sets and values for reps and weight on each set. Click add button to add exercise to workout. Tap a set in the list to edit its reps and weight. Tap finish workout button.

    Exits
        Finish workout button -> Main screen
        Inside burger:
        Home -> Returns to main screen
        Progress -> Progress Page
        History -> History Page
        Log out -> log in page

5. Progress Page (12)
    Shows
        List of exercises for the picker (Exercise.name). For the chosen exercise, weight (Set.weight) over time (Workout.date) in visual format.

    Actions 
        Tap exercise picker. Choose exercise. Popup where progress in weight is shown via graphicon.
    
    Exits
        Inside burger:
        Home -> Returns to main screen
        Current workout -> Workout Page
        History -> History Page
        Log out -> log in page

6. History Page (11)
    Shows
        Calendar with days in green when a workout has been finished on that day (Workout.date), others white. For the tapped day, the exercises and sets of that workout (Exercise.name, Set.reps, Set.weight).

    Actions 
        Tap on day to popup workout info of that day.
    
    Exits
        Inside burger:
        Home -> Returns to main screen
        Current workout -> Workout Page
        Progress -> Progress Page
        Log out -> log in page

## Endpoints

:id in a path means the id of one specific item, for example /workouts/7.
The backend knows which user is logged in, so userId is never sent.
Nothing is deleted in version 1, so there is no DELETE.

1. POST /users
    Used by: Sign-up, button to sign up (1)
    Request: { email, password }
    Response: the created user { id, email }

2. POST /login
    Used by: Login, button to log in (2)
    Request: { email, password }
    Response: the user { id, email }

3. POST /logout
    Used by: Burger, log out (10)
    Request: nothing
    Response: nothing

4. GET /workouts
    Used by: Main Screen when it opens (is there an unfinished workout), History Page when it opens (which days are green)
    Request: nothing
    Response: list of my workouts [{ id, date, finished }]

5. POST /workouts
    Used by: Main Screen, button for workout (3)
    Request: nothing, the backend sets the date to today and finished to false
    Response: the created workout { id, date, finished }

6. GET /workouts/:id
    Used by: Workout Page when it opens, History Page when a day is tapped (11)
    Request: nothing
    Response: one workout with its sets { id, date, finished, sets: [{ id, exerciseId, exerciseName, reps, weight }] }

7. PATCH /workouts/:id
    Used by: Workout Page, finish workout button (9)
    Request: { finished: true }
    Response: the changed workout { id, date, finished }

8. GET /exercises
    Used by: Workout Page when adding an exercise (4), Progress Page picker
    Request: nothing
    Response: list of all exercises [{ id, name }]

9. POST /sets
    Used by: Workout Page, add button. Sent once for each set (6, 8)
    Request: { workoutId, exerciseId, reps, weight }
    Response: the created set { id, workoutId, exerciseId, reps, weight }

10. PATCH /sets/:id
    Used by: Workout Page, tap a set to edit (7)
    Request: { reps, weight }
    Response: the changed set { id, workoutId, exerciseId, reps, weight }

11. GET /exercises/:id/progress
    Used by: Progress Page, after choosing an exercise (12)
    Request: nothing
    Response: one point for each day [{ date, weight }], weight is the heaviest set of that day

## Thinnest version

## Demo

I open the app and tap the workout button. On the Workout Page I add an exercise with reps and weight, and it shows up in the list. I refresh the page and it is still there.

## Stories

in = built for real, fake = cheapest stand-in, cut = left out for now

1. Sign-up -> fake. One user is written directly in the backend, every request belongs to that user.
2. Log-in -> fake. Same user, the app opens straight on the Main Screen.
3. Create new workout -> in
4. Pick an exercise from the list -> in. The list is a few exercises written by hand.
6. Track reps, weight and sets -> in. The popup adds one set at a time.
7. Edit reps and weight -> cut
8. Save the exercise to the workout -> in
9. Finish workout -> cut
10. Log out -> cut
11. History -> cut
12. Progress chart -> cut

## What the slice touches

Screens
    Main Screen, only the workout button. No burger. The button always creates a new workout.
    Workout Page, without editing a set and without the finish button.

Endpoints
    5. POST /workouts
    6. GET /workouts/:id
    8. GET /exercises
    9. POST /sets

Entities
    Workout -> real
    Set -> real
    Exercise -> real, but only a few rows written by hand
    User -> fake, one user written in the backend

## The walk

1. Main Screen: tap the workout button -> POST /workouts -> a new Workout is created with today's date and finished false.
2. The app opens the Workout Page for that workout -> GET /workouts/:id -> shows the date and an empty list.
3. Workout Page: tap add exercise -> GET /exercises -> shows the list of exercises.
4. Choose an exercise, enter reps and weight, tap add -> POST /sets -> a new Set is created with that workoutId and exerciseId.
5. The Workout Page asks again -> GET /workouts/:id -> the set shows up under its exercise.
6. Refresh the page -> GET /workouts/:id -> the same workout and set come back.

## Widening order

1. Finish workout (9), with GET /workouts so the main button continues an unfinished workout. A workout now has a start and an end.
2. Several sets in one popup (6). Same endpoint, sent once for each set.
3. Edit a set (7). Small, and it stays on the Workout Page.
4. History (11) and the burger. Needs finished workouts, and the burger is needed as soon as there is a second page to go to.
5. Progress chart (12). Needs workouts on several days to show anything.
6. Sign-up, log-in, log out (1, 2, 10). Week 6 in the roadmap, replaces the fake user.
