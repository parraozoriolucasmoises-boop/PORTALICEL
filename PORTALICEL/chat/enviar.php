<?php

include "conexion.php";

if(isset($_POST["mensaje"])){

    $mensaje = trim($_POST["mensaje"]);

    if($mensaje != ""){

        $stmt = $conn->prepare("INSERT INTO mensajes (autor,mensaje) VALUES (?,?)");

        $autor = "usuario";

        $stmt->bind_param("ss",$autor,$mensaje);

        $stmt->execute();

        echo "ok";

    }

}

?>