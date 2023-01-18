const { validateAddress } = require('@polkadot/util-crypto');

const { hex_to_ss58 } = require("./key");

describe('Key', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });

    it('should get valid ss58 address', function (done) {

        expect(hex_to_ss58("d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d", 42)).toEqual("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");
        done();
    })

    it('it should validate address', function (done) {
        expect(validateAddress("0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d", false, 42)).toEqual(true);
        done();
    })
})