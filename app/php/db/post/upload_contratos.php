<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$id_user=(mysqli_real_escape_string($con,$data->id_user));
$t = (mysqli_real_escape_string($con,$data->quantidade));

$sql="INSERT INTO contratos_users (id, ID_USER, PRECO_CONTRATO, MONTANTE_MENSAL, FLEXIBILIZACAO, SAZONALIZACAO) VALUES ";

for($i=0;$i<$t;$i++)
{
	
	$q=mysqli_real_escape_string($con,$data->id[$i]);
	$p=mysqli_real_escape_string($con,$data->preco_contrato[$i]);
	$m=mysqli_real_escape_string($con,$data->montante_mensal[$i]);
	$f=mysqli_real_escape_string($con,$data->flexibilizacao[$i]);
	$s=mysqli_real_escape_string($con,$data->sazonalizacao[$i]);
	if($i==0)
	{
		$sql=$sql."($q,$id_user,$p,$m,$f,$s)";
	}
	else
	{
		$sql=$sql.",($q,$id_user,$p,$m,$f,$s)";
	}
}
mysqli_query($con,$sql);
echo json_encode($sql);
?>
