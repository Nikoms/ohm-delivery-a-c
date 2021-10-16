angular
  .module("ohm-delivery", [])
  .filter('humanize', function() {
    return function(input) {
      return input.toLowerCase().replaceAll('_', ' ');
    };
  })
  .controller("tracking", function ($scope, $http) {
    $scope.changeStatus = function (status) {
      let rejectionReason = "";
      if (status == "REFUSED") {
        rejectionReason = prompt("Why did the customer refuse the parcel?");
      }

      $http
        .patch(`http://localhost:3000/ohms/${this.trackingId}`, {
          status,
          rejectionReason
        })
        .then(
          (result) => {
            $scope.resistance = result.data;
          },
          (error) => {
            $scope.errorMessage = "Cannot change the status of this parcel";
          }
        );
    };
    $scope.sendData = function () {
      $http.get(`http://localhost:3000/ohms/${this.trackingId}`).then(
        (result) => {
          $scope.resistance = result.data;
        },
        (error) => {
          $scope.errorMessage = "Cannot fetch the data from server";
        }
      );
    };
  });
