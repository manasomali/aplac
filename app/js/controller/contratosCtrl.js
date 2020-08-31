app.controller('contratosCtrl', function($scope,$http,$rootScope, $location)
{
	$rootScope.activetab = $location.path();
	$scope.getFilter = function() {
		var result = {};
		result[$scope.opcao] = $scope.filtro;
		return result;
	}

	$http({
		method: 'GET',
		url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/contratosr.php'
	}).then(function successCallback(response) {
		$scope.contratos=response.data;
	
	}, function errorCallback(response) {
	});
	$http({
		method: 'GET',
		url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/contratos.php'
	}).then(function successCallback(response) {
		$scope.contratosr=response.data;
	
	}, function errorCallback(response) {

	});


	 $scope.labels =["R$50,00-R$100,00", "R$100,00-R$150,00", "R$150,00-R$200,00", "R$200,00-R$250,00", "R$250,00-R$300,00", "R$300,00-R$350,00", "R$350,00-R$400,00","R$400,00-R$450,00"];
	 $scope.data = [1, 95, 160,28,5,3,5,2];
	 $scope.labelsS =["±0 ~ ±5", "±5 ~ ±10", "±10 ~ ±15", "±15 ~ ±20", "±20 ~ ±25"];
	 $scope.dataS = [210, 7, 55,25,2];
	 $scope.labelsF =["±0 ~ ±5", "±5 ~ ±10", "±10 ~ ±15", "±15 ~ ±20", "±20 ~ ±25"];
	 $scope.dataF = [196, 16, 63,20,4];
     
     $scope.options1= {
				responsive: true,
				legend: {
					position: 'top',
					display:true
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				tooltips:{
					titleFontSize:20
				}
			}
	$scope.options2= {
		responsive: true,
		legend: {
			position: 'top',
			display:true
		},
		title:{
			display:true,
			text:'Sazonalização'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		tooltips:{
			titleFontSize:20
		}
	}
	$scope.options3= {
		responsive: true,
		legend: {
			position: 'top',
			display:true
		},
		title:{
			display:true,
			text:'Flexibilzação'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		tooltips:{
			titleFontSize:20
		}
	}

////////////////////////////////////////////////////////

	 $scope.labels2 =[ "R$100,00-R$150,00", "R$150,00-R$200,00", "R$200,00-R$250,00", "R$250,00-R$300,00"];
	 $scope.data2 = [ 7, 50,124,19];
	 $scope.labelsS2 =["±0 ~ ±5", "±5 ~ ±10", "±10 ~ ±15"];
	 $scope.dataS2 = [83, 87, 30];
	 $scope.labelsF2 =["±0 ~ ±5", "±5 ~ ±10", "±10 ~ ±15"];
	 $scope.dataF2 = [80, 91, 29];
     
     $scope.options12= {
				responsive: true,
				legend: {
					position: 'top',
					display:true
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				tooltips:{
					titleFontSize:20
				}
			}
	$scope.options22= {
		responsive: true,
		legend: {
			position: 'top',
			display:true
		},
		title:{
			display:true,
			text:'Sazonalização'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		tooltips:{
			titleFontSize:20
		}
	}
	$scope.options23= {
		responsive: true,
		legend: {
			position: 'top',
			display:true
		},
		title:{
			display:true,
			text:'Flexibilzação'
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		tooltips:{
			titleFontSize:20
		}
	}

 	 


});