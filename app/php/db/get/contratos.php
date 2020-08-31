<?php
include '../conectS.php';

$sql="SELECT * FROM contratos";	
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
