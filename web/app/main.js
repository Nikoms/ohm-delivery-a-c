angular
  .module("ohm-delivery", [])
  .controller("tracking", function ($scope, $http) {
    $scope.changeStatus = function (status) {
      let details = "";
      if (status == "REFUSED") {
        details = prompt("Why did the customer refuse the parcel?");
      }

      $http
        .patch(`http://localhost:3000/ohms/${this.trackingId}`, {
          status,
          details
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
