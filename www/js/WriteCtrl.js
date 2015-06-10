(function () {
    'use strict';

    angular.module('nfcApp')
        .controller('WriteCtrl', WriteCtrl);

    WriteCtrl.$inject = ['$scope', 'Util'];

    function WriteCtrl($scope, Util) {
        var vm = this;
        vm.textData = '{"id":5,"title":"NFC"}';

        function ndefListener(event) {

            try {
                var jsonData = JSON.parse(vm.textData);
                Util.encodeAndWriteNdef(jsonData)
                    .then(function () {
                        Util.showToast('Data written');
                    })
                    .catch(function () {
                        Util.showToast('Error writing data');
                    });
            } catch (ex) {
                Util.showToast('Invalid JSON');
            }
        }

        $scope.$on('$ionicView.enter', function () {
            ionic.Platform.ready(function () {
                nfc.addNdefListener(ndefListener);
            });
        });
        $scope.$on('$ionicView.leave', function () {
            nfc.removeNdefListener(ndefListener);
        });
    }
}());