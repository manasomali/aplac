<?php

include '../conectS.php';
$data=json_decode(file_get_contents("php://input"));
$tempoDP=$usuario=mysqli_real_escape_string($con,$data->tempoDeProcessamento);
$nome=mysqli_real_escape_string($con,$data->nome);
$t1=mysqli_real_escape_string($con,$data->texto);
$port=mysqli_real_escape_string($con,$data->port);
$sobrenome=mysqli_real_escape_string($con,$data->sobrenome);
$horizonte=mysqli_real_escape_string($con,$data->horizonte);
$gmt=mysqli_real_escape_string($con,$data->gmt);
$cEsp=mysqli_real_escape_string($con,$data->cEsp);
$mediaPI=mysqli_real_escape_string($con,$data->mediapi);
$mediaPreco=mysqli_real_escape_string($con,$data->mediapreco);
$somatorioSC=mysqli_real_escape_string($con,$data->somatoriosc);
$somatorioflexi=mysqli_real_escape_string($con,$data->somatorioflexi);
$somatoriopld=mysqli_real_escape_string($con,$data->somatoriopld);
$somatoriocontratado=mysqli_real_escape_string($con,$data->somatoriocontratado);
$porcentagemsobrecontratado=mysqli_real_escape_string($con,$data->porcentagemsobrecontratado);
$porcentagemexposto=mysqli_real_escape_string($con,$data->porcentagemexposto);
$qntContratos=mysqli_real_escape_string($con,$data->qtdCnt);
$idcontratos=mysqli_real_escape_string($con,$data->idcontratos);
$sazocontratos=mysqli_real_escape_string($con,$data->sazocontratos);
$flexcontratos=mysqli_real_escape_string($con,$data->flexcontratos);
$sazoeflex=mysqli_real_escape_string($con,$data->sazoeflex);
$id=mysqli_real_escape_string($con,$data->id);
$g1=mysqli_real_escape_string($con,$data->g1);
$g2=mysqli_real_escape_string($con,$data->g2);
$g3=mysqli_real_escape_string($con,$data->g3);
$g4=mysqli_real_escape_string($con,$data->g4);
$g5=mysqli_real_escape_string($con,$data->g5);

$tempoprocessamento=mysqli_real_escape_string($con,$data->tempoprocessamento);
$funcaomin=mysqli_real_escape_string($con,$data->funcaomin);

$mediaPI = (float)$mediaPI;
$mediaPI = number_format($mediaPI,2,',','.');
$mediaPI = (string)$mediaPI;
$mediaPreco = (float)$mediaPreco;
$mediaPreco = number_format($mediaPreco,2,',','.');
$mediaPreco = (string)$mediaPreco;
$somatorioSC = (float)$somatorioSC;
$somatorioSC = number_format($somatorioSC,3,',','.');
$somatorioSC = (string)$somatorioSC;
$somatorioflexi = (float)$somatorioflexi;
$somatorioflexi = number_format($somatorioflexi,3,',','.');
$somatorioflexi = (string)$somatorioflexi;
$somatoriopld = (float)$somatoriopld;
$somatoriopld = number_format($somatoriopld,3,',','.');
$somatoriopld = (string)$somatoriopld;
$somatoriocontratado = (float)$somatoriocontratado;
$somatoriocontratado = number_format($somatoriocontratado,3,',','.');
$somatoriocontratado = (string)$somatoriocontratado;
$porcentagemsobrecontratado = (float)$porcentagemsobrecontratado;
$porcentagemsobrecontratado = number_format($porcentagemsobrecontratado,2,',','.');
$porcentagemsobrecontratado = (string)$porcentagemsobrecontratado;
$porcentagemexposto = (float)$porcentagemexposto;
$porcentagemexposto = number_format($porcentagemexposto,2,',','.');
$porcentagemexposto = (string)$porcentagemexposto;
$tempoprocessamento = (float)$tempoprocessamento;
$tempoprocessamento = number_format($tempoprocessamento,2,',','.');
$tempoprocessamento = (string)$tempoprocessamento;
$funcaomin = (float)$funcaomin;
$funcaomin = number_format($funcaomin,2,',','.');
$funcaomin = (string)$funcaomin;


if($mediaPI==0)
{
	$situacaoOt="Indeterminada";
}
else if($mediaPI>$mediaPreco)
{
	$situacaoOt="Vantajosa";
}
else if ($mediaPI<$mediaPreco)
{
	$situacaoOt="Não Vantajosa";
}
else
{
	$situacaoOt="Indeterminada";
}
if($cEsp==1)
{
	$cEsp="Sim";
}else
{
	$cEsp="Não";
}
$gmt=str_replace('_',' ',$gmt);

if($port=="1")
{$qtsC=299;
$portV="I";}
else
{$qtsC=200;
$portV="II";}
$contratosUtilizados=round((($qntContratos*100)/$qtsC),2);


//unlink('C:/xampp/htdocs/aplac/app/arqTemp/pdf/relatorio'.$id.'.pdf');
unlink('/var/www/consumidorlivre/aplac/app/arqTemp/pdf/relatorio'.$id.'.pdf');
//$html=(mysqli_real_escape_string($con,$data->html));
$css = file_get_contents('../../../css/table.css');

$html='<div style="background: url(https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/imgs/fundo.png) 	 no-repeat fixed center">
	<div class="container">
		<div class="row" style="margin-top:10px; padding-left:10px; padding-right:10px;">
			<h1> Aplicativo para Alocação de Contratos (APLAC)</h1>
			<p align="center">
				O presente relatório ilustra o melhor cenário de contratação no ambiente livre (ACL) para o usuário considerando o portfólio de contratos, dados de consumo e possibilidade de compras no curto prazo.<br>
			</p>
			
			<p align="center">
				Esta ferramenta foi desenvolvida por meio de projeto de pequisa com apoio do IFSC.<br>
				Autores Fabricio Takigawa, Matheus N. S. M. de Lima e Werik Ramos.
			</p>
		</div>
	</div>
	<div class="container">
	<p style="padding-top:-10px; padding-bottom:1px; padding-left:10px; text-align: justify;">
				Foram analisados <b>'.$qtsC.'</b> contratos do <b>portfólio '.$portV.'</b> :<br>
	</p>
	<div class="row" style="inline-block;" >
			
			<div style="float:left; width:210px;">
			<img src="../../../imgs/c'.$port.'2.png" width="100%" style="padding-bottom: 5px; ">
			</div>
			<div style="float:left; width:250px">
			<img src="../../../imgs/c'.$port.'1.png"  width="400" style="padding-bottom: 5px; ">
			</div>
			<div style="float:left; width:210px;">
			<img src="../../../imgs/c'.$port.'3.png" width="400" style="padding-bottom: 5px; ">
			</div>
		</div>	
		<hr>
<div class="container" >
		<p style="padding-top:-30px;">
			A figura a esquerda ilustra o consumo na ponta e fora da ponta e a demanda  na ponta e fora da ponta do usuário e a figura a direita o preço de indiferença (preço médio entre os ambientes) e o preço médio contratado no Ambiente de Contratação Livre (ACL).
		</p>
		<div class="row" style="inline-block;">
			<div style="float:left; width:50%">
			<br>
			<img src="'.$g4.'"  width="380" style="padding-bottom: 20px; ">
			</div>
			
			<div style="float:right; width:50%">
				<br>
			<img src="'.$g5.'" width="380" style="padding-bottom: 20px; ">
			</div>
			
		</div>
		</div>';

		$html11='<div class="container" ><p align="justify"  style="padding-top:50px;">O gráfico a seguir ilustra o montante utilizado de cada contrato selecionado (esq.) e a tabela apresenta os contratos selecionados para o atendimento da demanda do usuário.<br>
			Os contratos selecionados pela otimização possuem demandas, que são somadas buscando a melhor combinação possível considerando seu perfil de consumo. O gráfico indicativo de relevância no montante total evidencia a participação de cada contrato no cenário gerado pela otimização.</p>
			<div class="row" style="inline-block;">
				<div style="float:left; width:50%" >
					<div class="grafico" style="padding-top:15px;"><img src="'.$g3.'"  width="350;"></div>
				</div>
				<div style="float:ritgh; width:50%">
				'.$t1.' 
					</div>
					<hr>
			</div>
			<div class="row">
						<p style="padding-left:5px;">
					O gráfico de configuração de contratos no tempo mostra quais contratos foram selecionados pela otimização juntamente com os valores de ajuste de demanda. Cada contrato possui um percentual de sazonalização e flexibilização, a ferramenta realiza o cálculo buscando ajustar sua demanda da melhor forma possível. O gráfico expõe os valores finais sazonalizados e flexibilizados para cada mês.
					</p>
					</div>
			<div class="grafico"><img src="'.$g1.'"  width="620;" style="padding-bottom: 5px;margin-left:20px;"></div>	
			
		</div>';


		$html2='<div class="container" >
		<div class="row">
			<p>
				A figura abaixo ilustra o percentual total da variação de sazonalização e de flexibilização do portfólio selecionado, assim como a linha pontilhada ilustra a liberdade contratual utilizada pelo usuário para o atendimento da demanda
			</p><br>
			<div class="grafico"><img src="'.$g2.'"  width="500;" style="padding-bottom: 20px; margin-left:80px;"></div>
		</div>
		<div class="row" style="inline-block;margin-right:10px;margin-top:10px;">
			<br>
			<h1> Resumo da simulação</h1>
			<div style="float:left; width:45%"><p align="justify" >
				<b>Data:</b> '.date('d/m/Y').' <br>
				<b>Usuário:</b> '.$nome.' '.$sobrenome.'<br>
				<b>Horizonte:</b> '.$horizonte.' meses <br>
				<b>Tempo de Processamento:</b> '.$tempoprocessamento.' s <br><br>
				<b>Valor da Função Objetivo</b> = '.$funcaomin.' R$ <br>
				<b>Média do Preço do APLAC</b> = '.$mediaPreco.' R$/MWh <br>
				<b>Média do Preço do PI </b> = '.$mediaPI.' R$/MWh <br>
				<b>Situação para migração</b>: '.$situacaoOt.'<br>
				<b>Id dos Contratos</b> = ['.$idcontratos.']<br>
				<b>Sazo/Flex dos Contratos</b> = ['.$sazoeflex.']<br>
				</p>			
			</div>
			<div style="float:left; width:55%;margin-left:20px;">
			<p align="justify">
				<b>Consumidor Especial:</b> '.$cEsp.' <br>
				<b>Grupo e Modalidade Tarifária:</b>'.$gmt.'<br> 
				<b>Consumo Total Informado</b> = '.$somatorioSC.' MW/h<br><br>
				<b>Consumo Total Contratado</b> = '.$somatoriocontratado.' MW/h<br>
				Sendo que, <b>'.$somatorioflexi.' MW/h</b> são de contratos e <b>'.$somatoriopld.' MW/h</b> foram comprados no Mercado de Curto Prazo (MCP)<br><br>
				<b>Porcentagem de Contratação</b> = '.$porcentagemsobrecontratado.'	%<br>
				<b>Porcentagem de Compra no MCP</b> = '.$porcentagemexposto.' %<br>
				</p>
				
			</div>
			<br><br><br><br><br><br>
			
		</div>
			</div>
			</div>
			<p align="center" style="padding-bootom:-1px;"><h4>Avalie nossa ferramenta em: https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/contato</p></h4>
		</body>';
		
			
		
		

include '../../../lib/vendor/mpdf/mpdf/mpdf.php';
$mpdf=new mPDF('c','A4'); 
$mpdf->SetHeader('<div class="page-header" style="padding-top:-30px;">
					<div class="row">
						<div class="col-md-1 col-md-offset-1">
							<img src="../../../imgs/logoIFSC.png" height="60px;" width="200px;" style="padding-bottom: 20px;">
								
							<img src="../../../imgs/logo_gese.png" height="80px;" width="90px;" style="padding-left: 355px;">
						</div>
					</div>	
				</div>');
$mpdf->SetFooter('| Ferramenta disponível em: https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac|{PAGENO}'); /* defines footer for Odd and Even Pages - placed at Outer margin */
$mpdf->SetFooter(array(
 'L' => array(
 'content' => 'Text to go on the left',
 'font-family' => 'sans-serif',
 'font-style' => 'B', /* blank, B, I, or BI */
 'font-size' => '10', /* in pts */
 ),
 'C' => array(
 'content' => '- {PAGENO} -',
 'font-family' => 'serif',
 'font-style' => 'BI',
 'font-size' => '18', /* gives default */
 ),
 'R' => array(
 'content' => 'Printed @ {DATE j-m-Y H:m}',
 'font-family' => 'monospace',
 'font-style' => '',
 'font-size' => '10',
 ),
 'line' => 1, /* 1 to include line below header/above footer */
), 'E' /* defines footer for Even Pages */
);

$mpdf->SetDisplayMode('fullpage');
$mpdf->WriteHTML($css,1);
$mpdf->WriteHTML($html,2);
$mpdf->AddPage();
$mpdf->WriteHTML($html11,2);
$mpdf->AddPage();
$mpdf->WriteHTML($html2,2);
$mpdf->Output('/var/www/consumidorlivre/aplac/app/arqTemp/pdf/relatorio'.$id.'.pdf','F');
exit;
$mpdf = new \Mpdf\Mpdf();
?>
