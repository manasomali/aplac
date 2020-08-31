app.controller('meu_portfolioCtrl', function($scope, $http,$localStorage)
{
	$scope.usuario=$localStorage.usuario;
// handsontable entrada_contratos
var container2 = document.getElementById('entrada_contratos');
var hot2 = new Handsontable(container2, {
	startRows: 10,
	minSpareRows: 1,
	removeRowPlugin: true,
	rowHeaders: false,
	width: 700,
	height: 400,
	rowHeights: 25,
	manualColumnResize: true,
	colWidths: [75, 150, 150, 150, 150],
	columns: [
	{
		type: 'numeric',
		numericFormat: {
			pattern: '0.00',
		}
	},
	{
		type: 'numeric',
		numericFormat: {
			pattern: '0.00',
		}
	},
	{
		type: 'numeric',
		numericFormat: {
			pattern: '0.00',
		}
	},
	{
		type: 'numeric',
		numericFormat: {
			pattern: '0.00',
		}
	},
	{
		type: 'numeric',
		numericFormat: {
			pattern: '0.00',
		}
	}
	],
	colHeaders: [
	'Id',
	'Preço do Contrato [R$/Mwh]',
	'Montante [Mwh]',
	'Sazonalização [%]',
	'Flexibilização [%]'
	]
});


$scope.upload_contratos=function()
{
	var id = hot2.getDataAtCol(0).clean();
	var preco_contrato = hot2.getDataAtCol(1).clean();
	var montante_mensal = hot2.getDataAtCol(2).clean();
	var flexibilizacao = hot2.getDataAtCol(3).clean();
	var sazonalizacao = hot2.getDataAtCol(4).clean();
	var p = preco_contrato.length;
	var inv=0;
	//console.log(flexibilizacao);
	for (var i = 0; i < p; i++)
	{
		if(montante_mensal[i]<=0||preco_contrato[i]<=0||flexibilizacao[i]>100||sazonalizacao[i]>100||flexibilizacao[i]<0||sazonalizacao[i]<0)
		{
			inv=1;
			break;
		}
		else
		{
			inv=0;
		}
	}
	if( (inv == 0)&&(p == id.length)&&(p == preco_contrato.length)&&(p == montante_mensal.length)&&(p>0)&&(p<200)) 
	{
		alert("Dados Válidos");
		$http({
			method: 'POST',
			url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/post/upload_contratos.php',
			headers: {
				'Content-Type': undefined
			},
			data: {
				quantidade: p,
				id: id,
				id_user: $scope.usuario.id,
				preco_contrato: preco_contrato, 
				montante_mensal: montante_mensal,
				flexibilizacao: flexibilizacao,
				sazonalizacao: sazonalizacao
			}
		}
		)
		.then(function(response){
			//var test=response.data;
			//alert(test);
			alert("Upload realizado com sucesso!");
		}, function(){
			alert("Falhou");
		});
	}
	else if (p>200)
	{
		alert("Qauntidade de contratos máxima excedida");
		hot2.loadData(null);
	}
	else
	{
		alert("Dados Inválidos");
		hot2.loadData(null);
	}

}
$scope.get_portfolio=function()
{
	hot2.loadData(null);
	$http({
		method: 'POST',
		url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/get_contratos_pessoais.php',
		headers: {
			'Content-Type': undefined
		},
		data: {
			id_user: $scope.usuario.id
		}
	})
	.then(function(response){
		var show = [];
		for (var i = 0; i < response.data.length; i++) {
			show[i] = Object.values(response.data[i]);
		}
		//console.log(response.data);
		//console.log(show);
		hot2.loadData(show);

	}, function(){
		alert("Erro");
	});
}
$scope.delete_contratos=function()
{
	hot2.loadData(null);
	$http({
		method: 'POST',
		url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/post/excluir_contratos.php',
		headers: {
			'Content-Type': undefined
		},
		data: {
			id_user: $scope.usuario.id
		}
	})
	.then(function(response){
		alert("Contratos apagados");
	}, function(){
		alert("Erro");
	});
}



});