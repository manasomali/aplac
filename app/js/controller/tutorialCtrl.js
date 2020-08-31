app.controller('tutorialCtrl', function($scope,$rootScope, $location)
{
   $rootScope.activetab = $location.path();
   
});