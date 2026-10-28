CREATE TABLE t_monitoring_notes (
    monitoring_note_id INTEGER GENERATED ALWAYS AS IDENTITY, 
    created_at TIMESTAMP NOT NULL UNIQUE,  
    title VARCHAR(255) NOT NULL,
    date_note DATE NOT NULL,
    content_note VARCHAR(10000) NOT NULL,
    country_id INTEGER NOT NULL
    
    CONSTRAINT pk_t_monitoring_notes PRIMARY KEY (monitoring_notes_id),
    CONSTRAINT uk_t_monitoring_notes UNIQUE (created_at),
    CONSTRAINT fk_t_monitoring_notes_country FOREIGN KEY (country_id) REFERENCES t_countries (country_id)
);
