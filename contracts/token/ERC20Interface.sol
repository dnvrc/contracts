pragma solidity ^0.4.19;

contract ERC20Interface {
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining);
    function approve(address _spender, uint256 _value) public returns (bool success);
    function balanceOf(address _owner) public constant returns (uint256);
    function totalSupply() public constant returns (uint256 supply);
    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
}
