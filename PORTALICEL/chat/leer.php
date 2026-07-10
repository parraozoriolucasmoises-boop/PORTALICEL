<?php

include("conexion.php");

$sql = "SELECT * FROM chat
        ORDER BY id ASC";

$resultado = $conexion->query($sql);

while($fila = $resultado->fetch_assoc()){

?>

<div class="message user">

<?= htmlspecialchars($fila["mensaje"]) ?>

<div class="time">

<?= date("H:i",strtotime($fila["fecha"])) ?>

</div>

</div>

<?php

}

?>