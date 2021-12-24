// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Token {
  string public name;
  string public symbol;
  uint public totalSupply;

  mapping(address => uint) balances;

  address public owner;

  constructor(string memory _name, string memory _symbol, uint _totalSupply) {
    name = _name;
    symbol = _symbol;
    totalSupply = _totalSupply;

    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address recipient, uint amount) public {
    require(balances[msg.sender] >= amount, "Not enough tokens!");
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
  }

  function transferFrom(address sender, address recipient, uint amount) public {
    require(balances[sender] >= amount, "Not enough tokens!");
    balances[sender] -= amount;
    balances[recipient] += amount;
  }

  function balanceOf(address account) view public returns (uint) {
    return balances[account];
  }
}
