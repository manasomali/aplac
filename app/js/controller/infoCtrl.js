app.controller('infoCtrl', function($scope,$http,$rootScope, $location, $filter)
{
	$rootScope.activetab = $location.path();

	$scope.getFilter = function() {
		var result = {};
		result[$scope.opcao] = $scope.filtro;
		return result;
	}	

	$http({
		method: 'GET',
		url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/informacoes.php'
	}).then(function successCallback(response) {
		$scope.pld=response.data;
		$scope.datasPld=[];
		$scope.dadosN=[];
		$scope.dadosSE=[];
		$scope.dadosS=[];
		$scope.dadosNE=[];
		$scope.data=[];
		$scope.pld.forEach(function(el) {
			//$scope.aux = el.DATA;
			$scope.aux = $filter('date')(el.DATA, "MM/yyyy");
			$scope.datasPld.push($scope.aux);
			$scope.dadosN.push(el.N);
			$scope.dadosSE.push(el.SE_CO);
			$scope.dadosS.push(el.S);
			$scope.dadosNE.push(el.NE);
		});
		$scope.data.push($scope.dadosS,$scope.dadosSE,$scope.dadosN,$scope.dadosNE);

	}, function errorCallback(response) {

	});
	
	$scope.series = ['S', 'SE_CO','N','NE'];
	
	$scope.colors=['#0000fa','#ff0000','#04b339','#efb339'];

	$scope.options=
	{
		legend: {
			display: true
		},
		pan: {
            enabled: true,

            // Panning directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow panning in the y direction
            mode: 'x'
        },
        zoom: {
            // Boolean to enable zooming
            enabled: true,

            // Zooming directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'x',
	sensitivity: 0.0001,
        }
    };

});
