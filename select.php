
<?php
$servername = "localhost";
$username = "root";
$password = ""; // Este es el password que configuraste para tu base de datos
$dbname = "crud_example"; // Este es el nombre de la base de datos que creaste

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
