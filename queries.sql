CREATE TABLE courses (
	id SERIAL PRIMARY KEY,
	course_no VARCHAR(10) NOT NULL,
	course_name TEXT NOT NULL,
	prof_name TEXT NOT NULL,
	course_year CHAR(7) NOT NULL,
	semester CHAR(4) NOT NULL
);

CREATE TABLE resources (
	id SERIAL PRIMARY KEY,
	course_id INT REFERENCES courses(id) ON DELETE CASCADE,
	resource_type VARCHAR(20) NOT NULL,
	resource_no INT NOT NULL,
	resource_link TEXT NOT NULL
);