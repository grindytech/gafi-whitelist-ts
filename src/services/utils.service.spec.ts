import { is_pool } from "./utils.service";

describe('Utils', () => {
    beforeEach((done) => {
        done();
    });

    it('is pool id work', async () => {
        let id = "88d3695c08497c63237adf39410ded9b156545d4734967e4e407c40e58af437b";
        expect(is_pool(id)).toEqual(true);
    })
})