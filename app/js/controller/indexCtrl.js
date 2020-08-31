 app.controller('indexCtrl', function($scope,$http,$localStorage,$sessionStorage) {

 	$scope.usuario=$localStorage.usuario;

 	$scope.registrar=function()
 	{
 		if($scope.registro.senha==$scope.registro.senhac)
 		{
 			$http( {
 				method: 'POST',
 				url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/post/registro.php',
 				headers: {
 					'Content-Type': undefined
 				},
 				data: { "usuario" : $scope.registro.usuario, 
 				"nome" : $scope.registro.nome ,
 				"sobrenome" :$scope.registro.sobrenome,
 				"ocupacao": $scope.registro.ocupacao,
 				"instituicao": $scope.registro.instituicao,
 				"cargo": $scope.registro.cargo,
 				"senha" : $scope.registro.senha,
 				"email": $scope.registro.email
 			}
 		})
 			.then(function(response){
 				alert("Cadastro realizado com sucesso!");
 				$scope.registro=null;
 				$scope.registro=false;
 				$('#mylog').modal('hide');
 			}, function(){
 				alert("Falhou");
 			});
 		}
 		else
 		{
 			alert("As senhas não conferem!");
 		}
 	};

 	$scope.logar=function()
 	{
 		$http({
 			method: 'POST',
 			url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/login.php',
 			headers: {
 				'Content-Type': undefined
 			},
 			data: { "usuario" : $scope.login.usuario, "senha" : $scope.login.senha}
 		})
 		.then(function(response){
 			$scope.usuario=response.data;
 			$scope.usuario.status=true;
 			$localStorage.usuario=$scope.usuario;
 			$('#mylog').modal('hide');
 			window.location.reload();
 		}, function(){
 			alert("Senha ou usuario incorreto");
 		});
 	}
 	$scope.logout=function()
 	{
 		$scope.usuario=null;
 		$localStorage.$reset();
 		window.location.reload();
 	}

 	$scope.alterarSenha=function()
 	{
 		if($scope.alterarSenha.nsenha==$scope.alterarSenha.csenha)
 		{
 			$http({
 			method: 'POST',
 			url: 'https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/php/db/get/alterarSenha.php',
 			headers: {
 				'Content-Type': undefined
 			},
 			data: { "usuario" : $scope.usuario.id, "senha" : $scope.alterarSenha.senha , "senhan" : $scope.alterarSenha.nsenha}
 		})
 		.then(function(response){
 			$scope.alter=response.data;
 			console.log($scope.alter);
 			if ($scope.alter=="1")
 			{
 				alert("Senha alterada com sucesso!");
 				$location.path("/");
 			}else
 			{
 				alert("A senha informada não confere!");
 			}
 			
 		}, function(){
 			
 		});

 		}
 		else
 		{
 			alert("As senhas não conferem");
 		}
 	}



 });