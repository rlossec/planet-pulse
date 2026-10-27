CREATE TABLE MONITORING_NOTE (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    created_at TIMESTAMP NOT NULL UNIQUE,  
    title VARCHAR(255) NOT NULL,
    date_note DATE NOT NULL,
    content_note VARCHAR(10000) NOT NULL,
    iso_code CHAR(2) NOT NULL

    CONSTRAINT pk_monitoring_note PRIMARY KEY (id),
    CONSTRAINT uk_monitoring_note UNIQUE (created_at),
    CONSTRAINT fk_monitoring_note_country FOREIGN KEY (iso_code_2) REFERENCES t_countries (iso_code_2)
);
