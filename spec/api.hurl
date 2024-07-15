# Tods
GET http://localhost:3300/api/v1/todos
HTTP 200

POST http://localhost:3300/api/v1/todos
{
  "title": "New Todo",
  "body": "API test"
}

GET http://localhost:3300/api/v1/tags
HTTP 200


# Tags
GET http://localhost:3300/api/v1/tags
HTTP 200

POST http://localhost:3300/api/v1/tags
{
  "label": "work"
}

GET http://localhost:3300/api/v1/tags/1
HTTP 200
