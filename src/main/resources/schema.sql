CREATE table IF NOT EXISTS clips (
	id INT PRIMARY KEY AUTO_INCREMENT,
	owner VARCHAR(30),
	content VARCHAR(3000),
	left INT,
	top INT,
	width INT,
	height INT,
	color VARCHAR(30)
);