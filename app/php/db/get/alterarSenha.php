<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$usuario=mysqli_real_escape_string($con,$data->usuario);
$senha=mysqli_real_escape_string($con,$data->senha);
$senhan=mysqli_real_escape_string($con,$data->senhan);
$senha=sha1($senha);
$senhan=sha1($senhan);
$sql="SELECT usuario, senha FROM users WHERE id='$usuario'";
$query=mysqli_query($con,$sql);
$i = 0;
while($row=mysqli_fetch_assoc($query))
{
	$user = $row;
	$i++;
}


if($senha==$user['senha'] && $user['senha']!="")
{
	$up="UPDATE users  SET senha='$senhan' WHERE id='$usuario'";
	mysqli_query($con,$up);
	$status=1;
}
else
{
	$status=0;
}
 echo json_encode($status); 
?>