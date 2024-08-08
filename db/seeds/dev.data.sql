-- This makes a good case for using variables in the SQL

BEGIN;

-- SET transaction READ WRITE;

-- INSERT INTO account_profiles (username, email, pwd)
-- VALUES ('johndoe', 'actualize-grad-colab-testuser@gmail.com', 'password123');

INSERT INTO app_users (first_name, last_name, display_name)
SELECT
    'John' AS first_name,
    'Doe' AS last_name,
    'JDoe' AS display_name;

INSERT INTO todos (title, body, user_id)
SELECT
    'Buy milk' AS title,
    'Need to buy milk from the store' AS body,
    id AS user_id
FROM app_users
WHERE display_name = 'JDoe';

INSERT INTO tags (label, user_id)
SELECT
    'Groceries' AS label,
    id AS user_id
FROM app_users WHERE display_name = 'JDoe';

INSERT INTO todo_tags (todo_id, tag_id)
SELECT
    todos.id AS todo_id,
    tags.id AS tag_id
FROM todos
CROSS JOIN tags
WHERE
    todos.title = 'Buy milk'
    AND tags.label = 'Groceries';

COMMIT;
