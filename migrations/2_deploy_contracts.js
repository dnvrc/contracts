const DNVR = artifacts.require("./DNVR.sol")

module.exports = (deployer) => {
  deployer.deploy(DNVR);
};
