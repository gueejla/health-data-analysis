CREATE TABLE health_data (
    id          BIGSERIAL PRIMARY KEY,
    raw_csv     BYTEA      NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id     BIGINT     NOT NULL UNIQUE REFERENCES users(id)
);
