Prompts.md
1. Understanding the brief

Prompt: I pasted the full capstone brief and asked Claude to explain it in plain language before doing anything.

Why: The brief was long and I wanted to know what was required (README, Figma, diagram, Prompts.md, demo video) before starting.

Result: A simple summary of the 3 project options, the 2 tracks and the 3 phases.

2. Choosing a project and track

Prompt: "what would you recommend"

Why: I could not decide between EduCore, VitalSync and TaskMatrix, and between Frontend and Fullstack.

Result: Claude recommended TaskMatrix on the Fullstack track. Reasons: it fits the 3-5 collections the brief asks for, it reuses the Socket.io and Express/MongoDB skills I already have, and it avoids hard things like video uploads (EduCore) and complicated access rules (VitalSync).

What I did: I agreed and picked TaskMatrix + Fullstack.

3. Writing the README (PRD)

Prompt: Asked Claude to write the README with the project name, description, track, tech stack and a prioritized feature list.

Why: The README is the PRD, and it is the mandatory part of the sprint.

Result: A first README that also had future sprint plans in it.

What I changed: I asked for a new version with only the current sprint's content, so the roadmap and sprint labels were removed.

4. Figma wireframes

Prompt: Asked for the wireframe steps one at a time, then connected the Figma connector and asked Claude to draw the design in my Figma file.

Why: The brief needs at least 3 screens with mobile layouts.

Result: 4 screens (Auth, Dashboard, Project board, Task details), each in desktop and mobile, so 8 frames.

What I did: I checked the frames in Figma and added the share link to the README.

Sprint 14 - MVP (Auth + Routing)

I did Track B (Fullstack), Phase 1 and Phase 2. I skipped Phase 3.

5. Understanding the Sprint 14 brief

Prompt: I pasted the Sprint 14 brief and asked Claude to explain it in plain language before any code.

Why: I wanted to know what a walking skeleton is and what each phase needs.

Result: A simple explanation of hashing, JWT and the 3 phases for my track.

What I did: I picked Track B and decided to stop at Phase 2.

6. User model and password hashing (Phase 1)

Prompt: Asked for the Mongoose User schema (name, email, password) and password hashing with bcryptjs.

Why: Saving plain text passwords is an automatic fail in this sprint.

Result: User.js with a pre-save step that salts and hashes the password.

What went wrong: I got "next is not a function". New Mongoose does not give next to pre('save'), so I removed next and returned the promise. It was also confusing because I had saved User.js in the wrong folder once, so the old code kept running.

What I did: I saved a test user and checked in Atlas that the password was a $2a$10$ string.

7. Atlas connection error

Prompt: Pasted the error "querySrv ECONNREFUSED" when connecting to Atlas.

Why: The server could not connect to my database.

Result: Claude said my DNS lookup was failing and told me to force Google DNS with dns.setServers at the top of server.js.

What I did: Added that line and it connected.

8. Register and login routes with JWT (Phase 2)

Prompt: Asked for /api/auth/register and /api/auth/login that return a JWT.

Why: This is the main part of Phase 2.

Result: routes/auth.js with bcrypt.compare and jwt.sign (1 day expiry). Wrong email and wrong password give the same message on purpose.

What I did: Tested both routes from PowerShell (including a wrong password) and checked the new user in Atlas.

9. React forms and dashboard (Phase 2)

Prompt: Asked for Register and Login forms in React that send POST requests, save the token in localStorage and go to a dashboard.

Why: The brief needs the user to register, log in and reach the dashboard.

Result: Register.jsx, Login.jsx and Dashboard.jsx using useState, fetch with .then() and react-router-dom.

What went wrong: Login kept saying "wrong email or password". The password box had extra autofilled text. I cleared it, typed again and it worked.

10. Git and GitHub problems

Prompt: Pasted my git status when GitHub was empty after git push.

Why: Nothing was committed and node_modules was staged because I ran npm install in the wrong folder.

Result: I removed the extra root node_modules and package.json, added a root .gitignore, set my git name and email (git was new on my PC) and then committed and pushed.

What I did: Checked git status before every commit to make sure .env and node_modules were not in the list.

11. Deployment (Render and Vercel)

Prompt: Asked for the steps to deploy the backend on Render and the frontend on Vercel.

Why: The brief says to deploy the MVP right away to find CORS and env variable problems early.

Result: Render with root directory server, MONGO_URI and JWT_SECRET as environment variables and 0.0.0.0/0 in Atlas Network Access. Vercel with root directory client and VITE_API_URL pointing to the Render URL.

What went wrong: Vercel showed 404 on /register because vercel.json was inside src. I moved it to the client folder and it worked. I also had two Vercel projects by mistake, so I deleted and made it again.

What I did: Tested register and login on the live site.

12. Updating the README and Prompts.md

Prompt: Asked Claude to update the README and Prompts.md with the live links and what was done in this sprint.

Why: The submission needs the docs to match the final app.

Result: README now has live links, Sprint 14 progress, endpoints and how to run it. Prompts.md has these entries.

What I did: Read both files and checked the links before pushing.

What I learned
Planning first makes the feature list smaller and more realistic.
Asking for one step at a time is easier to follow than getting everything at once.
I still need to check the AI's output myself (like I did with the README and the Figma frames).
Passwords must be hashed before saving, never stored as plain text.
A JWT is like a signed entry pass that the server gives after login.
Env variables (.env, Render, Vercel) keep secrets out of GitHub.
The Render free tier sleeps, so the first request can take around 50 seconds.
Always check git status before committing so .env and node_modules do not go to GitHub.

## Sprint 15 - Feature Complete (CRUD)

Track: B (Fullstack) - Phase 1 and Phase 2 only

### Prompt 1 - understanding the sprint
**Prompt:** I pasted the Sprint 15 brief and asked for a plain language explanation before any code.
**What AI gave:** Explained CRUD, ownership check (authorId vs userId from the JWT, 403 if not the owner), and optimistic delete in simple words.
**What I did with it:** Decided to do Phase 1 and Phase 2 and skip the Stripe phase.

### Prompt 2 - backend CRUD with ownership (Phase 1)
**Prompt:** Asked for Phase 1 code: Task model and JWT-protected POST, GET, PUT, DELETE routes for tasks.
**What AI gave:** `server/models/Task.js` and `server/routes/tasks.js`, with the ownership check returning 403.
**What I did with it:** Created both files, mounted `/api/tasks` in `server.js`, and checked that my JWT uses the `id` key so `decoded.id` matches.

### Prompt 3 - testing without Postman
**Prompt:** Asked how to test the routes without installing Postman.
**What AI gave:** PowerShell `Invoke-RestMethod` commands for login, create, read, update and delete.
**What I did with it:** Tested all four routes. Then registered a second user and tried to delete the first user's task, and got 403 "Not your task".

### Prompt 4 - React connection (Phase 2)
**Prompt:** Asked for Phase 2: connect React to the endpoints with an optimistic delete.
**What AI gave:** `client/src/Tasks.jsx` with a task list, add form, edit and delete.
**What I did with it:** Imported it into my Dashboard page (`../Tasks`). Delete removes the task from the screen first, then calls the API in the background.

### Prompt 5 - bugs I fixed with AI help
- **Blank page, "No routes matched location /":** added a route that redirects `/` to `/login`.
- **"API is not defined" in Login.jsx:** added `var API = import.meta.env.VITE_API_URL;`.
- **git push rejected (fetch first):** ran `git pull --no-rebase`, then pushed.
- **Vercel build failed (duplicate import):** `Route` was imported twice from react-router-dom in `App.jsx`. Removed the extra import line.

### What I learned
- Ownership check: compare the task's `authorId` with the userId inside the token. The server decides who owns it, never the client.
- Optimistic UI: update the screen first, then tell the server, and put the task back if the server says no.
- Vite env variables must start with `VITE_` to reach the browser.
