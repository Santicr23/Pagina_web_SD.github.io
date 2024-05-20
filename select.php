
<?php
$servername = "localhost";
$username = "id22185156_root";
$password = "nicasvcr12/asD"; 
$dbname = "id22185156_registro_usuarios";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);
$users = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = array("name" => $row["nombre"], "email" => $row["email"]);
    }
}

echo json_encode($users);

$conn->close();
?>
