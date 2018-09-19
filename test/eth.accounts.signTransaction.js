var FakeHttpProvider = require('./helpers/FakeIpcProvider');
var Web3 = require('../packages/web3');
var Accounts = require("./../packages/web3-eth-accounts");
var ethjsSigner = require("wanjs-signer");
var chai = require('chai');
var assert = chai.assert;

var clone = function (object) { return object ? JSON.parse(JSON.stringify(object)) : []; };

var tests = [
    {
        address: '0x2C7536e3605d9c16A7A3d7B1898E529396A65C23',
        iban: 'XE0556YCRTEZ9JALZBSCXOK4UJ5F3HN03DV',
        privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 0,
            gasPrice: "20000000000",
            gas: 21000,
            to: '0xf0109Fc8df283027B6285CC889f5Aa624eAc1f55',
            toIban: 'XE04S1IRT2PR8A8422TPBL9SR6U0HODDCUT', // will be switched to "to" in the test
            value: "1000000000",
            data: ""
        },
        // signature from eth_signTransaction
        rawTransaction: "0xf86901808504a817c80082520894f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008026a055763a8674e8efdcbd32a7b8bb4986112397440c7ec9ed748c45e6f69c3c9c47a035131508efc0453a65b332d6b38fd680bc60e3aa67f926dbbbbe4f015aa8a4f8",
        oldSignature: "0xf868808504a817c80082520894f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008026a0afa02d193471bb974081585daabf8a751d4decbb519604ac7df612cc11e9226da04bf1bd55e82cebb2b09ed39bbffe35107ea611fa212c2d9a1f1ada4952077118"
    },
    {
            address: '0x2C7536e3605d9c16A7A3d7B1898E529396A65C23',
            iban: 'XE0556YCRTEZ9JALZBSCXOK4UJ5F3HN03DV',
            privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
            transaction: {
                Txtype: '0x01',
                chainId: 1,
                nonce: 0,
                gasPrice: "0",
                gas: 31853,
                to: '0xf0109Fc8df283027B6285CC889f5Aa624eAc1f55',
                toIban: 'XE04S1IRT2PR8A8422TPBL9SR6U0HODDCUT', // will be switched to "to" in the test
                value: "0",
                data: ""
            },
            // expected r and s values from signature
            r: "0x22f17b38af35286ffbb0c6376c86ec91c20ecbad93f84913a0cc15e7580cd9",
            s: "0x83d6e12e82e3544cb4439964d5087da78f74cefeec9a450b16ae179fd8fe20",
            // signature from eth_signTransaction
            rawTransaction: "0xf860018080827c6d94f0109fc8df283027b6285cc889f5aa624eac1f55808026a0dd1c913365b685abf7dac44caa6f11aded41a605c51af35286f33d1362fd0502a03e453ac9f52a11c73ee0c5b8a933fd52146341d091df6a4f7deaceace0dfb174",
            oldSignature: "0xf85d8080827c6d94f0109fc8df283027b6285cc889f5aa624eac1f558080269f22f17b38af35286ffbb0c6376c86ec91c20ecbad93f84913a0cc15e7580cd99f83d6e12e82e3544cb4439964d5087da78f74cefeec9a450b16ae179fd8fe20"
    },
    {
        address: '0x2C7536e3605d9c16A7A3d7B1898E529396A65C23',
        iban: 'XE0556YCRTEZ9JALZBSCXOK4UJ5F3HN03DV',
        privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 0,
            gasPrice: "234567897654321",
            gas: 2000000,
            to: '0xf0109Fc8df283027B6285CC889f5Aa624eAc1f55',
            toIban: 'XE04S1IRT2PR8A8422TPBL9SR6U0HODDCUT', // will be switched to "to" in the test
            value: "1000000000",
            data: ""
        },
        // expected r and s values from signature
        r: "0x9ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9c",
        s: "0x440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428",
        // signature from eth_signTransaction
        rawTransaction: "0xf86b018086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008026a0eaffda797624746520f3a1641bb53621662ed2abe60f1b7805ebb83bac8a209fa055316b2dfc04b25d380f6a12c11e9fcb4104a95fe41a79e7a5744c6d2b74bef1",
        oldSignature: "0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428"
    },
    {
        address: '0x2C7536e3605d9c16A7A3d7B1898E529396A65C23',
        iban: 'XE0556YCRTEZ9JALZBSCXOK4UJ5F3HN03DV',
        privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 0,
            gasPrice: "0",
            gas: 31853,
            to: '0xf0109Fc8df283027B6285CC889f5Aa624eAc1f55',
            toIban: 'XE04S1IRT2PR8A8422TPBL9SR6U0HODDCUT', // will be switched to "to" in the test
            value: "0",
            data: ""
        },
        // expected r and s values from signature
        r: "0x22f17b38af35286ffbb0c6376c86ec91c20ecbad93f84913a0cc15e7580cd9",
        s: "0x83d6e12e82e3544cb4439964d5087da78f74cefeec9a450b16ae179fd8fe20",
        // signature from eth_signTransaction
        rawTransaction: "0xf860018080827c6d94f0109fc8df283027b6285cc889f5aa624eac1f55808026a0dd1c913365b685abf7dac44caa6f11aded41a605c51af35286f33d1362fd0502a03e453ac9f52a11c73ee0c5b8a933fd52146341d091df6a4f7deaceace0dfb174",
        oldSignature: "0xf85d8080827c6d94f0109fc8df283027b6285cc889f5aa624eac1f558080269f22f17b38af35286ffbb0c6376c86ec91c20ecbad93f84913a0cc15e7580cd99f83d6e12e82e3544cb4439964d5087da78f74cefeec9a450b16ae179fd8fe20"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        iban: 'XE25RG8S3H5TX5RD7QTL5UPVW90AHN2VYDC',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 0,
            gasPrice: "20000000000",
            gas: 21000,
            to: '0x3535353535353535353535353535353535353535',
            toIban: 'XE4967QZMA14MI680T89KSPPJEJMU68MEYD', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: ""
        },
        // signature from eth_signTransaction
        rawTransaction: "0xf86d01808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a0043f386f6b3048983be90dc80503ac734c8df4f8083427093e86a8a1d065f33fa0236d36ee792eb0aaf5011f845c1f2050f2132024c70da326c0a0465cf91a7c54",
        oldSignature: "0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a7640000801ba0300e0d8f83ac82943e468164fa80236fdfcff21f978f66dd038b875cea6faa51a05a8e4b38b819491a0bb4e1f5fb4fd203b6a1df19e2adbec2ebdddcbfaca555f0"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 0,
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871018085358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd26a0a6d98392a4fba2e7cbdeaa472ce4f2059b7b21b97afaa64fbcad7aacfb32dfbba02c74390357f16f6f6bd0dd38e1f7d53b00364db00cfe2bb7fb01e373670f1efd",
        oldSignature: "0xf8708085358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd1ba081bba037015419ab5ce36e930b987da71b0ed5f0efb1849613223bf72399f598a05d2c1f109ad13f98a7693cfc35291e404ea8795755a176eb58a818de44f3756d"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 10,
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871010a85358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a0a9a7de28e48550ce0ac17ba425ac36d32dcdd0d03cc7545af0f534085e9b26cda005b9a9d4e756d90d9e2aa56bffd7fd01abd5e8ade441a307c569b671e2e877ab",
        oldSignature: "0xf8700a85358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a0496e628e8348a24312ded09ee3d99d85b1b8f947725aa382dcf4003b7389d5aaa00c1b1cfdd66c510fd708d33279a1a61e53dff3c6ced67cf7f7b830862d6e2029"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: '0xa',
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871010a85358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a0a9a7de28e48550ce0ac17ba425ac36d32dcdd0d03cc7545af0f534085e9b26cda005b9a9d4e756d90d9e2aa56bffd7fd01abd5e8ade441a307c569b671e2e877ab",
        oldSignature: "0xf8700a85358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a0496e628e8348a24312ded09ee3d99d85b1b8f947725aa382dcf4003b7389d5aaa00c1b1cfdd66c510fd708d33279a1a61e53dff3c6ced67cf7f7b830862d6e2029"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: '16',
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871011085358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a06787579b31567e5f7fd4f9522f5bd67890790a39f8b3534d5d1e231ba7d7a28ba01b5fdd80a57932bbd1f0a26b62d61840000cdd0577b7aca95aba720426bab0db",
        oldSignature: "0xf8701085358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a04ba217e16f62ac277698e8853bcc010db07285b457606e9f3487c70ccc5e6508a05c6cfaa17fc1a52bede0cf25c8bd2e024b4fb89ed205f62cb3e177a83654f29d"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: 16,
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871011085358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a06787579b31567e5f7fd4f9522f5bd67890790a39f8b3534d5d1e231ba7d7a28ba01b5fdd80a57932bbd1f0a26b62d61840000cdd0577b7aca95aba720426bab0db",
        oldSignature: "0xf8701085358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a04ba217e16f62ac277698e8853bcc010db07285b457606e9f3487c70ccc5e6508a05c6cfaa17fc1a52bede0cf25c8bd2e024b4fb89ed205f62cb3e177a83654f29d"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: '0x16',
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871011685358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a025fb7b577c0ea16dc06c43cefeebcfa8f9386f41f71f39b7a30b4417e5e14dbca04fb973d64a1858aea7bc5a6bae485d5455481f92b2472286032ee6538b7b655c",
        oldSignature: "0xf8701685358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd26a0e027ec9e9921975678b73de44f7d2cd6b987a6655b9d0291b2cdff15836c6efba051b4e20835793bf0cdf268339111a24d80a4a7bb141e975a66d0edbcc20542d0"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            Txtype: '0x01',
            chainId: 1,
            nonce: '0x16',
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            input: "0x0123abcd"
        },
        // web3.eth.signTransaction({from: "0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0", gasPrice: "230000000000", gas: "50000", to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C', value: "1000000000000000000", data: "0x0123abcd"}).then(console.log);
        // signature from eth_signTransaction
        rawTransaction: "0xf871011685358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd25a025fb7b577c0ea16dc06c43cefeebcfa8f9386f41f71f39b7a30b4417e5e14dbca04fb973d64a1858aea7bc5a6bae485d5455481f92b2472286032ee6538b7b655c",
        oldSignature: "0xf8701685358d117c0082c35094fcad0b19bb29d4674531d6f115237e16afce377c880de0b6b3a7640000840123abcd26a0e027ec9e9921975678b73de44f7d2cd6b987a6655b9d0291b2cdff15836c6efba051b4e20835793bf0cdf268339111a24d80a4a7bb141e975a66d0edbcc20542d0"
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 2,
            gasPrice: "20000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd",
            input: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 2,
            gasPrice: "0A",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 2,
            gasPrice: "200000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "test"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 2,
            gasPrice: "A",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 'a',
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: -1,
            nonce: 1,
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: -1,
            nonce: 0,
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: -2,
            gasPrice: "230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 0,
            gasPrice: "-230000000000",
            gas: 50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
    {
        address: '0xeb014F8C8b418dB6B45774C326a0e64c78914Dc0',
        privateKey: '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
        transaction: {
            chainId: 1,
            nonce: 0,
            gasPrice: "230000000000",
            gas: -50000,
            to: '0xfcaD0b19Bb29d4674531D6F115237e16aFce377C',
            toIban: 'XE63TIJX31ZHSLZ6F601ZPKVDKKYHMIK03G', // will be switched to "to" in the test
            value: "1000000000000000000",
            data: "0x0123abcd"
        },
        error: true
    },
];

describe("eth", function () {
    describe("accounts", function () {

        // For each test
        tests.forEach(function (test, i) {
            if (test.error) {

                it("signTransaction must error", function(done) {
                    var ethAccounts = new Accounts();

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    testAccount.signTransaction(test.transaction).catch(function (err) {
                        assert.instanceOf(err, Error);
                        done();
                    });
                });

            } else {

                it("signTransaction must compare to eth_signTransaction", function(done) {
                    var ethAccounts = new Accounts();

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    testAccount.signTransaction(test.transaction).then(function (tx) {
                        assert.equal(tx.rawTransaction, test.rawTransaction);
                        done();
                    });
                });

                it("signTransaction using the iban as \"to\" must compare to eth_signTransaction", function(done) {
                    var ethAccounts = new Accounts();

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    var transaction = clone(test.transaction);
                    transaction.to = transaction.toIban;
                    delete transaction.toIban;
                    testAccount.signTransaction(transaction).then(function (tx) {
                        assert.equal(tx.rawTransaction, test.rawTransaction);
                        done();
                    });
                });

                it("signTransaction will call for nonce", function(done) {
                    var provider = new FakeHttpProvider();
                    var web3 = new Web3(provider);

                    provider.injectResult('0xa');
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, 'eth_getTransactionCount');
                        assert.deepEqual(payload.params, [test.address, "latest"]);
                    });

                    var ethAccounts = new Accounts(web3);

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    var transaction = clone(test.transaction);
                    delete transaction.nonce;
                    testAccount.signTransaction(transaction)
                    .then(function (tx) {
                        assert.isObject(tx);
                        assert.isString(tx.rawTransaction);

                        done();
                    });
                });

                it("signTransaction will call for gasPrice", function(done) {
                    var provider = new FakeHttpProvider();
                    var web3 = new Web3(provider);

                    provider.injectResult('0x5022');
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, 'eth_gasPrice');
                        assert.deepEqual(payload.params, []);
                    });

                    var ethAccounts = new Accounts(web3);

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    var transaction = clone(test.transaction);
                    delete transaction.gasPrice;
                    testAccount.signTransaction(transaction)
                    .then(function (tx) {
                        assert.isObject(tx);
                        assert.isString(tx.rawTransaction);

                        done();
                    });
                });

                it("signTransaction will call for chainId", function(done) {
                    var provider = new FakeHttpProvider();
                    var web3 = new Web3(provider);

                    provider.injectResult(1);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, 'net_version');
                        assert.deepEqual(payload.params, []);
                    });

                    var ethAccounts = new Accounts(web3);

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    var transaction = clone(test.transaction);
                    delete transaction.chainId;
                    testAccount.signTransaction(transaction)
                    .then(function (tx) {
                        assert.isObject(tx);
                        assert.isString(tx.rawTransaction);

                        done();
                    });
                });

                it("signTransaction will call for nonce, gasPrice and chainId", function(done) {
                    var provider = new FakeHttpProvider();
                    var web3 = new Web3(provider);

                    provider.injectResult(1);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, 'net_version');
                        assert.deepEqual(payload.params, []);
                    });
                    provider.injectResult(1);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, 'eth_gasPrice');
                        assert.deepEqual(payload.params, []);
                    });
                    provider.injectResult(1);
                    provider.injectValidation(function (payload) {
                        assert.equal(payload.jsonrpc, '2.0');
                        assert.equal(payload.method, 'eth_getTransactionCount');
                        assert.deepEqual(payload.params, [test.address, "latest"]);
                    });

                    var ethAccounts = new Accounts(web3);

                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    var transaction = clone(test.transaction);
                    delete transaction.chainId;
                    delete transaction.gasPrice;
                    delete transaction.nonce;
                    testAccount.signTransaction(transaction)
                    .then(function (tx) {
                        assert.isObject(tx);
                        assert.isString(tx.rawTransaction);

                        done();
                    });
                });

                it("recoverTransaction, must recover signature", function() {
                    var ethAccounts = new Accounts();
                    var testAccount = ethAccounts.privateKeyToAccount(test.privateKey);
                    assert.equal(testAccount.address, test.address);

                    testAccount.signTransaction(test.transaction).then(function (tx) {
                        assert.equal(ethAccounts.recoverTransaction(tx.rawTransaction), test.address);
                    });
                });

                it("recoverTransaction, must also recover old signature from eth-signer", function() {
                    var ethAccounts = new Accounts();

                    var oldSignature = ethjsSigner.sign(test.transaction, test.privateKey);
                    assert.equal(ethAccounts.recoverTransaction(oldSignature), test.address);
                });
            }
        });
    });
});
