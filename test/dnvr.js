const pryj = require('pryjs');
const DNVR = artifacts.require('DNVR');

const truffleAssert = require('truffle-assertions');

contract('dnvr', (accounts) => {
  let contract;

  const fundingAccount = accounts[0];
  const investrAccount = accounts[1];
  const watcherAccount = accounts[5];
  const fundingSize = 1000000;

  // const ether = 1; // 1 ether is 1e+18, or 1000000000000000000

  beforeEach(async () => {
    contract = await DNVR.new({from: fundingAccount});

    let state = await contract.getPaused.call();
    assert.equal(state, true);
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
    // Unpause the contract
    await contract.unpause();

    let state = await contract.getPaused.call();
    assert.equal(state, false);

    // Send ETH to contract from Investor, 1 ether
    await contract.fund({from: investrAccount, value: 1e+18}).then((events) => {
      assert.equal(events.logs.length, 1);
      assert.equal(events.logs[0].args._value.toNumber(), 1e+18);
    });

    // Get contracts new balance
    const balAcct = web3.eth.getBalance(contract.address).toNumber();
    assert.equal(balAcct, 1e+18);

    console.log(`investor: ${investrAccount} address.`);
    console.log(`contract: ${contract.address} address.`)

    // Check the balance of the investor
    const conBal = await contract.balanceOf(investrAccount);
    const conEthr = web3.fromWei(conBal, "ether");
    assert.equal(conEthr.toNumber(), 1);

    // Check the balance of the owner
    const ownBal = await contract.balanceOf(fundingAccount);
    const totSup = await contract.totalSupply();
    assert.equal(ownBal.toNumber(), 999999);
    assert.equal(totSup.toNumber(), 999999);
  });

  // it('#transfer', async () => {
  //
  // });

  it('#totalSupply', async () => {
    let tx = await contract.totalSupply({from: fundingAccount});
    assert.equal(tx.valueOf(), fundingSize);
  });

  it('#balanceOf', async () => {
    let tx1 = await contract.balanceOf(fundingAccount);
    assert.equal(tx1.valueOf(), fundingSize);

    let tx2 = await contract.balanceOf(investrAccount);
    assert.equal(tx2.valueOf(), 0);
  });
});
