// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;


interface ISendToken {
  function transfer(address to, uint256 value) external returns (bool);

  function transferFrom(address from, address to, uint256 amount) external returns (bool);

  function allowance(address owner, address spender) external view returns (uint256);
}