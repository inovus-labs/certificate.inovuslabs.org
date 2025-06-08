// SPDX-License-Identifier: MIT

/**
 * @title CertificateValidator
 * @dev A contract for managing and validating hashes of certificates.
 * @author Arjun Krishna <mail@arjunkrishna.dev>
 * @notice This contract allows for storing, verifying, and revoking hashes of certificates.
 */

// ----------------------------------------------------------------------------------------------
// ------------------------------- CERTIFICATE VALIDATOR CONTRACT -------------------------------
// ----------------------------------------------------------------------------------------------

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



    // ------------------------------- HASH MANAGEMENT FUNCTIONS -------------------------------

    /**
     * @dev Stores a hash in the contract.
     * @param hash The hash to store.
     * @return bool indicating success or failure.
     */
    function storeHash(bytes32 hash) public onlyRole(HASH_MANAGER_ROLE) returns (bool) {
        hashes[hash] = true;
        emit HashStored(hash);
        return true;
    }


    /**
     * @dev Verifies if a hash exists in the contract.
     * @param hash The hash to verify.
     * @return bool indicating whether the hash exists.
     */
    function verifyHash(bytes32 hash) public view returns (bool) {
        return hashes[hash];
    }


    /**
     * @dev Revokes a stored hash.
     * @param hash The hash to revoke.
     * @return bool indicating success or failure.
     */
    function revokeHash(bytes32 hash) public onlyRole(HASH_MANAGER_ROLE) returns (bool) {
        hashes[hash] = false;
        emit HashRevoked(hash);
        return true;
    }



    // ------------------------------- BATCH MANAGEMENT FUNCTIONS -------------------------------
    
    /**
     * @dev Stores multiple hashes in the contract.
     * @param hashList An array of hashes to store.
     * @return bool indicating success or failure.
     */
    function storeHashes(bytes32[] memory hashList) public onlyRole(HASH_MANAGER_ROLE) returns (bool) {
        for (uint256 i = 0; i < hashList.length; i++) {
            hashes[hashList[i]] = true;
            emit HashStored(hashList[i]);
        }
        return true;
    }


    /**
     * @dev Verifies multiple hashes in the contract.
     * @param hashList An array of hashes to verify.
     * @return bool[] indicating whether each hash exists.
     */
    function verifyHashes(bytes32[] memory hashList) public view returns (bool[] memory) {
        bool[] memory results = new bool[](hashList.length);
        for (uint256 i = 0; i < hashList.length; i++) {
            results[i] = hashes[hashList[i]];
        }
        return results;
    }


    /**
     * @dev Revokes multiple hashes.
     * @param hashList An array of hashes to revoke.
     * @return bool indicating success or failure.
     */
    function revokeHashes(bytes32[] memory hashList) public onlyRole(HASH_MANAGER_ROLE) returns (bool) {
        for (uint256 i = 0; i < hashList.length; i++) {
            hashes[hashList[i]] = false;
            emit HashRevoked(hashList[i]);
        }
        return true;
    }



    // ------------------------------- ADMINISTRATION FUNCTIONS -------------------------------
    /**
     * @dev Returns the number of stored hashes.
     * @return uint256 The count of stored hashes.
     */

    function getStoredHashCount() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < 2**256 - 1; i++) {
            if (hashes[bytes32(i)]) {
                count++;
            }
        }
        return count;
    }



    // ------------------------------- ROLE MANAGEMENT FUNCTIONS -------------------------------

    /**
     * @dev Checks if an account has the HASH_MANAGER_ROLE.
     * @param account The address to check.
     * @return bool indicating whether the account has the role.
     */
    function hasHashManagerRole(address account) public view returns (bool) {
        return hasRole(HASH_MANAGER_ROLE, account);
    }


    /**
     * @dev Checks if an account has the DEFAULT_ADMIN_ROLE.
     * @param account The address to check.
     * @return bool indicating whether the account has the role.
     */
    function hasAdminRole(address account) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }


    /**
     * @dev Grants the HASH_MANAGER_ROLE to an account.
     * @param account The address to grant the role to.
     */
    function grantHashManagerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(HASH_MANAGER_ROLE, account);
    }


    /**
     * @dev Revokes the HASH_MANAGER_ROLE from an account.
     * @param account The address to revoke the role from.
     */
    function revokeHashManagerRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(HASH_MANAGER_ROLE, account);
    }
}
