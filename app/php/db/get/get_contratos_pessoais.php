<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$id_user=(mysqli_real_escape_string($con,$data->id_user));
$sql="SELECT id, PRECO_CONTRATO, MONTANTE_MENSAL, FLEXIBILIZACAO, SAZONALIZACAO FROM contratos_users WHERE  ID_USER = '".$id_user."'";

$query=mysqli_query($con,$sql);
$array = array();
$i = 0;
while($row=mysqli_fetch_assoc($query))
{
	$array[$i] = $row;
	$i++;
}

echo json_encode($array);
?>
