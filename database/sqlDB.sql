CREATE DATABASE mydb;

USE DATABASE mydb;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    message TEXT,
    service VARCHAR(50)
);

CREATE TABLE user_summary (
    user_id VARCHAR(255) PRIMARY KEY,
    total_messages INTEGER
);