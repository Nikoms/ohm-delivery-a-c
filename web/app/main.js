angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        $scope.sendData = function() {
            $http.get(`http://localhost:3000/ohms/${this.trackingId}`)
            .then((result) => {
                this.resistance = result.data;
            }, (error) => {
                this.errorMessage = 'Cannot fetch the data from server';
            });
        };
    });