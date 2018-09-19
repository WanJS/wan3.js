var chai = require('chai');
var assert = chai.assert;
var Iban = require('../packages/web3-eth-iban');

var tests = [
    { direct: 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS', address: '0x00C5496AeE77c1Ba1F0854206a26dDa82A81d6d8'}
];

describe('lib/web3/iban', function () {
    describe('Iban.toAddress()', function () {
        tests.forEach(function (test) {
            it('shoud transform iban to address: ' +  test.address, function () {
                assert.deepEqual(Iban.toAddress(test.direct), test.address);
            });
        });
    });
    describe('iban instance address()', function () {
        tests.forEach(function (test) {
            it('shoud transform iban to address: ' +  test.address, function () {
                var iban = new Iban(test.direct);
                assert.deepEqual(iban.toAddress(), test.address);
            });
        });
    });
});

