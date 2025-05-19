// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CertificateValidator is AccessControl {
    bytes32 public constant HASH_MANAGER_ROLE = keccak256("HASH_MANAGER_ROLE");

    mapping(bytes32 => bool) public hashes;

    event HashStored(bytes32 hash);
    event HashRevoked(bytes32 hash);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(HASH_MANAGER_ROLE, msg.sender);
    }

    function storeHash(bytes32 hash) public onlyRole(HASH_MANAGER_ROLE) returns (bool) {
        hashes[hash] = true;
        emit HashStored(hash);
        return true;
    }

    function verifyHash(bytes32 hash) public view returns (bool) {
        return hashes[hash];
    }

    function revokeHash(bytes32 hash) public onlyRole(HASH_MANAGER_ROLE) returns (bool) {
        hashes[hash] = false;
        emit HashRevoked(hash);
        return true;
    }

    function grantHashManagerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(HASH_MANAGER_ROLE, account);
    }
}
