// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateValidator {
    mapping(string => bool) public hashes;

    function storeHash(string memory hash) public returns (bool) {
        hashes[hash] = true;
        return true;
    }

    function verifyHash(string memory hash) public view returns (bool) {
        return hashes[hash];
    }
}