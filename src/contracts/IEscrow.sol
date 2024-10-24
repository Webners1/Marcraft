// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;


/**
 * @title Escrow interface
 *
 * @dev https://send.sd/token
 */
interface IEscrow {

  event CreatedAndFunded(
    address indexed _user,
    address indexed _influincer,
    string _transactionId
  );
  event Released(address indexed _marketplace, address indexed sentTo, string transactionId);
  event Dispute(address indexed _marketplace, uint256 transactionId);
  event Paid(address indexed _escrow, uint256 _transactionId);

  function createAndFunded(
        address _user,
        address _influincer,
        string memory _transactionId,
        uint256 _influincerFee,
        uint256 _marketplaceFee,
        uint256 _hiringDeadline
    ) external;

}