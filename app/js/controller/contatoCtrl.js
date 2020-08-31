app.controller('contatoCtrl', function($http,$scope,$rootScope, $location)
{
	$rootScope.activetab = $location.path();
	$scope.usuario=$localStorage.usuario;
	$scope.enviar=function()
	{
		$http({
			method: 'POST',
			url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/post/contato.php',
			headers: {
				'Content-Type': undefined
			},
			data: { "nome" : $scope.contato.nome, "assunto" : $scope.contato.assunto, "email":$scope.contato.email, "mensagem":$scope.contato.mensagem}
		})
		.then(function(response){
			alert(response.data);
		}, function(){
		});
	}

});