-- migrate:up
CREATE TABLE account_profiles (
    profile_id SERIAL PRIMARY KEY,
    username VARCHAR(32),
    email VARCHAR(64) UNIQUE NOT NULL,
    pwd TEXT NOT NULL
);

CREATE TABLE app_users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    display_name VARCHAR(64) NOT NULL,
    profile_id INTEGER REFERENCES account_profiles NOT NULL
);

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(128),
    body TEXT,
    user_id INTEGER REFERENCES app_users
);

CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    label VARCHAR(32) NOT NULL,
    user_id INTEGER REFERENCES app_users NOT NULL,
    UNIQUE (user_id, label)
);

CREATE TABLE todo_tags (
    todo_id INTEGER REFERENCES todos,
    tag_id INTEGER REFERENCES tags,
    PRIMARY KEY (todo_id, tag_id)
);

-- migrate:down
DROP TABLE IF EXISTS todo_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS app_users;
DROP TABLE IF EXISTS account_profiles;
