# Tods
GET http://localhost:3300/api/v1/todos
HTTP 200

POST http://localhost:3300/api/v1/todos
{
  "title": "New Todo",
  "body": "API test"
}
HTTP 201
[Captures]
new_todo_id: jsonpath "$.todos.id"

GET http://localhost:3300/api/v1/todos
HTTP 200

DELETE http://localhost:3300/api/v1/todos/{{new_todo_id}}
HTTP 204


