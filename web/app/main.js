angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            $http.get(`http://localhost:3000/ohms/${this.trackingId}`)
            .then((error) => {
                this.errorMessage = 'Oops, this website is under construction, please come back later.';
            }, (result) => {
                this.errorMessage = '';
            });
        };
    });