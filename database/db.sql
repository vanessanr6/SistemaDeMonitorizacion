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

CREATE TABLE usuarios(
id INT(11) NOT NULL,
cliente_id INT(11) NOT NULL,
nombre VARCHAR(100) NOT NULL,
contrasenia VARCHAR(50) NOT NULL,
correo VARCHAR(100) NOT NULL,
es_admin BOOLEAN NOT NULL,
es_jefe BOOLEAN NOT NULL
);

ALTER TABLE usuarios
ADD PRIMARY KEY(id);

ALTER TABLE usuarios
MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE usuarios ADD CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) references clientes(id);



