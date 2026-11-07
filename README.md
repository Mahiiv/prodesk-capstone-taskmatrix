TaskMatrix

A project management app for small software teams, kind of like a mini Jira/Asana. Teams can make projects, add tasks to a Kanban board, drag tasks between columns, assign them to people, and see a live feed of what's changing.

Repo name: prodesk-capstone-taskmatrix Status: Sprint 13 (planning only, no functional code yet)

Designated Track

Fullstack

Tech Stack
Part	Tech
Frontend	React (Vite), React Router
Styling	Tailwind CSS
Drag and drop	@hello-pangea/dnd
Backend	Node.js + Express
Database	MongoDB Atlas + Mongoose
Auth	JWT (login/signup) + bcrypt for passwords
Real-time	Socket.io (activity feed)
Deployment	Vercel (frontend), Render (backend)
Problem

Small teams lose track of who is doing what. TaskMatrix gives them one board where every task has an owner, a priority and a deadline, and everyone sees updates live.

Core Features (Prioritized)
P0 - Must have (MVP, Sprint 14)
Sign up / log in / log out with JWT
Create, edit and delete projects
Kanban board with 3 columns: To Do, In Progress, Done
Create, edit and delete tasks (title, description, priority, due date)
Drag and drop tasks between columns (status saves to the database)
P1 - Should have (Sprint 15)
Assign a task to a team member
Priority tags (Low / Medium / High) with colors
Roles: Admin and Member (only Admin can delete a project or add members)
Add members to a project
Real-time activity feed with Socket.io (e.g. "Riya moved Login Page to Done")
P2 - Nice to have (Sprint 16, only if time)
AI helper: suggest subtasks or summarize project progress
Overdue task highlighting
Deadline reminders (cron job)
Out of scope (so scope doesn't creep)
Video calls, chat, payments, file uploads, mobile app
User Roles
Admin: creates the project, adds/removes members, can delete the project and any task
Member: can create tasks, edit tasks, move tasks, see the activity feed
Main Screens
Auth screen (login / signup)
Dashboard (list of my projects)
Project board (Kanban)
Task details (side panel or modal)
Activity feed (panel inside the board)

All screens have a mobile layout too.

UI/UX Wireframes

Figma link: ADD LINK HERE (set to "anyone with the link can view")

Architecture (ERD)

Coming in Phase 3.

Planned collections: Users, Projects, Tasks, Activities

Planned API Endpoints (rough)
POST /api/auth/signup, POST /api/auth/login
GET/POST /api/projects, PUT/DELETE /api/projects/:id
GET/POST /api/projects/:id/tasks, PUT/DELETE /api/tasks/:id
GET /api/projects/:id/activity
Roadmap
Sprint 13: Blueprint (this README, Figma, diagrams)
Sprint 17: CI/CD + go-live
Other Files
Prompts.md - AI prompts I used while planning
