-- This makes a good case for using variables in the SQL

BEGIN;

SET transaction READ WRITE;

INSERT INTO account_profiles (username, email, pwd)
VALUES ('johndoe', 'actualize-grad-colab-testuser@gmail.com', 'password123');

INSERT INTO app_users (first_name, last_name, display_name, profile_id)
SELECT
    'John' AS first_name,
    'Doe' AS last_name,
    'JDoe' AS display_name,
    profile_id
FROM account_profiles
WHERE username = 'johndoe';

INSERT INTO todos (title, body, user_id)
SELECT
    'Buy milk' AS title,
    'Need to buy milk from the store' AS body,
    user_id
FROM app_users
WHERE display_name = 'JDoe';

INSERT INTO tags (label, user_id)
SELECT
    'Groceries' AS label,
    user_id
FROM app_users WHERE display_name = 'JDoe';

INSERT INTO todo_tags (todo_id, tag_id)
SELECT
    todos.todo_id,
    tags.tag_id
FROM todos
CROSS JOIN tags
WHERE
    todos.title = 'Buy milk'
    AND tags.label = 'Groceries';

COMMIT;
