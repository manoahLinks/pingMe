// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PingMeSubscriptions {
    struct Subscription {
        address user;
        address contractAddress;
        string eventName;
        string email;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(uint256 => Subscription) public subscriptions;
    uint256 public subscriptionCount;
    
    event SubscriptionCreated(uint256 indexed id, address indexed user, address contractAddress, string eventName);
    event SubscriptionDeactivated(uint256 indexed id);
    
    function createSubscription(
        address _contractAddress,
        string memory _eventName,
        string memory _email
    ) external {
        uint256 id = subscriptionCount;
        
        subscriptions[id] = Subscription({
            user: msg.sender,
            contractAddress: _contractAddress,
            eventName: _eventName,
            email: _email,
            isActive: true,
            createdAt: block.timestamp
        });
        
        subscriptionCount++;
        
        emit SubscriptionCreated(id, msg.sender, _contractAddress, _eventName);
    }
    
    function deactivateSubscription(uint256 _id) external {
        require(subscriptions[_id].user == msg.sender, "Not your subscription");
        subscriptions[_id].isActive = false;
        emit SubscriptionDeactivated(_id);
    }
    
    function getActiveSubscriptions() external view returns (Subscription[] memory) {
        uint256 activeCount = 0;
        
        // Count active subscriptions
        for (uint256 i = 0; i < subscriptionCount; i++) {
            if (subscriptions[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array with active subscriptions
        Subscription[] memory activeSubs = new Subscription[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < subscriptionCount; i++) {
            if (subscriptions[i].isActive) {
                activeSubs[index] = subscriptions[i];
                index++;
            }
        }
        
        return activeSubs;
    }
    
    function getSubscription(uint256 _id) external view returns (Subscription memory) {
        return subscriptions[_id];
    }
    
    function getTotalSubscriptions() external view returns (uint256) {
        return subscriptionCount;
    }
}
