<?php

$servidor = "localhost";
$usuario = "root";
$contrasena = "";
$basedatos = "icel_chat";

$conexion = new mysqli($servidor, $usuario, $contrasena, $basedatos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");

?>