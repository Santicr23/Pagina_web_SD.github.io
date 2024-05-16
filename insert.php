<?php
$servername = "localhost";
$username = "root";
$password = ""; // Este es el password que configuraste para tu base de datos
$dbname = "crud_example"; // Este es el nombre de la base de datos que creaste

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];

    $sql = "INSERT INTO usuarios (nombre, email) VALUES ('$name', '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "Usuario agregado correctamente";
    } else {
        echo "Error al agregar usuario: " . $conn->error;
    }
}

$conn->close();
?>
