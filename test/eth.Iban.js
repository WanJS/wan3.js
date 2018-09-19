var chai = require('chai');
var assert = chai.assert;
var Eth = require('../packages/web3-eth');
var eth = new Eth();

var tests = [
    {
        direct: 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS',
        address: '0x00C5496AeE77c1Ba1F0854206a26dDa82A81d6d8' // checksum address
    },
    {
        direct: 'XE1222Q908LN1QBBU6XUQSO1OHWJIOS46OO',
        address: '0x11C5496aee77C1Ba1F0854206A26DdA82a81d6d8'
    },
    {
        direct: 'XE75JRZCTTLBSYEQBGAS7GID8DKR7QY0QA3',
        address: '0xA94F5374fCE5EDbc8e2A8697c15331677E6eBf0b' // checksum address
    },
    {
        error: true,
        direct: 'XE81ETHXREGGAVOFYORK',
        address: '0xHELLO' // checksum address
    }
];

describe('eth', function () {
    describe('Iban', function () {
        tests.forEach(function (test) {
            it('toAddress() should transform iban to address: ' +  test.address, function () {
                if(test.error) {
                    assert.throws(eth.Iban.toAddress.bind(eth.Iban, test.direct));
                } else {
                    assert.deepEqual(eth.Iban.toAddress(test.direct), test.address);
                }
            });
            it('toIban() should transform address to iban: ' +  test.address, function () {
                if(test.error) {
                    assert.throws(eth.Iban.toIban.bind(eth, test.address));
                } else {
                    assert.deepEqual(eth.Iban.toIban(test.address), test.direct);
                }
            });
        });
    });
});

