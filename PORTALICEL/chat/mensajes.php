<?php

include "conexion.php";

$sql = "SELECT * FROM mensajes ORDER BY id ASC";

$resultado = $conn->query($sql);

while($fila = $resultado->fetch_assoc()){

?>

<div class="message <?php echo $fila["autor"]; ?>">

    <?php echo htmlspecialchars($fila["mensaje"]); ?>

</div>

<?php

}

?>