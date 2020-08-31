<?php
include 'conectS.php';
$data=json_decode(file_get_contents("php://input"));
$nome=mysqli_real_escape_string($con,$data->nome);
$email=mysqli_real_escape_string($con,$data->email);
$assunto=mysqli_real_escape_string($con,$data->assunto);
$mensagem=mysqli_real_escape_string($con,$data->mensagem);


// Inclui o arquivo class.phpmailer.php localizado na pasta class
require_once("phpmailer/class.phpmailer.php");

// Inicia a classe PHPMailer
$mail = new PHPMailer(true);

// Define os dados do servidor e tipo de conexão
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->IsSMTP(); // Define que a mensagem será SMTP

try {
    //Server settings
    $mail->SMTPDebug = 1;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'gese.energia@gmail.com';                 // SMTP username
    $mail->Password = 'senha';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($email, $nome);
    $mail->addAddress('matheus.marques_96@hotmail.com');     // Add a recipient
    $mail->addAddress('werik-1998@hotmail.com'); 
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $assunto;
    $mail->Body    = $mensagem;
    $mail->AltBody = $mensagem;

    $enviado=$mail->send();

} catch (Exception $e) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
}
if ($enviado) {
	echo "E-mail enviado com sucesso!";
}
?>
