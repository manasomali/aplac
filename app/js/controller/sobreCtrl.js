app.controller('sobreCtrl', function($scope,$rootScope, $location)
{
   $rootScope.activetab = $location.path();

   $scope.openDoc=function()
   {
   	window.open("https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/docs/apresentacao_APLAC.pdf");
   	window.open("https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/docs/MAP.pdf");
   	window.open("https://gese.florianopolis.ifsc.edu.br/consumidorlivre/aplac/app/docs/esquema_APLAC.pdf");
   }
});