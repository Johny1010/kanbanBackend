# kanbanBackend
1. Download project
2. npm install
3. node server.js

# Endpoint's description<br />
GET /api/kanban/projects - get all projects<br />
POST /api/kanban/projects - create new project<br />

GET /api/kanban/projects/:id - get one project<br />
DELETE /api/kanban/projects/:id - delete one project<br />
PUT /api/kanban/projects/:id - update project<br />

POST /api/kanban/projects/:id/column - create new column in project<br />
DELETE /api/kanban/projects/:id/column/:column_id - delete column<br />
PUT /app/kanban/projects/:id/column/:column_id - update column<br />

POST /api/kanban/projects/:id/card - create new card<br />
PUT /app/kanban/projects/:id/card/:card_id - update card<br />
DELETE /api/kanban/projects/:id/card/:card_id - delete card<br />
