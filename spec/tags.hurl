# Tags
GET http://localhost:3300/api/v1/tags
HTTP 200

POST http://localhost:3300/api/v1/tags
{
  "label": "work"
}
HTTP 201
[Captures]
new_tag_id: jsonpath "$.tags.id"

GET http://localhost:3300/api/v1/tags/{{new_tag_id}}
HTTP 200

DELETE http://localhost:3300/api/v1/tags/{{new_tag_id}}
HTTP 204
