(function () {
    'use strict';
    angular.module('nfcApp')
        .controller('ReadCtrl', ReadCtrl);

    ReadCtrl.$inject = ['$scope', 'Util', 'CONFIG'];

    function ReadCtrl($scope, Util, CONFIG) {
        var vm = this;
        vm.jsonData = {};

        function mimeListener(event) {
            Util.showToast('Data read');
            console.log(event.tag);
            vm.jsonData = Util.getTagData(event.tag);
            $scope.$digest();
        }

        $scope.$on('$ionicView.enter', function () {
            ionic.Platform.ready(function () {
                nfc.addMimeTypeListener(
                    CONFIG.MIME_TYPE,
                    mimeListener,
                    function (ev) { //success

                    }, function (ev) { //fail
                        Util.showToast('NFC disabled');
                    });
            });
        });
        $scope.$on('$ionicView.leave', function () {
            nfc.removeMimeTypeListener(CONFIG.MIME_TYPE, mimeListener);
        });
    }
}());