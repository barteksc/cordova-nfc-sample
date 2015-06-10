(function () {
    'use strict';
    angular.module('nfcApp')
        .service('Util', Util);

    Util.$inject = ['CONFIG', '$q'];

    function Util(CONFIG, $q) {
        this.tagEncode = function (data) {
            return nfc.stringToBytes(JSON.stringify(data));
        };

        this.tagDecode = function (data) {
            return JSON.parse(nfc.bytesToString(data));
        };

        this.encodeAndWriteNdef = function (data) {
            var encoded = this.mimeRecord(data);
            var deferred = $q.defer();
            nfc.write([encoded], function (ev) {
                deferred.resolve(ev);
            }, function (ev) {
                deferred.reject(ev);
            });
            return deferred.promise;
        };

        this.mimeRecord = function (data) {
            return ndef.mimeMediaRecord(CONFIG.MIME_TYPE, this.tagEncode(data));
        };

        this.getTagData = function (tag) {
            var rawData = tag.ndefMessage;
            if (rawData.length) {
                return this.tagDecode(rawData[0].payload);
            }
            return {};
        };

        this.showToast = function (msg) {
            window.plugins.toast && window.plugins.toast.showShortBottom(msg);
        };
    }
}());