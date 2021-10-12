CREATE TABLE "list"(
	id serial primary key, 
	name text, 
	task text, 
	complete text
	
);

INSERT INTO "list" (name, task) VALUES ('rachel', 'dishes');


UPDATE "list" SET complete=true WHERE id=37;