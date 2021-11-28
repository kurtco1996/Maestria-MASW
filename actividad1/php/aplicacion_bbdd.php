<?php

    // Nota: El c�digo HTML est� "incrustado" en el c�digo PHP
	
	// ------------ CONEXI�N -------------------------------------------------------------------
	// Sustituir por la cadena de conexi�n de local y de la nube, seg�n el caso
    // Datos de la cadena de conexi�n
    $maquina = "localhost"; // cambiar por localhost si local o la m�quina que indica ElephantSQL si la nube
    $puerto = "5432";
    $bbdd = "FrigoVIU"; // cambiar por tu bbdd
    $usuario = "user_viu"; // cambiar por tu usuario
    $contrasenya = "1234"; // cambiar por tu contrase�a

    // Usar utf8_encode para que se muestren bien los caracteres con acentos y e�es (codifica un string ISO-8859-1 a UTF-8)
    // Establecer la conexi�n a bbdd PostgreSQL
    $conexion = pg_connect("host=$maquina port=$puerto dbname=$bbdd user=$usuario password=$contrasenya");

    // Estado de la conexi�n
    if(!$conexion) {
        echo utf8_encode("Error: No se ha podido realizar la conexi�n.");
        exit;
    }

	// ------------ CONSULTAS -------------------------------------------------------------------
    $n_revision_txt = $_POST['campo1'];
    echo "REVISION NUMERO {$n_revision_txt}<p>";

    //<<<a�adir consultaJOIN1>>>
    // Consulta JOIN 1
    function consulta_join1($conexion,$n_revision_txt) {
        // Realizar una consulta SQL
        $consulta = "SELECT INSTALACION_FRIGORIFICA.nombre,PERSONA.nombre_apellidos,REVISION.fecha FROM ((REVISION INNER JOIN INSTALACION_FRIGORIFICA ON REVISION.id_instalacion=INSTALACION_FRIGORIFICA.id_instalacion) INNER JOIN PERSONA ON REVISION.dni_tecnico=PERSONA.dni) WHERE REVISION.id_revision={$n_revision_txt};"; // Cambiar por vuestra SELECT
	    $resultado = pg_query($conexion, $consulta);
		
		// Comprobar resultado de la consulta
        if (!$resultado) {
            echo utf8_encode("No se ha podido realizar la consulta join 1, error: ").pg_last_error();
            exit;
        }

        // Comprobar que devuelve la consulta
        if (pg_num_rows($resultado) == 0) { // La consulta no tiene ninguna fila
            echo utf8_encode("No se encontr� ninguna fila que coincida con la consulta join 1.");
        }
        else {
			//<<<mostrar consultaJOIN1>>>
            echo "DATOS GENERALES<br/>";
            echo "===================<p>";
			// Mostrar los datos de la consulta
            while ($fila = pg_fetch_row($resultado)) { 
			    // A�adir todos los campos que se quieran mostrar $fila[0] para primer campo, $fila[1] para segundo campo, $fila[2] para tercer campo, ...
                echo "Nombre de instalación: $fila[0], nombre del tecnico: $fila[1], fecha de revisión: $fila[2] "; 
                echo "<br /><p>";
            }
	        

        }
		// Liberar los resultados
        pg_free_result($resultado);
	}
    // Realizar consultajoin1
    consulta_join1($conexion,$n_revision_txt);	
	//<<<a�adir consultaJOIN1>>>
	
	//<<<a�adir consultaJOIN2>>>
    // Consulta JOIN 2
    function consulta_join2($conexion,$n_revision_txt) {
        // Realizar una consulta SQL
        $consulta = "SELECT EQUIPO.marca_modelo,EQUIPO.tipo FROM EQUIPO INNER JOIN REVISION ON EQUIPO.id_instalacion=REVISION.id_instalacion WHERE REVISION.id_revision={$n_revision_txt};"; // Cambiar por vuestra SELECT
        $resultado = pg_query($conexion, $consulta);
		
		// Comprobar resultado de la consulta
        if (!$resultado) {
            echo utf8_encode("No se ha podido realizar la consulta join 2, error: ").pg_last_error();
            exit;
        }

        // Comprobar que devuelve la consulta
        if (pg_num_rows($resultado) == 0) { // La consulta no tiene ninguna fila
            echo utf8_encode("No se encontr� ninguna fila que coincida con la consulta join 2.");
        }
        else {
			//<<<a�adir mostrar consultaJOIN2>>>
            echo "EQUIPO:<br/>";
	        echo "===================<p/>";
	        echo "<p>";
			// Mostrar los datos de la consulta
            while ($fila = pg_fetch_row($resultado)) { 
			    // A�adir todos los campos que se quieran mostrar $fila[0] para primer campo, $fila[1] para segundo campo, $fila[2] para tercer campo, ...
                echo "Marca y modelo: $fila[0],  Tipo de equipo: $fila[1]"; 
                echo "<br />\n";
            }
	        echo "===================<p/>";
			//<<<a�adir mostrar consultaJOIN2>>>
        }
		
		// Liberar los resultados
        pg_free_result($resultado);
	}
    // Realizar consultajoin2
    consulta_join2($conexion,$n_revision_txt);	
	//<<<a�adir consultaJOIN2>>>
	
	
    //<<<a�adir consultaAGREGADA1>>>
    // Consulta AGREGADA 1
    function consulta_agregada1($conexion,$n_revision_txt) {
        // Realizar una consulta SQL
        $consulta = "SELECT TIPO_REVISION.explicacion,LINEA_REVISION.resultado FROM ((LINEA_REVISION INNER JOIN REVISION ON LINEA_REVISION.id_revision=REVISION.id_revision) INNER JOIN TIPO_REVISION ON LINEA_REVISION.id_tipo_revision=TIPO_REVISION.id_tipo_revision) WHERE REVISION.id_revision={$n_revision_txt}; "; // Cambiar por vuestra SELECT
        $resultado = pg_query($conexion, $consulta);
		
		// Comprobar resultado de la consulta
        if (!$resultado) {
            echo utf8_encode("No se ha podido realizar la consulta agregada 1, error: ").pg_last_error();
            exit;
        }

        // Comprobar que devuelve la consulta
        if (pg_num_rows($resultado) == 0) { // La consulta no tiene ninguna fila
            echo utf8_encode("No se encontr� ninguna fila que coincida con la consulta agregada 1.");
        }
        else {
			//<<<a�adir mostrar AGREGADA1>>>
	        echo "<p>===========<br/>";
            echo "REVISIONES: <br/>";
	        echo "===========<p/>";
	        echo "<p>";
			// Mostrar los datos de la consulta
            while ($fila = pg_fetch_row($resultado)) { 
			    // A�adir todos los campos que se quieran mostrar $fila[0] para primer campo, $fila[1] para segundo campo, $fila[2] para tercer campo, ...
                echo "Revision: $fila[0]; Resultado: $fila[1]"; 
                echo "<br />\n";
            }
	        echo "===================<p/>";
			//<<<a�adir mostrar consultaAGREGADA1>>>
        }
		
		// Liberar los resultados
        pg_free_result($resultado);
	}
    // Realizar consultaAGREGADA1
    consulta_agregada1($conexion,$n_revision_txt);	
	////<<<a�adir consultaAGREGADA1>>>
	
	//<<<a�adir consultaAGREGADA2>>>
    // Consulta AGREGADA 2
    function consulta_agregada2($conexion,$n_revision_txt) {
        // Realizar una consulta SQL
        $consulta = "SELECT REVISION.validacion, PERSONA.nombre_apellidos FROM ((REVISION INNER JOIN INSTALACION_FRIGORIFICA ON INSTALACION_FRIGORIFICA.id_instalacion=REVISION.id_instalacion) INNER JOIN PERSONA ON INSTALACION_FRIGORIFICA.dni_duenyo=PERSONA.dni) WHERE REVISION.id_revision={$n_revision_txt}; "; // Cambiar por vuestra SELECT
        $resultado = pg_query($conexion, $consulta);
		
		// Comprobar resultado de la consulta
        if (!$resultado) {
            echo utf8_encode("No se ha podido realizar la consulta agregada 2, error: ").pg_last_error();
            exit;
        }

        // Comprobar que devuelve la consulta
        if (pg_num_rows($resultado) == 0) { // La consulta no tiene ninguna fila
            echo utf8_encode("No se encontr� ninguna fila que coincida con la consulta agregada 2.");
        }
        else {
			//<<<a�adir mostrar consultaAGREGADA2>>>
	        echo "<p>===================<br/>";
            echo "VALIDACION<br/>";
	        echo "===================<p/>";
	        echo "<p>";
			// Mostrar los datos de la consulta
            while ($fila = pg_fetch_row($resultado)) { 
			    // A�adir todos los campos que se quieran mostrar $fila[0] para primer campo, $fila[1] para segundo campo, $fila[2] para tercer campo, ...
                if ($fila[0]=='t'){
                    echo "Validada por $fila[1] "; 
                }
                else{
                    echo "No validada"; 
                }
                
                echo "<br />\n";
            }
	        echo "===================<p/>";
			//<<<a�adir mostrar consultaAGREGADA2>>>
        }

		// Liberar los resultados
        pg_free_result($resultado);
	}
	// Realizar consultaAGREGADA2
    consulta_agregada2($conexion,$n_revision_txt);	
	////<<<a�adir consultaAGREGADA2>>>

    // Cerrar la conexi�n
    pg_close($conexion);

?>