CREATE TABLE orders(id SERIAL PRIMARY KEY, status VARCHAR(50), user_id INT REFERENCES users(id));
