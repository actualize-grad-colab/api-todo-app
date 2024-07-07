-- migrate:up
CREATE TABLE app_users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    display_name VARCHAR(64) NOT NULL
);

CREATE TYPE todo_status AS ENUM ('canceled', 'pending', 'active', 'complete');

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(128),
    body TEXT,
    status TODO_STATUS DEFAULT 'pending',
    user_id INTEGER REFERENCES app_users (user_id) ON DELETE CASCADE
);

CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    label VARCHAR(32) NOT NULL,
    user_id INTEGER REFERENCES app_users (user_id) ON DELETE CASCADE,
    UNIQUE (user_id, label)
);

CREATE TABLE todo_tags (
    todo_id INTEGER REFERENCES todos ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags (tag_id) ON DELETE CASCADE,
    PRIMARY KEY (todo_id, tag_id)
);

-- migrate:down
DROP TABLE IF EXISTS todo_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS todos;
DROP TYPE IF EXISTS TODO_STATUS;
DROP TABLE IF EXISTS app_users;
