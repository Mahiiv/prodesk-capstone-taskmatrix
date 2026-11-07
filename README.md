# TaskMatrix

A project management app for small software teams, kind of like a mini Jira/Asana. Teams can make projects, add tasks to a Kanban board, drag tasks between columns, assign them to people, and see a live feed of what's changing.

**Repo name:** prodesk-capstone-taskmatrix

---

## Designated Track

**Fullstack**

---

## Tech Stack

| Part | Tech |
| --- | --- |
| Frontend | React (Vite), React Router |
| Styling | Tailwind CSS |
| Drag and drop | @hello-pangea/dnd |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (login/signup) + bcrypt for passwords |
| Real-time | Socket.io (activity feed) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Problem

Small teams lose track of who is doing what. TaskMatrix gives them one board where every task has an owner, a priority and a deadline, and everyone sees updates live.

---

## Core Features (Prioritized)

### P0 - Must have
1. Sign up / log in / log out with JWT
2. Create, edit and delete projects
3. Kanban board with 3 columns: To Do, In Progress, Done
4. Create, edit and delete tasks (title, description, priority, due date)
5. Drag and drop tasks between columns (status saves to the database)

### P1 - Should have
6. Assign a task to a team member
7. Priority tags (Low / Medium / High) with colors
8. Roles: Admin and Member (only Admin can delete a project or add members)
9. Add members to a project
10. Real-time activity feed with Socket.io (e.g. "Riya moved Login Page to Done")

### P2 - Nice to have
11. AI helper: suggest subtasks or summarize project progress
12. Overdue task highlighting
13. Deadline reminders

### Out of scope (to avoid scope creep)
- Video calls, chat, payments, file uploads, mobile app

---

## User Roles

- **Admin:** creates the project, adds/removes members, can delete the project and any task
- **Member:** can create tasks, edit tasks, move tasks, see the activity feed

---

## Main Screens

1. Auth screen (login / signup)
2. Dashboard (list of my projects)
3. Project board (Kanban)
4. Task details (side panel or modal)

All screens have a mobile layout too.

---

## UI/UX Wireframes

Figma link: **ADD LINK HERE (set to "anyone with the link can view")**

---

## Architecture (ERD)

Coming soon.

Planned collections: Users, Projects, Tasks, Activities

---

## Other Files

- `Prompts.md` - AI prompts I used while planning
