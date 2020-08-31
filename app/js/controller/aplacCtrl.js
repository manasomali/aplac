app.controller('aplacCtrl', function($scope,$http,$localStorage, $location,$interval,$filter,$window,$timeout) 
{
	$scope.P=1;
	$scope.j=0;
	$scope.DadosPi= [];
	$scope.meses=[];
	$scope.usuario=$localStorage.usuario;
	$scope.gImgs=[];
	$scope.segs=0;

	$interval(function () 
	{	
			if($scope.statusCont=true)
				{$scope.segs++;}
	}, 1000);

	$scope.saveImg=function(titulo,dados)
	{
		$scope.gImgs[titulo]=dados;
	}

	$scope.gerarTabelas=function(response)
	{
		i=0;
		texto='';
		tableContratos=[];
		for( k in response.jsonAPLOC.xmin){
			if(k!='PLD'){
				for( l in response.jsonAPLOC.xmin[k]){

					tableContratos[i]=
					{
						idContrato:k,
						montanteContrato:response.jsonAPLOC.xmin[k].CCB,
						flexContrato:response.jsonAPLOC.xmin[k].flex,
						sazoContrato:response.jsonAPLOC.xmin[k].sazo,
						precoContrato:response.jsonAPLOC.xmin[k].p_cb
					};
				}	
			}
			i++;
		}
		$localStorage.tableContratos=tableContratos;
		
		//console.log($scope.qtdCnt);
		document.cookie ="tableContratos=".concat(JSON.stringify(tableContratos));
		texto+="<table class='table table-hover' style='font-size:15'>";
		texto+="<thead>";
		texto+="<tr>";
		texto+="<th scope='col'>#</th>";
		texto+="<th scope='col'>PREÇO DO CONTRATO (R$/MWH)</th>";
		texto+="<th scope='col'>MONTANTE (MWH) </th>";
		texto+="<th scope='col'>SAZONALIZAÇÃO (%)</th>";
		texto+="<th scope='col'>FLEXIBILIZAÇÃO (%)</th>";
		texto+="</tr>";
		texto+="</thead>";
		texto+="<tbody>";
		for(i=0;i<tableContratos.length;i++){
			texto+="<tr> <th>"+ tableContratos[i].idContrato+"</th><td>R"+ $filter('currency')(tableContratos[i].precoContrato)+"</td><td>"+$filter('number')((tableContratos[i].montanteContrato), 4)+"</td><td>±"+ tableContratos[i].sazoContrato+"</td><td>±"+ tableContratos[i].flexContrato+"</td> </tr> ";
		};
		texto+="</tbody>";
		texto+="</table>";
		document.getElementById("tabelaContratos").innerHTML = texto;
		$scope.relatorio=texto;

	}

	$scope.qtdCnt=0;
	$scope.gerarComparativo=function(response)
	{
		i=0;
		var flexi = [];
		var precoContrato=[];
		var a=[];
		for( k in response.jsonAPLOC.xmin){
			if(k!='PLD'){
				flexi.push([]);
				a.push([]);
				for( l in response.jsonAPLOC.xmin[k]){
					precoContrato[i]=response.jsonAPLOC.xmin[k].p_cb;
					for(var m in response.jsonAPLOC.xmin[k].montantes){
						
						flexi[i][m]=response.jsonAPLOC.xmin[k].montantes[m].flex;
						a[i][m]=flexi[i][m]*precoContrato[i];
					}	
				}	
			}
			i++;
		}

		//console.log(flexi);
		//console.log(precoContrato);
		//console.log(a);

		var cima=[];
		var baixo=[];
		var prexo=[];
		for(var i=0;i<a.length;i++)
		{
			for(var j=0;j<a[i].length;j++){
				cima[j] = (cima[j] || 0) + a[i][j];
				baixo[j] = (baixo[j] || 0) + flexi[i][j];
				prexo[j]=(cima[j]/baixo[j]).toFixed(2);
			}
		}
		$scope.prexo=prexo;
		//console.log(prexo);
	}




	$("#myModal").bind("mousewheel",function(ev, delta) {
		var scrollTop = $(this).scrollTop();
		$(this).scrollTop(scrollTop-Math.round(delta));
	});


	$scope.iniciar=function()
	{
		$scope.ICMS=25;
		$scope.CCEE=400;
		$scope.ESS=3;
		$scope.K=3;
		$scope.camada=1;
		$scope.F=0.2;
		document.cookie="tableContratos=";
		var retrievedObject2 = localStorage.getItem('data_temp');
		if (retrievedObject2!=null)
		{
			hot.loadData(JSON.parse(retrievedObject2));
		}		
	}


	$scope.setMod=function(aux)
	{
		$scope.port=aux;
		$scope.statusCont=true;
		CP = hot.getDataAtCol(1).clean();
		CFP = hot.getDataAtCol(2).clean();
		var p = Number(CP.length);
		var C = [];
		var sumC = 0;
		for (var i = 0; i < p; i++) 
		{
			C[i] = Number(CP[i]+CFP[i]).toFixed(5);
			sumC += Number(C[i]);
		}
		var avgC = Number(sumC/(C.length));
		//console.log(avgC);
		$http({
			method: 'POST',
			url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/formatContrato.php',
			headers: {
				'Content-Type': undefined
			},
			data: { mod:aux ,id_user: $scope.usuario.id, mediaC:avgC, F:$scope.F}
		})
		.then(function(response){
			$scope.console_data();
		}, function(){
			alert("Falhou");
		});

	}


	$scope.setValoresAvancados=function()
	{
		$('#confAvanModal').modal('hide');
	}


	var container = document.getElementById('entrada');
	var hot = new Handsontable(container, {
		startRows: 10,
		minSpareRows: 1,
		removeRowPlugin: true,
		rowHeaders: true,
		width: 700,
		height: 400,
		rowHeights: 25,
		manualColumnResize: true,
		colWidths: [105, 105, 105, 105, 105, 105],
		columns: [
		{ 
			type: 'date',
			dateFormat: 'YYYY/MM',
			numberOfMonths: 60,
			defaultDate: '2013/08'
		},
		{
			type: 'numeric',
			numericFormat: {
				pattern: '0.000000',
			}
		},
		{
			type: 'numeric',
			numericFormat: {
				pattern: '0.000000',
			}
		},
		{
			type: 'numeric',
			numericFormat: {
				pattern: '0.000000',
			}
		},
		{
			type: 'numeric',
			numericFormat: {
				pattern: '0.000000',
			}
		},
		{
			type: 'numeric',
			numericFormat: {
				pattern: '0.000',
			}
		}
		],
		colHeaders: [
		'Data [yyyy/mm]',
		'Consumo na Ponta [MWh]',
		'Consumo fora da Ponta [MWh]',
		'Demanda na Ponta [MW]',
		'Demanda fora da Ponta [MW]',
		'PLD [R$/MWh]'
		]
	});

	$scope.clear=function()
	{
		hot.loadData(null);
	}
	$scope.save=function()
	{
		var data_save = hot.getData();
		localStorage.setItem('data_save', JSON.stringify(data_save));
	}
	$scope.load=function()
	{
		var retrievedObject = localStorage.getItem('data_save');
		//console.log(JSON.parse(retrievedObject));
		hot.loadData(JSON.parse(retrievedObject));
	}
	$scope.fechar=function(){
		var data_temp = hot.getData();
		localStorage.setItem('data_temp', JSON.stringify(data_temp));
		location.reload();
	}
	$scope.console_data=function()
	{
		
		DATA = hot.getDataAtCol(0).clean();
		$scope.meses=DATA;
		CP = hot.getDataAtCol(1).clean();
		$scope.cp=CP;
		CFP = hot.getDataAtCol(2).clean();
		$scope.cfp=CFP;
		DCP = hot.getDataAtCol(3).clean();
		$scope.dcp=DCP;
		DCFP = hot.getDataAtCol(4).clean();
		$scope.dcfp=DCFP;
		PLD = hot.getDataAtCol(5).clean();
		var pp = [Number(CP.length),Number(CFP.length)];
		var p=Math.max.apply(null, pp );
		$scope.p=p;
		$scope.qtdPi=p;
		//em processo de criação, possibilidades de entrada
		$scope.dita_grafico_carga=[1,1,1,1];
		if(PLD.length==0)
		{
			for (var i = 0; i < p; i++)
			{
				PLD[i]=9999;
			}
		}
		if(CP.length==0)
		{
			$scope.dita_grafico_carga[0]=0;
			for (var i = 0; i < p; i++)
			{
				CP[i]=0;
			}
		}
		if(CFP.length==0)
		{
			$scope.dita_grafico_carga[1]=0;
			for (var i = 0; i < p; i++)
			{
				CFP[i]=0;
			}
		}
		if(DCP.length==0)
		{
			$scope.dita_grafico_carga[2]=0;
			for (var i = 0; i < p; i++)
			{
				DCP[i]=0;
			}
		}
		if(DCFP.length==0)
		{
			$scope.dita_grafico_carga[3]=0;
			for (var i = 0; i < p; i++)
			{
				DCFP[i]=0;
			}
		}

		if((DATA.length==[])&&(PLD.length==p)&&(p>0))
		{
			if(($scope.dita_grafico_carga[2])==1||($scope.dita_grafico_carga[3]==1))
			{
				$scope.possibilidade=0;
				alert("Erro, tente novamente");
				$scope.erroModal=true;
				$('#gerar').modal('hide');
				hot.loadData(null);
			}
			else
			{$scope.possibilidade=1;}
			
		}
		else if((DATA.length==p)&&(PLD.length==p)&&(p>0))
		{
			if(($scope.dita_grafico_carga[2])==1||($scope.dita_grafico_carga[3]==1))
			{$scope.possibilidade=2;}
			else
			{
				$scope.possibilidade=0;
				alert("Erro, tente novamente");
				$scope.erroModal=true;
				$('#gerar').modal('hide');
				hot.loadData(null);
			}
		}
		else
		{
			$scope.possibilidade=0;
			alert("Erro, tente novamente");
			$scope.erroModal=true;
			$('#gerar').modal('hide');
			hot.loadData(null);
		}

		//console.log($scope.possibilidade);
		if($scope.possibilidade>0) {
			$scope.erroModal=false;
			$scope.abrirModal();
			var C = [];
			for (var i = 0; i < p; i++) 
			{
				C[i] = Number(CP[i]+CFP[i]).toFixed(6);
			}
			$scope.SC=C;

			C.toString();
			C = C+";";

			PLD.toString();
			PLD = PLD+";";

			PLD = PLD.replace(/,/g,", ");
			C = C.replace(/,/g,", ");

			var valor_PLD = PLD;
			var valor_demanda = C;
			var d = "-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1;";
			var e = "0, 0.2, 0.5, 0, 0.2, 0.5;";

			$.ajax({
				async: true,
				crossDomain: true,
				url: "https://gese.florianopolis.ifsc.edu.br/consumidorlivre/api/aplac/",
				method: "POST",
				headers: {
					"content-type": "application/json",
					"cache-control": "no-cache"
				},
				processData: false,
				data: "{\"PLD\":\""+valor_PLD+"\",\"Demand\":\""+valor_demanda+"\",\"Settings\":\""+d+"\",\"Price_update\":\""+e+"\"}",
				success: function(response)
				{
					//console.log(response);
					response = JSON.parse(response);
					console.log(response);
					$scope.gerarTabelas(response);
					//console.log($scope.tableContratos);
					$scope.gerarComparativo(response);
					$scope.gerarGraficos(response);

				},
				error: function() {
					alert('Falha no funcionamento da API!');
				}
			});

			if($scope.possibilidade==2){
				$http({
					method: 'POST',
					url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/getTarifas.php',
					headers: {
						'Content-Type': undefined
					},
					data: { date:DATA , gmt:$scope.GMT, cp: DCP, cfp: CFP, dcp:DCP, dcfp: DCFP, qtd:p, cEspecial: $scope.cEspecial }
				})
				.then(function(response){
					$scope.pi=response.data;
				//console.log($scope.pi);
				$scope.fPI();
			}, function(){
				alert("Falhou");
			});
			}

		}
	}
	$scope.fPI=function()
	{
		document.getElementById("piArea").style.visibility = "hidden";
		document.getElementById("g1Area").style.visibility = "hidden";
		document.getElementById("g2Area").style.visibility = "hidden";
		document.getElementById("g3Area").style.visibility = "hidden";
		document.getElementById("g4Area").style.visibility = "hidden";

		for($scope.j=0;$scope.j<$scope.qtdPi;$scope.j++){
			$scope.TE=((Number($scope.pi[$scope.j].TE_P) * $scope.cp[$scope.j])+($scope.pi[$scope.j].TE_FP * $scope.cfp[$scope.j]));
			$scope.Cperdas=((($scope.cp[$scope.j]+$scope.cfp[$scope.j]))*(1+$scope.K/100));

			if ($scope.cEspecial == true) {
				$scope.calcPi=(( ( (($scope.TE) + (((($scope.dcp[$scope.j])/1000*$scope.pi[$scope.j].TUSDd_P)+(($scope.dcfp[$scope.j])/1000*$scope.pi[$scope.j].TUSDd_FP))*0.5) )  ) - ((($scope.CCEE + ($scope.Cperdas)*$scope.ESS))*((1-(Number($scope.pi[$scope.j].PIS)+Number($scope.pi[$scope.j].COFINS)+$scope.ICMS)/100))))/($scope.Cperdas)).toFixed(2);
				$scope.DadosPi.push($scope.calcPi);
			}
			else 
			{
				$scope.calcPi=((($scope.TE) - ((($scope.CCEE +( $scope.Cperdas*$scope.ESS) ))*((1-(Number($scope.pi[$scope.j].PIS)+Number($scope.pi[$scope.j].COFINS)+$scope.ICMS)/100))))/($scope.Cperdas)).toFixed(2);
				$scope.DadosPi.push($scope.calcPi);
			}
		}
		return $scope.DadosPi;
	}



	

	$scope.gerarGraficos=function(response)
	{
		
		$scope.camada++;
		var ctx1=null;
		var ctx2=null;
		var radarChart=null;
					// Matheus ler dados json contratos selecionados
					var i = 0;
					$scope.flex_contratos=[];
					$scope.sazo_contratos=[];
					for( k in response.jsonAPLOC.xmin)
					{
						if(k!='PLD')
						{
							for( l in response.jsonAPLOC.xmin[k])
							{
								$scope.flex_contratos[i]=response.jsonAPLOC.xmin[k].flex;
								$scope.sazo_contratos[i]=response.jsonAPLOC.xmin[k].sazo;
							}
						}
						i++;
					}

					$scope.sazoeflex=[];
					i=i-1;
					var ii=0;
					while(ii<i)
					{
						$scope.sazoeflex[ii]=$scope.sazo_contratos[ii].toString()+"/"+$scope.flex_contratos[ii].toString();
						ii++;
					}
					
					$scope.sazoeflex=$scope.sazoeflex.toString();
					$scope.flex_contratos=$scope.flex_contratos.toString();
					$scope.sazo_contratos=$scope.sazo_contratos.toString();
					//console.log($scope.sazo_contratos);
					//console.log($scope.flex_contratos);
					//console.log($scope.sazoeflex);
					$scope.tempo_de_processamento=response.jsonAPLOC.time;
					$scope.funcao_min=response.jsonAPLOC.fmin;


					// 																arruma_dados_grafico_main
					// feito por Allon
					var contratos = [];
					var montantes_flex = [];
					var flex = [];
					var sazo = [];
					var periodos = [];
					var precoPLD = [];
					var montantesPLD = [];
					var flexTempo = [];
					var sazoTempo = [];
					var flatTempo = [];

					var i = 0;
					// Laço para obter:
					//		montantes_flex
					//		contratos
					//		sazo
					//		periodos
					//		precoPLD
					//		montantesPLD
					for(var k in response.jsonAPLOC.xmin){
						if(k=='PLD'){
							var j = 0;
							for(var l in response.jsonAPLOC.xmin.PLD.liquidacao){
								precoPLD[j] = response.jsonAPLOC.xmin.PLD.liquidacao[l].p_cbMCP;
								montantesPLD[j] = response.jsonAPLOC.xmin.PLD.liquidacao[l].montante;
								j++;
							}
						} else {
							contratos[i] = k;
							var j = 0;
							for(var l in response.jsonAPLOC.xmin[k].montantes){
								flex[j] = response.jsonAPLOC.xmin[k].montantes[l].flex;
								if(!sazo[j]){sazo[j] = 0;}
								sazo[j] = Number((response.jsonAPLOC.xmin[k].montantes[l].sazo + sazo[j]).toFixed(6));
								sazoTempo[j] = sazo[j];
								if(!flexTempo[j]){flexTempo[j] = 0;}
								flexTempo[j] = response.jsonAPLOC.xmin[k].montantes[l].flex + flexTempo[j];

								if(!flatTempo[j]){flatTempo[j] = 0;}
								flatTempo[j] = response.jsonAPLOC.xmin[k].CCB + flatTempo[j];

								periodos[j] = 'Mês '+(j+1);
								j++;
							}
							
							montantes_flex[i] = flex.concat();
						}
						i++;
					}
							$scope.flexTotal=0;
							i=0;
							while(i<montantes_flex.length)
							{
								$scope.flexTotal+=Number(montantes_flex[i]);
								i++;
							}
							$scope.id_contrados=contratos.toString();
							//console.log($scope.id_contrados);
					//console.table(montantes_flex);
					//															arruma_dados_grafico_percentual
					var percentualFlex = [];
					var percentualSazo = [];
					var percentualLiquido = [];
					for (var i in periodos) {
						percentualFlex[i] = parseFloat((((flexTempo[i]-sazoTempo[i])/sazoTempo[i])*100).toFixed(2));
						percentualSazo[i] = parseFloat((((sazoTempo[i]-flatTempo[i])/flatTempo[i])*100).toFixed(2));
						percentualLiquido[i] = parseFloat((((flexTempo[i]-flatTempo[i])/flatTempo[i])*100).toFixed(2));
					}
					//console.log(percentualFlex);
					//console.log(percentualSazo);
					//console.log(percentualLiquido);


					// 																arruma_dados_gafico_radar
					flex = [];
					var dados_totais = [];
					var labelsPolarArea = [];
					for (var i in montantes_flex) {
						flex[i] = 0.00;
						labelsPolarArea[i] = 'Contrato ' + contratos[i];
						for(var k in montantes_flex[i]) {
							flex[i] = Number((Number(flex[i])+Number(montantes_flex[i][k]))).toFixed(6);
							if(isNaN(flex[i])==true)
							{

							}else{	
								dados_totais[i] = Number(flex[i]);
							}
						}
					}
					$scope.flexi_s=flexTempo;
					var montante_pld = 0.00;
					for(var k in periodos) {
						montante_pld = (parseInt((montante_pld))).toFixed(4)+(parseInt((montantesPLD[k]))).toFixed(4);
					}
					montante_pld=Number(montante_pld);
					//console.log(montante_pld);

					if(montante_pld>0){
						labelsPolarArea[parseInt(i)+1] = 'PLD';
						dados_totais[parseInt(i)+1] = Number(montante_pld);
					}
					var labelsPercentis = labelsPolarArea;

					//console.log(montantesPLD);
					$scope.pld_s=montantesPLD;

					//																	define cores

					color_backgroundColor = $scope.arruma_backgroundColor(dados_totais);
					color_borderColor = $scope.arruma_borderColor(dados_totais);
					function gerarGrafico1(){
						//																	main_chart
						var barChartData = {
							type: "bar",
							data: {
								labels: periodos,
								datasets: []
							},
							options: {
								animation: {
									onComplete: done
								},
								legend: {
									display: true
								},
								hover: {
									mode: false
								},
								title: {
									display: true,
									text: "Configuração ótima de contratos no tempo"
								},
								elements: {
									point: {
										pointStyle: 'circle'
									}
								},
								tooltips: {
									titleFontSize: 18,
									bodyFontSize: 18,
									displayColors:false
								},
								responsive: true,
								scales: {
									xAxes: [
									{
										stacked: true,
										scaleLabel: {
											display: true,
											labelString: 'Períodos (mês)'
										}
									}
									],
									yAxes: [
									{
										ticks: {
                    						suggestedMin: 0,
                    						suggestedMax: ((Math.max.apply(null, $scope.SC ))+10)
                						},
										display: true,
										scaleLabel: {
											display: true,
											labelString: 'Montantes (MW/h)'
										}
									}
									]
								}
							}
						};
						var k=0;
						var l=0;
						for(k in contratos){
							barChartData.data.datasets[k] = {
								type: "bar",
								stack: 'Stack 0',
								label: "Contrato "+contratos[k],
								borderColor: color_borderColor[k],
								backgroundColor: color_backgroundColor[k],
								borderWidth: 2,
								data: montantes_flex[k]
							};
							l++;
						}
						l=l-3;
						if((Math.max.apply(null, montantesPLD ))>0)
						{
							barChartData.data.datasets[l] = {
							type: "bar",
							stack: 'Stack 0',
							label: "MCP",
							borderColor: 'rgb(255,0,0)',
							backgroundColor: 'rgb(255,0,0,0.7)',
							borderWidth: 2,
							data: montantesPLD
							};
						l=l+1;
						}
						barChartData.data.datasets[l] = {
							type: "line",
							label: "Consumo",
							data: $scope.SC,
							lineTension: 0,
							borderColor: 'rgb(0, 0, 0)',
							backgroundColor: 'rgba(0, 0, 0,0.5)',
							fill: false
						};
						l=l+1;
						barChartData.data.datasets[l] = {
							type: "line",
							label: "Montante total sazonalizado",
							data: sazo,
							lineTension: 0,
							borderColor: 'rgb(255,165,0)',
							backgroundColor: 'rgba(255,165,0,0.5)',
							borderDash: [10, 5],
							fill: false
						};
						$scope.flexibi=flex;
						var ctx1 = document.getElementById("chartJSContainer").getContext("2d");
						window.myBar1 = new Chart(ctx1, barChartData);	
						function done(){
							var graphG1=window.myBar1.toBase64Image();
							$scope.saveImg(1,graphG1);
						}

					}
					gerarGrafico1();
//
function gerarGrafico2(){
	var barChartData = {
		type: 'bar',
		data: {
			labels: periodos,
			datasets: [{
				type: 'bar',
				label: 'Sazonalização',
				borderColor: 'rgb(72, 209, 204)',
				backgroundColor: 'rgba(72, 209, 204,0.5)',
				data: percentualSazo,
				borderWidth: 2
			},
			{
				type: 'bar',
				label: 'Flexibilização',
				borderColor: 'rgb(200, 162, 200)',
				backgroundColor: 'rgba(200, 162, 200,0.5)',
				data: percentualFlex,
				borderWidth: 2
			},
			{
				type: 'line',							
				lineTension: 0.2,
				label: 'Percentual líquido em relação ao montante flat',
				data: percentualLiquido,
				borderColor: 'rgb(139, 87, 66)',
				backgroundColor: 'rgba(139, 87, 66,0.5)',
				borderDash: [10, 5],
				fill: false
			}]
		},
		options: {
			animation: {
				onComplete: done
			},
			legend: {
				display: true
			},
			hover: {
				mode: false
			},
			title: {
				display: true,
				text: "Percentuais de sazonalização, flexibilização e líquido"
			},
			tooltips: {
				titleFontSize: 18,
				bodyFontSize: 18,
				mode: "index",
				intersect: true,
				displayColors:false
			},
			responsive: true,
			scales: {
				xAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: 'Períodos (mês)'
					}
				}
				],
				yAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: 'Percentuais (%)'
					}
				}
				]
			}
		}
	};
	var ctx2 = document.getElementById("canvas_3").getContext("2d");
	window.myBar2 = new Chart(ctx2,barChartData);
	function done(){
		var graphG2=window.myBar2.toBase64Image();
		$scope.saveImg(2,graphG2);
	}

}
gerarGrafico2();

function gerarGrafico3(){
						//																			radar_chart
						
						var config_radarChart = {

							type: 'polarArea',
							data: {
								labels: labelsPolarArea,
								datasets: [{
									backgroundColor: color_backgroundColor,
									borderColor: color_borderColor,
									data: dados_totais
								}]
							},
							options: {
								legend: {
									display: false,
									position: 'left',
									labels: {
   							     		padding: 50
     	 							}
								},
								hover: {
									mode: false
								},
								responsive: true,
								title: {
									display: true,
									text: "Indicativo de relevância no montate total por contrato"
								},
								scale: {
									ticks: {
										beginAtZero: true
									},
									reverse: false
								},
								animation: {
									animateRotate: false,
									animateScale: true,
									onComplete: done
								},
								tooltips: {
									bodyFontSize: 18,
									displayColors:false
								}
							}
							
						};
						var radarChart = document.getElementById("radarChart").getContext("2d");
						window.polar = new Chart(radarChart,config_radarChart);
						function done(){
							var graphG3=window.polar.toBase64Image();
							$scope.saveImg(3,graphG3);
						}

					}
					gerarGrafico3();


					// grafico de curva de carga
					function gerarGrafico4(){
						//																	main_chart
						var barChartData = {
							type: "bar",
							data: {
								labels: periodos,
								datasets: [	]
							},
							options: {
								animation: {
									onComplete: done
								},
								legend: {
									display: true
								},
								hover: {
									mode: false
								},
								title: {
									display: true,
									text: "Curva de Carga"
								},
								tooltips: {
									titleFontSize: 18,
									bodyFontSize: 18,
									displayColors:false
								},
								responsive: true,
								scales: {
									xAxes: [
									{
										stacked: true,
										scaleLabel: {
											display: true,
											labelString: 'Períodos (mês)'
										}
									}
									],
									yAxes: []
								}
							}
						};
						if(($scope.possibilidade>0))
						{
							barChartData.options.scales.yAxes[0] = {
								id: 'A',
								position: 'left',
								stacked: true,
								scaleLabel: {
									display: true,
									labelString: 'Consumo (MW/h)'
								}
					      	};
						}
						if($scope.possibilidade==2)
						{			
							barChartData.options.scales.yAxes[1]={
					        	id: 'B',
								position: 'right',
								stacked: true,
								scaleLabel: {
									display: true,
									labelString: 'Demanda (MW)'
								}
							};
						}
						$scope.dita=0;
						if($scope.dita_grafico_carga[0]==1)
						{
							barChartData.data.datasets[$scope.dita] = {
									label: 'Consumo na Ponta',
									yAxisID: 'A',
									borderColor: 'rgb(253, 141, 60)',
									backgroundColor: 'rgba(253, 141, 60, 0.5)',
									stack: 'Stack 0',
									data: $scope.cp
								};
								$scope.dita=$scope.dita+1;
						}
						if($scope.dita_grafico_carga[1]==1)
						{
							barChartData.data.datasets[$scope.dita] = {
									label: 'Consumo fora da Ponta',
									yAxisID: 'A',
									borderColor: 'rgb(225,0,41)',
									backgroundColor: 'rgba(225,0,41,0.5)',
									stack: 'Stack 0',
									data: $scope.cfp
								};
								$scope.dita=$scope.dita+1;
						}
						if($scope.dita_grafico_carga[2]==1)
						{
							barChartData.data.datasets[$scope.dita] = {
								label: 'Demanda na Ponta',
								yAxisID: 'B',
								borderColor: 'rgb(95,158,160)',
								backgroundColor: 'rgba(95,158,160, 0.5)',
								stack: 'Stack 1',
								data: $scope.dcp
							};
							$scope.dita=$scope.dita+1;
						}
						if($scope.dita_grafico_carga[3]==1)
						{
							barChartData.data.datasets[$scope.dita] = {
								label: 'Demanda fora da Ponta',
								yAxisID: 'B',
								borderColor: 'rgb(55,126,184)',
								backgroundColor: 'rgba(55,126,184, 0.5)',
								stack: 'Stack 1',
								data: $scope.dcfp
							};
							$scope.dita=$scope.dita+1;
						}
						var ctx4 = document.getElementById("cargaChart").getContext("2d");
						window.myBar4 = new Chart(ctx4, barChartData);	
						function done(){
							var graphG4=window.myBar4.toBase64Image();
							$scope.saveImg(4,graphG4);
						}
					}
					gerarGrafico4();
					//console.log($scope.DadosPi);
					function gerarGrafico5(){
						//																	main_chart
						var barChartData = {
							type: "line",
							data: {
								labels: periodos,
								datasets: [{
									type: "line",
									label: 'Preço APLAC',
									stack: 'Stack 1',
									lineTension: 0,
									borderColor: 'rgb(50,153,204)',
									backgroundColor: 'rgba(50,153,204,0.5)',
									fill: false,
									data: $scope.prexo
								}]
							},
							options: {
								animation: {
									onComplete: done
								},
								legend: {
									display: true
								},
								hover: {
									mode: false
								},
								title: {
									display: true,
									text: "Preços [R$/MWh]"
								},
								tooltips: {
									titleFontSize: 18,
									bodyFontSize: 18,
									displayColors:false
								},
								responsive: true,
								scales: {
									xAxes: [
									{
										scaleLabel: {
											display: true,
											labelString: 'Períodos (mês)'
										}
									}
									],
									yAxes: [
									{
										scaleLabel: {
											display: true,
											labelString: 'R$/MWh'
										},
										ticks: {
											suggestedMin: ((Math.max.apply(null, $scope.prexo ))-10),
                    						suggestedMax: ((Math.max.apply(null, $scope.prexo ))+10)
										}
									}
									]
								}
							}
						};
						if($scope.possibilidade>1)
						{
							barChartData.data.datasets[1] = {
									type: "line",
									label: 'Preço de Indiferença',
									stack: 'Stack 0',
									lineTension: 0,
									borderColor: 'rgb(153,204,50)',
									backgroundColor: 'rgba(153,204,50,0.5)',
									fill: false,
									data: $scope.DadosPi
							};
						}

						$scope.medias=function(response){
							$scope.mediasazo=0;
							$scope.mediaPI=0;
							$scope.mediaPreco=0;
							$scope.qtdCnt=0;
							$scope.qtdCnt=Number($localStorage.tableContratos.length);
							i=0;
							while(i<$scope.p)
							{
								$scope.mediaPI+=Number($scope.DadosPi[i]);
								$scope.mediaPreco+=Number($scope.prexo[i]);

								i++;
							}
							//console.log($scope.mediaPI);
							//console.log($scope.mediaPreco);
							$scope.mediaPI=(Number($scope.mediaPI)/Number($scope.p)).toFixed(2);
							$scope.mediaPreco=(Number($scope.mediaPreco)/Number($scope.p)).toFixed(2);
							if($scope.mediaPI==NaN)
							{
								$scope.mediaPI=="Não Calculado";
							}
							
							
							//console.log($scope.mediaSC,$scope.mediasazo);

							$scope.soma_total_consumo=0;
							$scope.soma_total_contratada=0;
							$scope.soma_total_pld=0;
							$scope.soma_total_flexi=0;
							i=0;
							//console.log($scope.flexi_s);
							//console.log($scope.pld_s);
							//console.log($scope.SC);
							while(i<$scope.p)
							{
								$scope.soma_total_consumo+=(Number($scope.SC[i]));
								$scope.soma_total_contratada+=(Number($scope.flexi_s[i])+Number($scope.pld_s[i]));
								$scope.soma_total_pld+=(Number($scope.pld_s[i]));
								$scope.soma_total_flexi+=(Number($scope.flexi_s[i]));
								i++;
							}
							$scope.soma_total_consumo=(Number($scope.soma_total_consumo)).toFixed(3);
							$scope.soma_total_contratada=(Number($scope.soma_total_contratada)).toFixed(3);
							$scope.soma_total_pld=(Number($scope.soma_total_pld)).toFixed(3);
							$scope.soma_total_flexi=(Number($scope.soma_total_flexi)).toFixed(3);
							$scope.porcentagem_sobrecontratado=(((100*Number($scope.soma_total_flexi))/Number($scope.soma_total_consumo))).toFixed(2);
							$scope.porcentagem_exposto=((100*Number($scope.soma_total_pld))/Number($scope.soma_total_consumo)).toFixed(2);
							//console.log($scope.mediaPI);
							//console.log($scope.mediaPreco);
							//console.log($scope.soma_total_consumo);
							//console.log($scope.soma_total_contratada);
							//console.log($scope.soma_total_pld);
							//console.log($scope.porcentagem_sobrecontratado);
							//console.log($scope.porcentagem_exposto);
						}
						$scope.medias();

						var ctx5 = document.getElementById("PIChart").getContext("2d");
						window.myBar5 = new Chart(ctx5, barChartData);	

						function done(){

							var graphPi=window.myBar5.toBase64Image();
							$scope.saveImg(5,graphPi);
						}

					}
					gerarGrafico5();

					
					
					document.getElementById("carregando").style.display = "none";
					document.getElementById("piArea").style.visibility = "visible";
					document.getElementById("g1Area").style.visibility = "visible";
					document.getElementById("g2Area").style.visibility = "visible";
					document.getElementById("g3Area").style.visibility = "visible";
					document.getElementById("g4Area").style.visibility = "visible";
					document.getElementById("tabelaContratos").style.visibility = "visible";
					$scope.statusCont=false;
					$scope.tempoDeProcessamento=$scope.segs;
					$scope.segs=0;			
				}
				$scope.arruma_backgroundColor=function (dados_totais) {
					color_backgroundColor = [];
					palette('mpn65', dados_totais.length+1).map(function(hex) {
						color_backgroundColor += '#' + hex +'99' + ',';
					});
					color_backgroundColor = color_backgroundColor.substring(0,(color_backgroundColor.length - 1));
					color_backgroundColor = color_backgroundColor.split(",");

					return color_backgroundColor;
				}
				$scope.arruma_borderColor=function (dados_totais) {
					color_borderColor = [];
					palette('mpn65', dados_totais.length+1).map(function(hex) {
						color_borderColor +='#' + hex + ',';
					});
					color_borderColor = color_borderColor.substring(0,(color_borderColor.length - 1));
					color_borderColor = color_borderColor.split(",");

					return color_borderColor;
				}

				$scope.gerarPdf=function()
				{
					alert("Aguarde um instante...");
					$http({
						method: 'POST',
						url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/pdf.php',
						headers: {
							'Content-Type': undefined
						},
						data: { 
							nome:$scope.usuario.nome, 
							sobrenome:$scope.usuario.sobrenome, 
							horizonte:$scope.p, 
							texto: $scope.relatorio, 
							tempoDeProcessamento: $scope.tempoDeProcessamento, 
							id:$scope.usuario.id, 
							g1:$scope.gImgs[1],
							g2:$scope.gImgs[2],
							g3:$scope.gImgs[3],
							g4:$scope.gImgs[4],
							g5:$scope.gImgs[5],
							port:$scope.port,
							gmt:$scope.GMT,
							cEsp:$scope.cEspecial,
							mediapi:$scope.mediaPI,
							mediapreco:$scope.mediaPreco,
							somatoriosc:$scope.soma_total_consumo,
							somatorioflexi:$scope.soma_total_flexi,
							somatoriopld:$scope.soma_total_pld,
							somatoriocontratado:$scope.soma_total_contratada,
							porcentagemsobrecontratado:$scope.porcentagem_sobrecontratado,
							porcentagemexposto:$scope.porcentagem_exposto,
							idcontratos:$scope.id_contrados,
							sazocontratos:$scope.sazo_contratos,
							flexcontratos:$scope.flex_contratos,
							sazoeflex:$scope.sazoeflex,
							qtdCnt:$scope.qtdCnt,
							tempoprocessamento:$scope.tempo_de_processamento,
							funcaomin:$scope.funcao_min
						}
					})
					.then(function(response){
					}, function(){
					
					});
					var url="https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/arqTemp/pdf/relatorio"+$scope.usuario.id+".pdf";
					$timeout(function () {
						$window.open(url);
					}, 5000);
					
				}

				$scope.abrirModal=function()
				{
					if($scope.erroModal==false)
					{

						$('#myModal').modal('show');
					}
				}

				


			});
