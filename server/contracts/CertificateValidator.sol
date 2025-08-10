// SPDX-License-Identifier: MIT

// ----------------------------------------------------------------------------------------------
// ------------------------------- CERTIFICATE VALIDATOR CONTRACT -------------------------------
// ----------------------------------------------------------------------------------------------

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CertificateValidator
 * @dev A contract for managing and validating hashes of certificates.
 * @author Arjun Krishna <mail@arjunkrishna.dev>
 */

contract CertificateValidator is AccessControl {
    bytes32 public constant HASH_MANAGER_ROLE = keccak256("HASH_MANAGER_ROLE");

    enum HashStatus { None, Valid, Revoked, Expired }

    struct Certificate {
        HashStatus status;
        uint256 issuedAt;
        uint256 revokedAt;
        uint256 expiresAt;
        address issuer;
        string refData;
    }

    mapping(bytes32 => Certificate) public certificates;

    event HashStored(bytes32 indexed hash, address indexed issuer, uint256 issuedAt, uint256 expiresAt, string refData);
    event HashRevoked(bytes32 indexed hash, address indexed revoker, uint256 revokedAt);
    event HashExpired(bytes32 indexed hash, uint256 expiredAt);
    event HashManagerAdded(address indexed account);
    event HashManagerRemoved(address indexed account);
    event AdminTransferred(address indexed from, address indexed to);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(HASH_MANAGER_ROLE, msg.sender);
    }



    // ------------------------------- MODIFIERS -------------------------------



    /**
     * @notice Ensures that the hash does not already exist in the system.
     * @param hash The hash to check.
     */
    modifier onlyFresh(bytes32 hash) {
        require(certificates[hash].status == HashStatus.None, "Hash already exists");
        _;
    }


    /**
     * @notice Ensures that the hash is currently valid.
     * @param hash The hash to check.
     */
    modifier onlyValid(bytes32 hash) {
        require(certificates[hash].status == HashStatus.Valid, "Hash is not valid");
        _;
    }


    /**
     * @notice Ensures that the caller is a hash manager.
     */
    modifier onlyHashManager() {
        require(hasRole(HASH_MANAGER_ROLE, msg.sender), "Not a hash manager");
        _;
    }



    // ------------------------------- HASH MANAGEMENT FUNCTIONS -------------------------------



    /**
     * @notice Stores a new hash with its metadata.
     * @param hash The hash of the certificate.
     * @param expiresAt The timestamp when the hash expires (0 for non-expiring).
     * @param refData Reference data associated with the certificate.
     */
    function storeHash(bytes32 hash, uint256 expiresAt, string calldata refData) public onlyHashManager onlyFresh(hash) {
        certificates[hash] = Certificate({
            status: HashStatus.Valid,
            issuedAt: block.timestamp,
            revokedAt: 0,
            expiresAt: expiresAt,
            issuer: msg.sender,
            refData: refData
        });
        emit HashStored(hash, msg.sender, block.timestamp, expiresAt, refData);
    }


    /**
     * @notice Stores multiple hashes with their metadata.
     * @param hashes An array of hashes to store.
     * @param expiries An array of expiry timestamps corresponding to each hash (0 for non-expiring).
     * @param refDatas An array of reference data strings corresponding to each hash.
     */
    function storeHashes(bytes32[] calldata hashes, uint256[] calldata expiries, string[] calldata refDatas) external onlyHashManager {
        require(hashes.length == expiries.length && hashes.length == refDatas.length, "Input length mismatch");
        for (uint256 i = 0; i < hashes.length; i++) {
            storeHash(hashes[i], expiries[i], refDatas[i]);
        }
    }


    /**
     * @notice Revokes a hash, marking it as invalid.
     * @param hash The hash of the certificate to revoke.
     */
    function revokeHash(bytes32 hash) public onlyHashManager onlyValid(hash) {
        certificates[hash].status = HashStatus.Revoked;
        emit HashRevoked(hash, msg.sender, block.timestamp);
        certificates[hash].revokedAt = block.timestamp;
        certificates[hash].expiresAt = 0; // Clear expiry since it's revoked
    }


    /**
     * @notice Revokes multiple hashes, marking them as invalid.
     * @param hashes An array of hashes to revoke.
     */
    function revokeHashes(bytes32[] calldata hashes) public onlyHashManager {
        for (uint256 i = 0; i < hashes.length; i++) {
            if (certificates[hashes[i]].status == HashStatus.Valid) {
                certificates[hashes[i]].status = HashStatus.Revoked;
                emit HashRevoked(hashes[i], msg.sender, block.timestamp);
                certificates[hashes[i]].revokedAt = block.timestamp;
                certificates[hashes[i]].expiresAt = 0; // Clear expiry since it's revoked
            }
        }
    }


    /**
     * @notice Marks a hash as expired if its expiry time has passed.
     * @param hash The hash of the certificate to expire.
     */
    function expireHash(bytes32 hash) public onlyHashManager {
        require(certificates[hash].expiresAt > 0 && certificates[hash].expiresAt <= block.timestamp, "Not yet expired or no expiry set");
        certificates[hash].status = HashStatus.Expired;
        emit HashExpired(hash, block.timestamp);
    }


    /**
     * @notice Verifies the status of a hash.
     * @param hash The hash of the certificate to verify.
     * @return status The status of the hash (Valid, Revoked, Expired, Not Found).
     * @return issuedAt The timestamp when the hash was issued.
     * @return revokedAt The timestamp when the hash was revoked (0 if not revoked).
     * @return expiresAt The timestamp when the hash expires (0 if non-expiring).
     */
    function verifyHash(bytes32 hash) public view returns (
        string memory status,
        uint256 issuedAt,
        uint256 revokedAt,
        uint256 expiresAt
    ) {
        Certificate memory cert = certificates[hash];

        if (cert.status == HashStatus.Valid && cert.expiresAt > 0 && block.timestamp > cert.expiresAt) {
            status = "Expired";
        } else if (cert.status == HashStatus.Valid) {
            status = "Valid";
        } else if (cert.status == HashStatus.Revoked) {
            status = "Revoked";
        } else if (cert.status == HashStatus.Expired) {
            status = "Expired";
        } else {
            status = "Not Found";
        }

        /**
         * issuedAt: certificate creation time
         * revokedAt: time of revocation (0 if not revoked)
         * expiresAt: expiry time (0 if non-expiring)
         */
        return (status, cert.issuedAt, cert.expiresAt, cert.revokedAt);
    }


    /**
     * @notice Retrieves metadata associated with a hash.
     * @param hash The hash of the certificate.
     * @return issuer The address of the issuer.
     * @return refData Reference data associated with the certificate.
     */
    function getMetadata(bytes32 hash) public view onlyHashManager returns (address issuer, string memory refData) {
        Certificate memory cert = certificates[hash];
        return (cert.issuer, cert.refData);
    }


    /**
     * @notice Checks if a hash is valid.
     * @param hash The hash of the certificate to check.
     * @return isValid True if the hash is valid, false otherwise.
     */
    function isNonExpiring(bytes32 hash) public view returns (bool) {
        return certificates[hash].expiresAt == 0;
    }



    // ------------------------------- ROLE MANAGEMENT FUNCTIONS -------------------------------



    /**
     * @notice Adds a new hash manager role to an account.
     * @param account The address of the account to add.
     */
    function addHashManager(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hasRole(HASH_MANAGER_ROLE, account), "Already a hash manager");
        _grantRole(HASH_MANAGER_ROLE, account);
        emit HashManagerAdded(account);
    }


    /**
     * @notice Removes a hash manager role from an account.
     * @param account The address of the account to remove.
     */
    function removeHashManager(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(HASH_MANAGER_ROLE, account), "Not a hash manager");
        _revokeRole(HASH_MANAGER_ROLE, account);
        emit HashManagerRemoved(account);
    }


    /**
     * @notice Transfers the admin role to a new address.
     * @param newAdmin The address of the new admin.
     */
    function transferAdmin(address newAdmin) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
        _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
        emit AdminTransferred(msg.sender, newAdmin);
    }
}
