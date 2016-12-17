# kanbanBackend
1. Download project
2. npm install
3. node server.js

Endpoint's description
GET /api/kanban/projects - get all projects
POST /api/kanban/projects - create new project

GET /api/kanban/projects/:id - get one project
DELETE /api/kanban/projects/:id - delete one project
PUT /api/kanban/projects/:id - update project

POST /api/kanban/projects/:id/column - create new column in project
DELETE /api/kanban/projects/:id/column/:column_id - delete column
PUT /app/kanban/projects/:id/column/:column_id - update column

POST /api/kanban/projects/:id/card - create new card
PUT /app/kanban/projects/:id/card/:card_id - update card
DELETE /api/kanban/projects/:id/card/:card_id - delete card