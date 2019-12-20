CREATE DATABASE monitoreodb;
USE monitoreodb;

CREATE TABLE clientes(
id INT(11) NOT NULL,
nombre VARCHAR(100) NOT NULL,
direccion VARCHAR(100),
telefono VARCHAR(10),
rubro VARCHAR(50),
fecha DATE
);

ALTER TABLE clientes
ADD PRIMARY KEY(id);

ALTER TABLE clientes
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE reportes (
id INT(11) NOT NULL,
cliente_id INT(11) NOT NULL,
modulo_ID INT(11) NOT NULL,
evento VARCHAR(256) NOT NULL,
fecha TIMESTAMP NOT NULL
);

ALTER TABLE reportes
ADD PRIMARY KEY(id);

ALTER TABLE reportes
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE reportes ADD CONSTRAINT fk_clientes FOREIGN KEY (cliente_id) references clientes(id);

CREATE TABLE modulos(
id INT(11) NOT NULL,
nombre VARCHAR(50) NOT NULL,
tipo VARCHAR(50) NOT NULL
);

ALTER TABLE modulos
ADD PRIMARY KEY(id);

ALTER TABLE modulos
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE cliente_modulo(
modulo_id INT(11) NOT NULL,
cliente_id INT(11) NOT NULL,
minimo FLOAT NOT NULL,
maximo FLOAT NOT NULL
);

ALTER TABLE cliente_modulo ADD CONSTRAINT fk_modulo1 FOREIGN KEY (modulo_id) references modulos(id);

ALTER TABLE cliente_modulo ADD CONSTRAINT fk_cliente1 FOREIGN KEY (cliente_id) references clientes(id);

ALTER TABLE cliente_modulo
ADD PRIMARY KEY(modulo_id, cliente_id);

CREATE TABLE users(
id INT(11) NOT NULL,
cliente_id INT(11),
fullname VARCHAR(100),
password VARCHAR(500) ,
username VARCHAR(100) ,
es_admin BOOLEAN ,
es_clientePrincipal BOOLEAN
);

ALTER TABLE users
ADD PRIMARY KEY(id);

ALTER TABLE users
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE users ADD CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) references clientes(id);



