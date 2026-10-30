/*
--Généré par LOOPING : 

CREATE TABLE MONITORING_NOTE(
   PRIMARY KEY(created_at),
   created_at DATE,
   title VARCHAR(50),
   date_note DATE,
   content_note VARCHAR(400),
   iso_code VARCHAR(2)
   
);
*/


CREATE TABLE MONITORING_NOTE (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    created_at TIMESTAMP NOT NULL UNIQUE,  
    title VARCHAR(255) NOT NULL,
    date_note DATE NOT NULL,
    content_note VARCHAR(10000) NOT NULL,
    iso_code CHAR(2) NOT NULL
);

