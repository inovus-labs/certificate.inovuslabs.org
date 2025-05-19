// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CertificateValidator is AccessControl {
    bytes32 public constant HASH_MANAGER_ROLE = keccak256("HASH_MANAGER_ROLE");

    mapping(bytes32 => bool) public hashes;

    event HashStored(bytes32 hash);
    event HashVerified(bytes32 hash, bool isValid);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // Admin role for the deployer
        _setupRole(HASH_MANAGER_ROLE, msg.sender); // Assign HASH_MANAGER_ROLE to the deployer
    }

    // Function to store a single hash
    function storeHash(bytes32 hash) public onlyRole(HASH_MANAGER_ROLE) {
        hashes[hash] = true;
        emit HashStored(hash);
    }

    // Function to verify a single hash
    function verifyHash(bytes32 hash) public view returns (bool) {
        bool isValid = hashes[hash];
        emit HashVerified(hash, isValid);
        return isValid;
    }

    // Function to store multiple hashes
    function storeHashes(bytes32[] memory hashList) public onlyRole(HASH_MANAGER_ROLE) {
        for (uint256 i = 0; i < hashList.length; i++) {
            hashes[hashList[i]] = true;
            emit HashStored(hashList[i]);
        }
    }

    // Function to verify multiple hashes
    function verifyHashes(bytes32[] memory hashList) public view returns (bool[] memory) {
        bool[] memory results = new bool[](hashList.length);
        for (uint256 i = 0; i < hashList.length; i++) {
            results[i] = hashes[hashList[i]];
            emit HashVerified(hashList[i], results[i]);
        }
        return results;
    }

    // Function to revoke a single hash
    function revokeHash(bytes32 hash) public onlyRole(HASH_MANAGER_ROLE) {
        hashes[hash] = false;
        emit HashVerified(hash, false);
    }

    // Function to revoke multiple hashes
    function revokeHashes(bytes32[] memory hashList) public onlyRole(HASH_MANAGER_ROLE) {
        for (uint256 i = 0; i < hashList.length; i++) {
            hashes[hashList[i]] = false;
            emit HashVerified(hashList[i], false);
        }
    }

    // Function to Grant HASH_MANAGER_ROLE
    function grantHashManagerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(HASH_MANAGER_ROLE, account);
    }

    // Function to Revoke HASH_MANAGER_ROLE
    function revokeHashManagerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(HASH_MANAGER_ROLE, account);
    }

    // Function to destroy the contract
    function destroyContract() public onlyRole(DEFAULT_ADMIN_ROLE) {
        selfdestruct(payable(msg.sender));
    }
}