var testMethod = require('./helpers/test.method.js');
var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var Web3 = require('../packages/web3');

var clone = function (object) { return object ? JSON.parse(JSON.stringify(object)) : []; };


var method = 'sendTransaction';


var tests = [{
    args: [{
        from: '0xDBDBDb2Cbd23B783741E8D7FCf51E459B497E4A6', // checksum address
        to: '0xDBDBDb2Cbd23B783741E8D7FCf51E459B497E4A6', // checksum address
        value: '1234567654321',
        gasPrice: '324234234234'
    }],
    formattedArgs: [{
        from: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        to: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        value: "0x11f71f76bb1",
        gasPrice: "0x4b7dddc97a"
    }],
    result: '0x1234567',
    formattedResult: '0x1234567',
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x1234567',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_'+ method
},
// test with gasPrice missing
{
    args: [{
        Txtype: '0x1',
        from: '0xDBDBDb2Cbd23B783741E8D7FCf51E459B497E4A6', // checksum address
        to: '0xDBDBDb2Cbd23B783741E8D7FCf51E459B497E4A6', // checksum address
        value: '1234567654321'
    }],
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x1234567',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_gasPrice',
    formattedArgs: [],
    result: '0x1234567',
    formattedResult: '0x1234567',

    call2: 'eth_'+ method,
    formattedArgs2: [{
        Txtype: '0x1',
        from: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        to: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        value: "0x11f71f76bb1",
        gasPrice: "0x1234567"
    }],
    result2: '0x1234567'
},{
    args: [{
        Txtype: '0x1',
        from: '0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6',
        to: '0XDBDBDB2CBD23B783741E8D7FCF51E459B497E4A6',
        value: '1234567654321',
        data: '0x213453ffffff',
        gasPrice: '324234234234'
    }],
    formattedArgs: [{
        Txtype: '0x1',
        from: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        to: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        value: "0x11f71f76bb1",
        data: '0x213453ffffff',
        gasPrice: "0x4b7dddc97a"
    }],
    result: '0x12345678976543213456786543212345675432',
    formattedResult: '0x12345678976543213456786543212345675432',
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x12345678976543213456786543212345675432',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_'+ method
},{
    args: [{
        Txtype: '0x1',
        from: 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS', // iban address
        to: '0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6',
        value: '1234567654321',
        gasPrice: '324234234234'
    }],
    formattedArgs: [{
        Txtype: '0x1',
        from: "0x00c5496aee77c1ba1f0854206a26dda82a81d6d8",
        to: "0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6",
        value: "0x11f71f76bb1",
        gasPrice: "0x4b7dddc97a"
    }],
    result: '0x12345678976543213456786543212345675432',
    formattedResult: '0x12345678976543213456786543212345675432',
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x12345678976543213456786543212345675432',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_'+ method

// using local wallet
},{
    useLocalWallet: function (web3) {
        web3.eth.accounts.wallet.add('0xd7d364e720c129acb940439a84a99185dd55af6f6d105018a8acfb7f8c008142');
    },
    walletFrom: '0x5AF0838657202F865a4547B5Ed28A64F799960dc',
    args: [{
        Txtype: '0x1',
        from: '0x5AF0838657202F865a4547B5Ed28A64F799960dc',
        to: '0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6',
        value: '1234567654321',
        gasPrice: '324234234234',
        gas: 500000
    }],
    formattedArgs: ['0xf86c010a854b7dddc97a8307a12094dbdbdb2cbd23b783741e8d7fcf51e459b497e4a686011f71f76bb18025a07ccd4e67b5df8bcc7a6ae6bed71888850fb4c35c5b2df147f17e425172087eada0784eecd34daee773825844689a13ea0835e547149b4383e82a30ebd4fdd2560e'],
    result: '0x12345678976543213456786543212345675432',
    formattedResult: '0x12345678976543213456786543212345675432',
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x12345678976543213456786543212345675432',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_sendRawTransaction'
},{
    useLocalWallet: function (web3) {
        web3.eth.accounts.wallet.add('0xf7d364e720c129acb940439a84a99185dd55af6f6d105018a8acfb7f8c008142');
    },
    walletFrom: '0xe2873a6Be9bC50e70De4295D968459D4Acf515c0',
    args: [{
        Txtype: '0x1',
        from: 0,
        to: '0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6',
        value: '1234567654321',
        gasPrice: '324234234234',
        gas: 500000
    }],
    formattedArgs: ['0xf86c010a854b7dddc97a8307a12094dbdbdb2cbd23b783741e8d7fcf51e459b497e4a686011f71f76bb18026a00cb8a630d01997d6e6c1da581046be0bed78b16368e3ec2dad0d972b1b29d8aca021f9e84e97b9891968d0d78b954429da75697e683bead1f24a292a9b3b6b6727'],
    result: '0x12345678976543213456786543212345675432',
    formattedResult: '0x12345678976543213456786543212345675432',
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x12345678976543213456786543212345675432',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_sendRawTransaction'
},{
    useLocalWallet: function (web3) {
        web3.eth.accounts.wallet.add('0xa1d364e720c129acb940439a84a99185dd55af6f6d105018a8acfb7f8c008142');
    },
    walletFrom: '0xf65A29341fD9f8357E060F2E21bF3407062F2a46',
    args: [{
        Txtype: '0x1',
        from: {
            address: '0xf65A29341fD9f8357E060F2E21bF3407062F2a46',
            privateKey: '0xa1d364e720c129acb940439a84a99185dd55af6f6d105018a8acfb7f8c008142'
        },
        to: '0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6',
        value: '1234567654321',
        gasPrice: '324234234234',
        gas: 500000
    }],
    formattedArgs: ['0xf86c010a854b7dddc97a8307a12094dbdbdb2cbd23b783741e8d7fcf51e459b497e4a686011f71f76bb18025a00324b8edb232cdd3be04ff78983f5434a02f9497c16d2973c5361be7e21633dba028a8e5bce183af13a1a18411068258f0777ecbe9270d7ec7394f4c03eb76a44c'],
    result: '0x12345678976543213456786543212345675432',
    formattedResult: '0x12345678976543213456786543212345675432',
    notification: {
        method: 'eth_subscription',
        params: {
            subscription: '0x12345678976543213456786543212345675432',
            result: {
                blockNumber: '0x10'
            }
        }
    },
    call: 'eth_sendRawTransaction'
},{
    error: true, // only for testing
    args: [{
        Txtype: '0x1',
        from: 'XE81ETHXREGGAVOFYORK', // iban address
        to: '0xdbdbdb2cbd23b783741e8d7fcf51e459b497e4a6',
        value: '1234567654321'
    }],
    call: 'eth_'+ method
}];

testMethod.runTests('eth', method, tests);


// Test HTTPProvider with interval
describe(method, function () {
    tests.forEach(function (test, index) {
        it('promise test: ' + index, function (done) {

            // given
            var w3;
            var result;
            var provider = new FakeHttpProvider();
            var web3 = new Web3(provider);

            // skipp wallet tests
            if(test.useLocalWallet) {
                return done();
            }


            provider.injectResult(clone(test.result));
            provider.injectValidation(function (payload) {
                assert.equal(payload.jsonrpc, '2.0');
                assert.equal(payload.method, test.call);
                assert.deepEqual(payload.params, test.formattedArgs || []);
            });

            if (test.call2) {
                provider.injectResult(clone(test.result2));
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call2);
                    assert.deepEqual(payload.params, test.formattedArgs2 || []);
                });
            }

            provider.injectResult(null);
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'eth_getTransactionReceipt');
            });


            // if notification its sendTransaction, which needs two more results, subscription and receipt
            if(test.notification) {
                // inject receipt
                provider.injectResult({
                    "blockHash": "0x6fd9e2a26ab",
                    "blockNumber": "0x15df",
                    "transactionHash": "0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
                    "transactionIndex": "0x1",
                    "contractAddress": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
                    "cumulativeGasUsed": "0x7f110",
                    "gasUsed": "0x7f110"
                });
            }

            var args = clone(test.args);

            if(test.error) {

                assert.throws(function(){ web3.eth[method].apply(web3, args); });
                done();


            } else {

                result = web3.eth[method].apply(web3, args);

                result.then(function(result){
                    if(test.notification) {
                        // test receipt
                        assert.deepEqual(result, {
                            "blockHash": "0x6fd9e2a26ab",
                            "blockNumber": 5599,
                            "transactionHash":"0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
                            "transactionIndex":  1,
                            "contractAddress":"0x407d73D8A49EEB85d32cF465507DD71D507100C1", // checksum address
                            "cumulativeGasUsed": 520464,
                            "gasUsed": 520464
                        });
                    } else {
                        assert.deepEqual(result, test.formattedResult);
                    }

                    done();
                });
            }

        });

        it('callback test: ' + index, function (done) {

            // given
            var w3;
            var provider = new FakeHttpProvider();
            var web3 = new Web3(provider);

            // add a wallet
            if(test.useLocalWallet) {
                return done();
            }

            provider.injectResult(clone(test.result));
            provider.injectValidation(function (payload) {
                assert.equal(payload.jsonrpc, '2.0');
                assert.equal(payload.method, test.call);
                assert.deepEqual(payload.params, test.formattedArgs || []);
            });

            if (test.call2) {
                provider.injectResult(clone(test.result2));
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call2);
                    assert.deepEqual(payload.params, test.formattedArgs2 || []);
                });
            }


            provider.injectResult(null);
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'eth_getTransactionReceipt');
            });


            // if notification its sendTransaction, which needs two more results, subscription and receipt
            if(test.notification) {
                // inject receipt
                provider.injectResult({
                    "blockHash": "0x6fd9e2a26ab",
                    "blockNumber": "0x15df",
                    "transactionHash": "0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
                    "transactionIndex": "0x1",
                    "contractAddress": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
                    "cumulativeGasUsed": "0x7f110",
                    "gasUsed": "0x7f110"
                });
            }

            var args = clone(test.args);

            if(test.error) {
                assert.throws(function(){ web3.eth[method].apply(web3, args); });

                done();

            } else {
                // add callback
                args.push(function (err, result) {
                    assert.deepEqual(result, test.formattedResult);

                    done();
                });

                web3.eth[method].apply(web3, args);
            }
        });
    });
});
