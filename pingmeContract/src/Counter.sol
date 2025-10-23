// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {

    event NumberSet(uint256 indexed oldNumber, uint256 indexed newNumber);
    event NumberIncremented(uint256 indexed oldNumber, uint256 indexed newNumber);
    uint256 public number = 0;

    function setNumber(uint256 oldNumber, uint256 newNumber) public {
        emit NumberSet(oldNumber, newNumber);
        number = newNumber;
    }

    function increment() public {
        emit NumberIncremented(number, number + 1);
        number++;
    }
}
