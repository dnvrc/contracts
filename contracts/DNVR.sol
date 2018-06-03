pragma solidity ^0.4.19;

import './token/BasicToken.sol';

contract DNVR is BasicToken {
  string public symbol;
  string public  name;
  uint8 public decimals;

  constructor() public {
    symbol = "DNVR";
    name = "DNVR Capital Token";
    decimals = 18;
    totalSupply = 10000000000000000;
  }

  function getSupply() public constant returns (uint balance) {
    return totalSupply;
  }
}
