<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$usuario=mysqli_real_escape_string($con,$data->usuario);
$nome=mysqli_real_escape_string($con,$data->nome);
$sobrenome=mysqli_real_escape_string($con,$data->sobrenome);
$senha=mysqli_real_escape_string($con,$data->senha);
$email=mysqli_real_escape_string($con,$data->email);
$ocupacao=mysqli_real_escape_string($con,$data->ocupacao);
$instituicao=mysqli_real_escape_string($con,$data->instituicao);
$cargo=mysqli_real_escape_string($con,$data->cargo);

$senha=sha1($senha);
$sql="INSERT INTO users (usuario,nome,sobrenome,ocupacao,instituicao,cargo,senha,email) VALUES ('$usuario','$nome','$sobrenome','$ocupacao','$instituicao','$cargo','$senha','$email')";
mysqli_query($con,$sql);
echo $sql;

?>