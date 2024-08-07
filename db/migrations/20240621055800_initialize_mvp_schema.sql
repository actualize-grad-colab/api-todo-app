-- migrate:up
CREATE TABLE app_users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    display_name VARCHAR(64) NOT NULL
);

CREATE TYPE todo_status AS ENUM ('canceled', 'pending', 'active', 'complete');

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) CONSTRAINT not_empty_title CHECK (
        char_length(title) > 0
    ),
    body TEXT NOT NULL DEFAULT '',
    status TODO_STATUS NOT NULL DEFAULT 'pending',
    user_id INTEGER NOT NULL REFERENCES app_users (id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    label VARCHAR(32) CONSTRAINT not_empty_label CHECK (char_length(label) > 0),
    user_id INTEGER NOT NULL REFERENCES app_users (id) ON DELETE CASCADE,
    UNIQUE (user_id, label)
);

CREATE TABLE todo_tags (
    todo_id INTEGER REFERENCES todos (id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags (id) ON DELETE CASCADE,
    PRIMARY KEY (todo_id, tag_id)
);

CREATE INDEX ON todos (user_id);

-- migrate:down
DROP TABLE IF EXISTS todo_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS todos;
DROP TYPE IF EXISTS TODO_STATUS;
DROP TABLE IF EXISTS app_users;
