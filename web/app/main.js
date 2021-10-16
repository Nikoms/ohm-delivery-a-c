angular
  .module("ohm-delivery", [])
  .filter("humanize", function () {
    return function (input) {
      return input.toLowerCase().replaceAll("_", " ");
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
    $scope.getResistance = function () {
      $http.get(`http://localhost:3000/ohms/${this.trackingId}`).then(
        (result) => {
          $scope.resistance = result.data;
          $scope.errorMessage = '';
        },
        (error) => {
          $scope.resistance = null;
          $scope.errorMessage = "This tracking code is not valid";
        }
      );
    };
    $scope.addComment = function () {
      $http.post(`http://localhost:3000/ohms/${this.trackingId}/comments`, {comment: this.newComment}).then(
        (result) => {
          this.newComment = null;
          $scope.resistance = result.data;
          $scope.errorMessage = '';
        },
        (error) => {
          $scope.errorMessage = "Cannot add comment";
        }
      );
    };
  });
