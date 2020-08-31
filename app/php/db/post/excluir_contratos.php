<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$id_user=(mysqli_real_escape_string($con,$data->id_user));
$sql="DELETE FROM contratos_users WHERE ID_USER = '".$id_user."'";
$query=mysqli_query($con,$sql);
echo json_encode($sql);
?>