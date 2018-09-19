var testMethod = require('./helpers/test.method.js');

var method = 'getAccounts';
var call = 'eth_accounts';

var tests = [{
    result: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855', '0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae'],
    formattedResult: ['0x47d33B27bB249A2dbAB4c0612bf9cAf4c1950855', '0x11F4D0a3C12E86b4B5f39b213f7e19d048276daE'],
    call: call
},
{
    result: ['0x11F4D0a3C12E86b4B5f39b213f7e19d048276daE', '0x11F4D0a3C12E86b4B5f39b213f7e19d048276daE'],
    formattedResult: ['0x11F4D0a3C12E86b4B5f39b213f7e19d048276daE', '0x11F4D0a3C12E86b4B5f39b213f7e19d048276daE'],
    call: call
}];


testMethod.runTests('eth', method, tests);

