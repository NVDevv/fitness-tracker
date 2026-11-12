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
11. User can save the workout so that they can view it later. ## must
12. User can view history so that they can see how many times they've been in the gym. ## must
13. User can select an exercise so that they can see a progress chart on that specific exercise. ## must
14. User can use TDEE calculator to calculate their TDEE. ## later
15. User can track their weight in the profile. ## later
16. User can log-in with FACE ID. ## later
17. User can have whole week workouts already organized. ## later

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
Workout -> id, date, userId
Exercise -> id, name
Set -> id, workoutId, exerciseId, reps, weight