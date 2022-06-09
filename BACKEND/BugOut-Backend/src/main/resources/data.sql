INSERT INTO USER (id, username, email, password)
VALUES (1, 'admin', 'admin@bugout.com', '$2a$12$WjZecBpzwAvO1oRPTYypcuzjLDog94OW/YRHn4L86OSyT8l38bpYO');
INSERT INTO USER (id, username, email, password)
VALUES (NEXTVAL('USER_SEQUENCE'), 'Jesse Macias', 'jesse.macias@gmail.com', '$2a$12$enImRgCTe8Q0y/jRpY94ie8jch8vhOnZneA5Fv7Ek6U5ODExUQHBC');



INSERT INTO TRACK (id, title) VALUES (NEXTVAL('TRACK_SEQUENCE'), 'BACKLOG');
INSERT INTO TRACK (id, title) VALUES (NEXTVAL('TRACK_SEQUENCE'), 'TODO');
INSERT INTO TRACK (id, title) VALUES (NEXTVAL('TRACK_SEQUENCE'), 'DOING');
INSERT INTO TRACK (id, title) VALUES (NEXTVAL('TRACK_SEQUENCE'), 'DONE');
INSERT INTO TRACK (id, title) VALUES (NEXTVAL('TRACK_SEQUENCE'), 'CLOSED');



INSERT INTO BUG (id, title, description, FK_TRACK, FK_ASSIGNED_TO)
VALUES (NEXTVAL('BUG_SEQUENCE'), 'Application crashing on startup!',
        'If I''ve been using the computer for too long and try to startup the application, it crashes!', 3, 2);
