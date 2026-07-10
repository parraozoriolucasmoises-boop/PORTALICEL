<?php

require_once "conexion.php";

$id=(int)$_POST["id"];

$mensaje=trim($_POST["mensaje"]);

$sql=$conexion->prepare(

"INSERT INTO mensajes(

conversacion_id,

autor,

mensaje

)

VALUES(

?,

'admin',

?

)"

);

$sql->bind_param(

"is",

$id,

$mensaje

);

$sql->execute();

echo "OK";

?>