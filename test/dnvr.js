const DNVR = artifacts.require('DNVR');

contract('dnvr', (accounts) => {
  let contract;
  const fundingAccount = accounts[0];
  const interacAccount = accounts[1];
  const fundingSize = 1000000;

  beforeEach(async () => {
    contract = await DNVR.new({from: fundingAccount});
    await contract.fund({from: fundingAccount, value: fundingSize});
    assert.equal(await contract.owner(), fundingAccount);
    assert.equal(await contract.name(), "DNVR Capital Token");
    assert.equal(await contract.symbol(), "DNVR");
    assert.equal(await contract.version(), "H1.0");
    assert.equal(web3.eth.getBalance(contract.address).toNumber(), fundingSize);
  });

  afterEach(async () => {
    await contract.kill({from: fundingAccount});
  });

  it('#totalSupply', async () => {
    let tx = await contract.totalSupply({from: fundingAccount});
    assert.equal(tx.valueOf(), fundingSize);
  });

  it('#balanceOf', async () => {
    let tx = await contract.balanceOf(fundingAccount);
    assert.equal(tx.valueOf(), fundingSize);
  });
});
