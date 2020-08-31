<?php
header('Content-Type: text/html; charset=utf-8');
$con = mysqli_connect("127.0.0.1", "user", "senha", "PortifolioContratos");
mysqli_query("SET NAMES 'utf8'");
mysqli_query('SET character_set_connection=utf8');
mysqli_query('SET character_set_client=utf8');
mysqli_query('SET character_set_results=utf8');

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
