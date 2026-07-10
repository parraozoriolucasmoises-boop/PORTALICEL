<?php

include("conexion.php");

if(isset($_POST["mensaje"])){

    $nombre = "Visitante";

    $mensaje = trim($_POST["mensaje"]);

    if($mensaje != ""){

        $sql = "INSERT INTO chat(nombre,mensaje)
                VALUES(?,?)";

        $stmt = $conexion->prepare($sql);

        $stmt->bind_param("ss",$nombre,$mensaje);

        $stmt->execute();

        echo "ok";

    }

}

?>