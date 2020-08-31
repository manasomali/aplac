app.controller('mercadoCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});