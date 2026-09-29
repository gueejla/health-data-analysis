CREATE TABLE import_jobs (
    id                UUID PRIMARY KEY,
    status            VARCHAR(32) NOT NULL,
    completed_at      TIMESTAMPTZ DEFAULT 0,
    error_message     TEXT,
    uploaded_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id           BIGINT NOT NULL UNIQUE REFERENCES users(id),
);

CREATE TABLE health_metrics (
    id                BIGSERIAL PRIMARY KEY,
    import_job_id     BIGSERIAL REFERENCES import_jobs(id),
    user_id           BIGINT NOT NULL REFERENCES users(id),
    metric_type       VARCHAR(64) NOT NULL,       -- 'heart_rate', 'step_count', 'sleep_stage'...
    source            VARCHAR(64),                     -- 'samsung_health', 'csv_import', ...
    measured_at       TIMESTAMPTZ NOT NULL,
    value             DOUBLE PRECISION,                 -- single numeric value
    attributes        JSONB,                       -- type-specific extras (sleep stages, GPS track ref)
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_health_metrics_import_job_id
    ON health_metrics(import_job_id);

CREATE INDEX idx_health_metrics_user_id
    ON health_metrics(user_id);

CREATE INDEX idx_import_job_user_id
    ON import_job(user_id);

CREATE INDEX idx_metrics_user_type_time ON health_metrics(user_id, metric_type, measured_at);
CREATE UNIQUE INDEX uq_metrics_natural ON health_metrics(user_id, import_job_id, metric_type, measured_at, attributes); -- idempotent re-imports
