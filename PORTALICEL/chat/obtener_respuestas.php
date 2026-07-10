<?php

require_once "conexion.php";

$id=(int)$_GET["id"];

$sql=$conexion->prepare(

"SELECT *

FROM mensajes

WHERE conversacion_id=?

AND autor='admin'

ORDER BY id"

);

$sql->bind_param(

"i",

$id

);

$sql->execute();

$resultado=$sql->get_result();

$respuestas=[];

while($fila=$resultado->fetch_assoc()){

$respuestas[]=$fila;

}

header("Content-Type:application/json");

echo json_encode($respuestas);

?>