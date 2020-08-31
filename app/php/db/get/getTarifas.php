<?php
include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$gmt=(mysqli_real_escape_string($con,$data->gmt));
$qtd=(mysqli_real_escape_string($con,$data->qtd));
$cEspecial=(mysqli_real_escape_string($con,$data->cEspecial));
$j=0;

$sql1="SELECT DATA, PIS,COFINS,TUSDd_P$gmt as TUSDd_P ,TE_P$gmt as TE_P ,TE_FP$gmt as TE_FP,TUSDd_FP$gmt as TUSDd_FP,TUSDe_P$gmt as TUSDe_P,TUSDe_FP$gmt as TUSDe_FP FROM valores_tarifas";

for($i=0;$i<$qtd;$i++)
{ 
	$date=(mysqli_real_escape_string($con,$data->date[$i]));
	$cp=(mysqli_real_escape_string($con,$data->cp[$i]));
	$cfp=(mysqli_real_escape_string($con,$data->cfp[$i]));
	$dcp=(mysqli_real_escape_string($con,$data->dcp[$i]));
	$dcfp=(mysqli_real_escape_string($con,$data->dcfp[$i]));
	$date=str_replace("/","-",$date);
	$date=$date.'-01';
	
	if($i!=($qtd-1))
	{
		$sql2=$sql2." DATA='$date' or ";
	}
	else
	{
		$sql2=$sql2." DATA='$date'";
	}
}
$sql=$sql1." WHERE".$sql2;

$query=mysqli_query($con,$sql);
while($row=mysqli_fetch_assoc($query))
{
	$array[$j] = $row;
	$j++;
}
echo  json_encode($array);
?>
