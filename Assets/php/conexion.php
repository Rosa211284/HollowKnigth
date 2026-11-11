<?php

header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 0);
error_reporting(0);

$servidor = "localhost";
$usuario = "root";
$password = "";
$basedatos = "sistema_hash";

$conn = new mysqli(
    $servidor,
    $usuario,
    $password,
    $basedatos
);


if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => $conn->connect_error
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido"
    ]);
    exit;
}

$nombre = trim($_POST["nombre"] ?? "");
$contra = ($_POST["contra"] ?? "");
$correo = trim($_POST["correo"] ?? "");

if ($nombre === "" || $contra === "" || $correo === "") {

    echo json_encode([
        "status" => "error",
        "message" => "Todos los campos son obligatorios"
    ]);

    exit;
}

$contra_hash = password_hash($contra, PASSWORD_DEFAULT);

$sql = "INSERT INTO contacto(nombre, contra, correo) VALUES (?, ?, ?)";

$statement = $conn->prepare($sql);


if (!$statement) {

    echo json_encode([
        "status" => "error",
        "message" => "Falla en la consulta SQL"
    ]);

    exit;
}


$statement->bind_param(
    "sss",
    $nombre,
    $contra_hash,
    $correo
);


if ($statement->execute()) {

    echo json_encode([
        "status" => "success",
        "message" => "Datos enviados correctamente"
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "No se pudo enviar el mensaje"
    ]);
}


$statement->close();
$conn->close();

?>