<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$usuario=mysqli_real_escape_string($con,$data->usuario);
$senha=mysqli_real_escape_string($con,$data->senha);
$senha=sha1($senha);
$sql="SELECT * FROM users WHERE usuario='$usuario'";
$query=mysqli_query($con,$sql);
$i = 0;
while($row=mysqli_fetch_assoc($query))
{
	$user = $row;
	$i++;
}

if($senha==$user['senha'])
{
	unset($user['senha']);
	echo json_encode($user);
}
?>