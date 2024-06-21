CREATE DATABASE todo_app;

CREATE TABLE account_profiles (
  profile_id SERIAL PRIMARY KEY,
  username VARCHAR(32),
  email VARCHAR(64) UNIQUE NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE "app_users" (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(64) NOT NULL,
  last_name VARCHAR(64) NOT NULL,
  display_name VARCHAR(64) NOT NULL,
  profile_id REFERENCES account - profiles NOT NULL
);

CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(128),
  "body" TEXT,
  user_id REFERENCES app_users
);

CREATE TABLE tags (
  tag_id SERIAL PRIMARY KEY,
  "label" VARCHAR(32) NOT NULL,
  user_id REFERENCES app_users NOT NULL,
  UNIQUE (user_id, "label")
);

CREATE TABLE todo_tags (
  todo_id REFERENCES todos,
  tag_id REFERENCES tags,
  PRIMARY KEY (todo_id, tag_id)
);
