const DNVR = artifacts.require('DNVR');

contract('dnvr', (accounts) => {
  it('#getSupply', () => {
    return DNVR.deployed().then((instance) => {
      return instance.getSupply.call();
    }).then((balance) => {
      assert.equal(balance.valueOf(), 10000000000000000, "10000000000000000 wasn't in the first account");
    });
  });
});
