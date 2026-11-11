<?php

header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "sistema_hash"
);

$nombre = $_POST["nombre"] ?? "";
$contra = $_POST["contra"] ?? "";


$sql = "SELECT contra FROM contacto WHERE nombre = ?";
$statement = $conn->prepare($sql);
$statement->bind_param("s", $nombre);
$statement->execute();
$statement->bind_result($contra_hash);


/*-----------------------Verificar------------------------- */

if ($statement->fetch()) {

    if (password_verify($contra, $contra_hash)) {

        echo json_encode([
            "status" => "success",
            "message" => "Inicio de sesión correcto"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Contraseña incorrecta"
        ]);
    }

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Usuario no encontrado"
    ]);
}


$statement->close();
$conn->close();

?>