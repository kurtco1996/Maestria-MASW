--BORRAR USUARIO--
DROP USER user_viu;

--CREAR USUARIO CONEXION PHP--
CREATE USER user_viu WITH PASSWORD '1234';
ALTER USER user_viu WITH SUPERUSER;

--INTRODUCIMOS PERSONAS--
INSERT INTO PERSONA(dni,nombre_apellidos) VALUES
('12334545H','Daniel Torres'),
('32143254A','Antonio Del Monte'),
('72737475F','Dwight Phillips'),
('12345678E','Edgar Viu'),
('87654321G','Georgiy Viu');

--EDITAMOS LOS DATOS DE PERSONA--
UPDATE PERSONA SET tlf = 654321123 WHERE nombre_apellidos = 'Georgiy Viu';
UPDATE PERSONA SET email = 'edgar_viu@gmail.com' WHERE nombre_apellidos = 'Edgar Viu';

--AÑADIMOS A LOS CLIENTES--
INSERT INTO CLIENTE(dni) VALUES 
('12334545H'),
('32143254A'),
('72737475F');

--A LOS TECNICOS--
INSERT INTO TECNICO(dni) VALUES 
('12345678E'),
('87654321G');

--LAS INSTALACIONES--
INSERT INTO INSTALACION_FRIGORIFICA(nombre,dni_duenyo,direccion) VALUES 
('Almacen Dani camara 1','12334545H','c/filipinas, almeria, s/n'),
('Consumibles Montes camara 2','32143254A','c/montes, valencia, 3'),
('Dunder Mifflin almacen','72737475F','c/krasinski, scranton, n5');

-- DEFINIMOS EQUIPO DE TIPO =('compresor','evaporador','condensador') --
INSERT INTO EQUIPO(marca_modelo,tipo,id_instalacion) VALUES
('BITZER 222',
 'compresor',1),
 ('BITZER 123',
 'compresor',3),
 ('ECO TCE 501',
 'evaporador',1),
 ('ECO TCE 501',
 'evaporador',1),
 ('ECO TCE 251',
 'evaporador',2),
 ('ECO TCE 251',
 'evaporador',3),
 ('KONDE 123',
 'condensador',1),
 ('KONDE 123',
 'condensador',2),
 ('KONDE 123',
 'condensador',3)
 ;

--DEFINIMOS TIPOS DE REVISIONES--
INSERT INTO TIPO_REVISION(explicacion) VALUES 
('Revision de condensador'),
('Revision de compresor'),
('Revision de evaporador'),
('Limpieza'),
('Revision presiones')
 ;

--PREPARAMOS UNA REVISION--
INSERT INTO REVISION(fecha,id_instalacion,dni_tecnico) VALUES
('2022-01-15',1,'12345678E');

--EL TECNICO REALIZA LA REVISION--
INSERT INTO LINEA_REVISION(id_tipo_revision,id_revision,resultado) VALUES
(1,1,'correcto'),
(3,1,'correcto'),
(4,1,'no aplica'),
(5,1,'correcto');

--SE VALIDA LA REVISION--
UPDATE REVISION SET validacion = TRUE WHERE id_revision= 1;

-- CREAMOS MAS DATOS DE REVISIONES --
INSERT INTO REVISION(fecha,id_instalacion,dni_tecnico) VALUES
('2022-01-15',1,'12345678E'),
('2022-01-23',2,'12345678E'),
('2022-01-28',3,'12345678E'),
('2022-02-05',3,'12345678E'),
('2022-03-09',2,'12345678E'),
('2022-03-12',2,'12345678E'),
('2022-03-15',1,'12345678E'),
('2022-04-01',3,'12345678E'),
('2022-04-10',1,'12345678E'),

('2022-01-18',3,'87654321G'),
('2022-01-21',3,'87654321G'),
('2022-01-30',1,'87654321G'),
('2022-02-03',2,'87654321G'),
('2022-02-10',1,'87654321G'),
('2022-02-27',3,'87654321G'),
('2022-02-24',1,'87654321G'),
('2022-03-03',2,'87654321G'),
('2022-03-15',3,'87654321G'),
('2022-03-20',2,'87654321G');

--EL TECNICO REALIZA LA REVISION--
INSERT INTO LINEA_REVISION(id_tipo_revision,id_revision,resultado) VALUES
(1,2,'correcto'),
(2,2,'incorrecto'),
(3,2,'no revisado'),
(4,2,'no aplica'),
(5,2,'correcto'),

(1,3,'correcto'),
(2,3,'incorrecto'),
(3,3,'correcto'),
(4,3,'correcto'),
(5,3,'correcto'),

(1,4,'correcto'),
(2,4,'correcto'),
(3,4,'correcto'),
(4,4,'correcto'),
(5,4,'correcto'),

(1,5,'correcto'),
(2,5,'incorrecto'),
(3,5,'no revisado'),
(4,5,'no aplica'),
(5,5,'correcto'),

(1,6,'correcto'),
(2,6,'correcto'),
(3,6,'correcto'),
(4,6,'correcto'),
(5,6,'correcto'),

(1,7,'correcto'),
(2,7,'correcto'),
(3,7,'correcto'),
(4,7,'correcto'),
(5,7,'correcto'),

(1,8,'correcto'),
(2,8,'incorrecto'),
(3,8,'incorrecto'),
(4,8,'incorrecto'),
(5,8,'correcto'),

(1,9,'correcto'),
(2,9,'incorrecto'),
(3,9,'no revisado'),
(4,9,'correcto'),
(5,9,'correcto'),

(1,10,'correcto'),
(2,10,'no aplica'),
(3,10,'correcto'),
(4,10,'no aplica'),
(5,10,'correcto'),

(1,11,'correcto'),
(2,11,'incorrecto'),
(3,11,'no revisado'),
(4,11,'correcto'),
(5,11,'no aplica'),

(1,12,'correcto'),
(2,12,'correcto'),
(3,12,'correcto'),
(4,12,'correcto'),
(5,12,'correcto'),

(1,13,'correcto'),
(2,13,'incorrecto'),
(4,13,'correcto'),
(5,13,'correcto')
;