<?php
/*1. phpinfo(); //mysqli
2. Instal.lar servidor MySQL
	phpmyadmin-ctl install
3. prova_bd.php*/
				$host = "127.0.0.1";
    		$user = "daurgil";
    		$pass = "";
    		$db = "shop_daurgil";
    		$port = 3306;
    		$tabla="products";

    		$conexion = mysqli_connect($host, $user, $pass, $db, $port) or die(mysql_error());
				/*$sql = "create database shop";
				$res = mysqli_query($conexion, $sql);
				print_r($res);

				$sql = "use shop";
				$res = mysqli_query($conexion, $sql);
				print_r($res);*/

				$sql = "INSERT INTO products(name, ident, description, quantity,"
	                . " price, colors, gender, country, province, location,"
									." date_reception, date_expiration, img_icon) VALUES ('Ultramil', '123546', 'sfdbsg',"
	                . " '3', '12', 'azul', 'hombre', 'españa', 'murcia', 'olleria',"
									." '21/02/2015', '25/02/2015', 'avatar.png')";
				$res = mysqli_query($conexion, $sql);
				print_r($res);

				/*$sql = "select * from mensajes";
				$result = mysqli_query($conexion, $sql);
				while ($row = mysqli_fetch_assoc($result)) {
	        		$cad .= "Nombre: " . $row['nombre'] . " Email: " . $row['email']. "<br>";
	        		$cad .= "Asunto: " . $row['asunto'] . " Msje: " . $row['mensaje']. "<br>";
	    		}*/
				//mysqli_close($conexion);
				//print_r($cad);
