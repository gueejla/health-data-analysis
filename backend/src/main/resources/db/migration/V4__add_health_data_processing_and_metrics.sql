ALTER TABLE health_data
    ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    ADD COLUMN processing_completed_at TIMESTAMPTZ,
    ADD COLUMN error_message TEXT;

CREATE TABLE health_metrics (
    id           BIGSERIAL PRIMARY KEY,
    health_data_id BIGINT NOT NULL REFERENCES health_data(id) ON DELETE CASCADE,
    metric_type  VARCHAR(64) NOT NULL,
    source       VARCHAR(64),
    measured_at  TIMESTAMPTZ NOT NULL,
    value        DOUBLE PRECISION,
    attributes   JSONB,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_health_metrics_health_data_id
    ON health_metrics(health_data_id);
