<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$mod=(mysqli_real_escape_string($con,$data->mod));
$mediaC=(mysqli_real_escape_string($con,$data->mediaC));
$F=(mysqli_real_escape_string($con,$data->F));
if ($mod==3)
{
	$id_user=(mysqli_real_escape_string($con,$data->id_user));
	$sql="SELECT id,PRECO_CONTRATO, MONTANTE_MENSAL, FLEXIBILIZACAO, SAZONALIZACAO FROM contratos_users WHERE  ID_USER = '$id_user'";
}
else if($mod==2)
{
	$sql="SELECT * FROM contratos";
}
else
{
	$sql="SELECT * FROM contratos_r";
}
 
$query=mysqli_query($con,$sql);
$array = array();
$i = 0;
while($row=mysqli_fetch_assoc($query))
{
	if($row['MONTANTE_MENSAL'] > $mediaC){
		$row['MONTANTE_MENSAL']=$row['MONTANTE_MENSAL']*$F;
	}
	$string.=$row['id'].",".$row['PRECO_CONTRATO'].",".$row['MONTANTE_MENSAL'].",".$row['FLEXIBILIZACAO'].",".$row['SAZONALIZACAO']."; \n";
}

$myfile = fopen("../../../../../api/functions/APLOC/portfolio.txt", "w") or die("Unable to open file!");
fwrite($myfile, $string);
fclose($myfile);

?>