ALTER TABLE users
    RENAME COLUMN email TO username;

ALTER TABLE users
    DROP COLUMN name;

ALTER TABLE users
    ADD COLUMN password VARCHAR(255);

ALTER TABLE users
    ALTER COLUMN username TYPE VARCHAR(100);
