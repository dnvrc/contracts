const pryj = require('pryjs');
const DNVR = artifacts.require('DNVR');

contract('dnvr', (accounts) => {
  let contract;
  const fundingAccount = accounts[0];
  const investrAccount = accounts[1];
  const fundingSize = 100;

  beforeEach(async () => {
    contract = await DNVR.new({from: fundingAccount});

    // Unpause the contract
    await contract.pause.call();

    let tx = await contract.getPaused({from: fundingAccount});
    assert.equal(tx.valueOf(), true);
  });

  afterEach(async () => {
    await contract.kill({from: fundingAccount});
  });

  it('instance variables', async () => {
    assert.equal(await contract.owner(), fundingAccount);
    assert.equal(await contract.name(), "DNVR Capital Token");
    assert.equal(await contract.symbol(), "DNVR");
    assert.equal(await contract.version(), "H1.0");
    assert.equal(await contract.decimals(), 18);
  });

  it('#fund', async () => {
    await contract.fund({from: investrAccount, value: 1e+18});

    const balAcct = web3.eth.getBalance(contract.address).toNumber();
    const balEthr = web3.fromWei(balAcct, "ether");

    assert.equal(balEthr, 1);

    const conBal = await contract.balanceOf(investrAccount);
    const conEthr = web3.fromWei(conBal, "ether");
    assert.equal(conEthr, 1);
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
