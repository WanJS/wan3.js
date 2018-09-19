var chai = require('chai');
var utils = require('../packages/web3-utils');

var assert = chai.assert;

var tests = [
    { value: '0x52908400098527886e0f7030069857d2e4169ee7', is: true },
    { value: '0x8617e340b3d01fa5f11f306f4090fd50e238070d', is: true },
    { value: '0xDE709F2102306220921060314715629080E2FB77', is: true },
    { value: '0x27B1FDB04752BBC536007A920D24ACB045561C26', is: true },
    { value: '0x5AaEB6053f3e94c9B9a09F33669435e7eF1bEaED', is: true },
    { value: '0xFb6916095CA1DF60Bb79cE92Ce3eA74C37C5D359', is: true },
    { value: '0xDBf03b407C01e7Cd3cbEA99509D93F8dddc8c6fb', is: true },
    { value: '0xd1220a0CF47C7b9bE7a2e6ba89f429762E7B9AdB', is: true },
    { value: '0XD1220A0CF47C7B9BE7A2E6BA89F429762E7B9ADB', is: false },
    { value: '0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb', is: false }
];

describe('lib/utils/utils', function () {
    describe('checkAddressChecksum', function () {
        tests.forEach(function (test) {
            it('shoud test if address ' + test.value + ' passes checksum: ' + test.is, function () {
                assert.equal(utils.checkAddressChecksum(test.value), test.is);
            });
        });
    });
});

