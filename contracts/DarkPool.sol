// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract DarkPool is Ownable {
    mapping(address => uint256) private balances;
    mapping(address => bool) private authorized;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);
    event Authorized(address indexed account);
    event Unauthorized(address indexed account);
    event Trade(address indexed buyer, address indexed seller, uint256 amount);

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Unauthorized access");
        _;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function authorize(address account) external onlyOwner {
        require(account != address(0), "Invalid account address");
        authorized[account] = true;
        emit Authorized(account);
    }

    function unauthorize(address account) external onlyOwner {
        require(account != address(0), "Invalid account address");
        authorized[account] = false;
        emit Unauthorized(account);
    }

    function trade(address buyer, address seller, uint256 amount) external onlyAuthorized {
        require(balances[buyer] >= amount, "Buyer has insufficient balance");
        balances[buyer] -= amount;
        balances[seller] += amount;
        emit Trade(buyer, seller, amount);
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    function isAuthorized(address account) external view returns (bool) {
        return authorized[account];
    }
}

