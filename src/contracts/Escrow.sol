// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "./ISendToken.sol";
import "./IEscrow.sol";

// import "zeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;
    address public voter;

    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyVoter() {
        require(msg.sender == voter);
        _;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipRenounced(owner);
        owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0));
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    /**
     * @dev Multiplies two numbers, throws on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
     * @dev Integer division of two numbers, truncating the quotient.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        // uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return a / b;
    }

    /**
     * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
     * @dev Adds two numbers, throws on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Escrow is IEscrow, Ownable {
    using SafeMath for uint256;

    ISendToken public token;
    address public MARKETPLACE;

    struct Lock {
        address user;
        address influincer;
        uint256 influincerFee;
        uint256 marketplaceFee;
        uint256 hiringDeadline;
        bool paid;
    }

    mapping(string => Lock) internal escrows;

    constructor(address _token, address _marketplaceAddress) {
        token = ISendToken(_token);
        MARKETPLACE = address(_marketplaceAddress);
    }

    function getStatus(string memory _transactionId)
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            bool
        )
    {
        return (
            escrows[_transactionId].user,
            escrows[_transactionId].influincer,
            escrows[_transactionId].influincerFee,
            escrows[_transactionId].marketplaceFee,
            escrows[_transactionId].hiringDeadline,
            escrows[_transactionId].paid
        );
    }

    function isUnlocked(string memory _transactionId) public view returns (bool) {
        return escrows[_transactionId].hiringDeadline < block.timestamp;
    }

    /**
     * @dev Create a record for held tokens
     * @param _transactionId Intenral ID for applications implementing this
     * @param _influincerFee Amount of tokens to lock
     * @param _marketplaceFee A fee to be paid to arbitrator (may be 0)
     * @param _hiringDeadline After this timestamp, user can claim tokens back.
     */
    function createAndFunded(
        address _user,
        address _influincer,
        string memory _transactionId,
        uint256 _influincerFee,
        uint256 _marketplaceFee,
        uint256 _hiringDeadline
    ) public override {
        require(_influincerFee > 0);
        require(_marketplaceFee >= 0);
        require(escrows[_transactionId].influincerFee == 0);

        escrows[_transactionId].user = _user;
        escrows[_transactionId].influincer = _influincer;
        escrows[_transactionId].influincerFee = _influincerFee;
        escrows[_transactionId].marketplaceFee = _marketplaceFee;
        escrows[_transactionId].hiringDeadline = _hiringDeadline;
        require(
            ISendToken(token).allowance(_user, address(this)) >=
                _influincerFee + (_marketplaceFee / 2)
        );
        ISendToken(token).transferFrom(
            _user,
            address(this),
            _influincerFee + (_marketplaceFee / 2)
        );
        escrows[_transactionId].paid = true;
        CreatedAndFunded(_user, _influincer, _transactionId);
    }

    // /**
    //  * @dev Fund escrow record
    //  * @param _transactionId Intenral ID for applications implementing this
    //  * @param _influincerFee Amount of tokens to lock
    //  * @param _marketplaceFee A fee to be paid to marketplace 5%(2.5% by user and 2.5% by influincer)
    //  */
    // function fund(
    //     address _user,
    //     uint256 _transactionId,
    //     uint256 _influincerFee,
    //     uint256 _marketplaceFee
    // ) public override {
    //     require(escrows[_transactionId].user == _user);
    //     require(
    //         escrows[_transactionId].user == msg.sender,
    //         "You Cant fund this subscription."
    //     );
    //     require(escrows[_transactionId].influincerFee == _influincerFee);
    //     require(escrows[_transactionId].marketplaceFee == _marketplaceFee);
    //     require(escrows[_transactionId].paid == false);
    //     require(
    //         ISendToken(token).allowance(msg.sender, address(this)) >=
    //             _influincerFee + (_marketplaceFee / 2)
    //     );
    //     ISendToken(token).transferFrom(
    //         msg.sender,
    //         address(this),
    //         _influincerFee + (_marketplaceFee / 2)
    //     );
    //     escrows[_transactionId].paid = true;

    //     Paid(address(this), _transactionId);
    // }

    /**
     * @dev Transfer a locked amount for timeless escrow
     * @notice Only authorized address
     * @param _influincer Address to send funds to
     * @param _transactionId App/user internal associated ID
     */

    function releaseUnlocked(address _influincer, string memory _transactionId)
        public
    {
        Lock memory lock = escrows[_transactionId];
        require(msg.sender == MARKETPLACE);
        require(lock.hiringDeadline > block.timestamp);
        require(lock.influincer == _influincer);
        require(lock.paid);

        token.transfer(
            _influincer,
            lock.influincerFee - (lock.marketplaceFee / 2)
        );
        token.transfer(MARKETPLACE, lock.marketplaceFee);

        delete escrows[_transactionId];

        Released(msg.sender, _influincer, _transactionId);
    }
}
