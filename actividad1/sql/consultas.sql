--VISUALIZAR TODAS LAS PERSONAS--
SELECT * FROM PERSONA;

--VEAMOS A QUIEN LE PERTENCE CADA INSTALACION (GENERAL)--
SELECT PERSONA.nombre_apellidos, INSTALACION_FRIGORIFICA.nombre FROM PERSONA
INNER JOIN INSTALACION_FRIGORIFICA ON PERSONA.dni=INSTALACION_FRIGORIFICA.dni_duenyo;

--VEAMOS A QUIEN LE PERTENECES LA INSTALACION 'Almacen Dani camara 1'--
SELECT PERSONA.nombre_apellidos FROM PERSONA
INNER JOIN INSTALACION_FRIGORIFICA ON PERSONA.dni=INSTALACION_FRIGORIFICA.dni_duenyo
WHERE INSTALACION_FRIGORIFICA.nombre='Almacen Dani camara 1';

-- REVISAR EL EQUIPO Y NOMBRE DE EMPRESA DE UNA INSTALACION --
SELECT 
EQUIPO.marca_modelo, 
CLIENTE.nombre_empresa

FROM ((INSTALACION_FRIGORIFICA INNER JOIN EQUIPO ON EQUIPO.id_instalacion=INSTALACION_FRIGORIFICA.id_instalacion)
	 INNER JOIN CLIENTE ON CLIENTE.dni = INSTALACION_FRIGORIFICA.dni_duenyo
	 )
	 WHERE INSTALACION_FRIGORIFICA.nombre='Almacen Dani camara 1';

-- REVISAR EL EQUIPO DE UNA INSTALACION ASOCIADA A UNA REVISION ASOCIADA AL TECNICO 'EDGAR VIU' ID_TECNICO = 1 --
SELECT 
EQUIPO.marca_modelo,
EQUIPO.tipo
FROM(((EQUIPO INNER JOIN REVISION ON EQUIPO.id_instalacion=REVISION.id_instalacion)
	 INNER JOIN TECNICO ON REVISION.dni_tecnico  = TECNICO.dni)
	 INNER JOIN PERSONA ON PERSONA.dni  = TECNICO.dni)
	 WHERE PERSONA.nombre_apellidos='Edgar Viu';

-- FUNCION AGREGACION NUMERO DE REVISION POR TECNICO --
SELECT 
PERSONA.nombre_apellidos,
COUNT(REVISION.id_revision)
FROM REVISION INNER JOIN PERSONA ON REVISION.dni_tecnico = PERSONA.dni
GROUP BY PERSONA.dni;

--Nombre de instalación, nombre del tecnico, fecha de revisión.-- 

SELECT  
INSTALACION_FRIGORIFICA.nombre, 
PERSONA.nombre_apellidos, 
REVISION.fecha 
FROM 
((REVISION INNER JOIN INSTALACION_FRIGORIFICA ON REVISION.id_instalacion=INSTALACION_FRIGORIFICA.id_instalacion) 
INNER JOIN PERSONA ON REVISION.dni_tecnico=PERSONA.dni) 
WHERE REVISION.id_revision={numero de revision}; 
 
-- Equipo de la instalación -- 

SELECT  
EQUIPO.marca_modelo, 
EQUIPO.tipo 
FROM 
EQUIPO INNER JOIN REVISION ON EQUIPO.id_instalacion=REVISION.id_instalacion 
WHERE REVISION.id_revision= {numero de revision}; 
 
-- Revisiones y resultados -- 
SELECT  
TIPO_REVISION.explicacion, 
LINEA_REVISION.resultado 
FROM 
((LINEA_REVISION INNER JOIN REVISION ON LINEA_REVISION.id_revision=REVISION.id_revision) 
INNER JOIN TIPO_REVISION ON LINEA_REVISION.id_tipo_revision=TIPO_REVISION.id_tipo_revision) 
WHERE REVISION.id_revision= {numero de revision}; 
 
-- Validación de la revisión por parte del cliente, nombre del dueño -- 
SELECT  
REVISION.validacion, 
PERSONA.nombre_apellidos 
FROM 
((REVISION INNER JOIN INSTALACION_FRIGORIFICA ON INSTALACION_FRIGORIFICA.id_instalacion=REVISION.id_instalacion) 
INNER JOIN PERSONA ON INSTALACION_FRIGORIFICA.dni_duenyo=PERSONA.dni) 
WHERE REVISION.id_revision= {numero de revision}; 

-- Consulta de equipos por tipo de revisión --
SELECT * FROM equipo 
WHERE id_instalacion IN (SELECT id_instalacion 
						 FROM revision 
						 JOIN linea_revision ON revision.id_revision = linea_revision.id_revision
						 JOIN tipo_revision ON tipo_revision.id_tipo_revision = linea_revision.id_tipo_revision
						 WHERE tipo_revision.explicacion = 'Revision de evaporador');
					