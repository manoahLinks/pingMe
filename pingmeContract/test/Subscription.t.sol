// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/subscription.sol";

contract SubscriptionTest is Test {
    PingMeSubscriptions public subscriptionContract;
    address public user1 = address(0x1);
    address public user2 = address(0x2);
    address public testContract = address(0x3);
    
    function setUp() public {
        subscriptionContract = new PingMeSubscriptions();
    }
    
    function testCreateSubscription() public {
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        // Check subscription was created
        assertEq(subscriptionContract.subscriptionCount(), 1);
        
        // Check subscription details
        (address user, address contractAddr, string memory eventName, string memory email, bool isActive, uint256 createdAt) = 
            subscriptionContract.subscriptions(0);
        
        assertEq(user, user1);
        assertEq(contractAddr, testContract);
        assertEq(eventName, "Transfer");
        assertEq(email, "user1@example.com");
        assertTrue(isActive);
        assertGt(createdAt, 0);
    }
    
    function testCreateMultipleSubscriptions() public {
        // User1 creates subscription
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        // User2 creates subscription
        vm.prank(user2);
        subscriptionContract.createSubscription(
            testContract,
            "Approval",
            "user2@example.com"
        );
        
        // Check total count
        assertEq(subscriptionContract.subscriptionCount(), 2);
        
        // Check first subscription
        (address user1Addr, , , , bool isActive1, ) = subscriptionContract.subscriptions(0);
        assertEq(user1Addr, user1);
        assertTrue(isActive1);
        
        // Check second subscription
        (address user2Addr, , , , bool isActive2, ) = subscriptionContract.subscriptions(1);
        assertEq(user2Addr, user2);
        assertTrue(isActive2);
    }
    
    function testDeactivateSubscription() public {
        // Create subscription
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        // Deactivate subscription
        vm.prank(user1);
        subscriptionContract.deactivateSubscription(0);
        
        // Check subscription is deactivated
        (address user, , , , bool isActive, ) = subscriptionContract.subscriptions(0);
        assertEq(user, user1);
        assertFalse(isActive);
    }
    
    function testCannotDeactivateOthersSubscription() public {
        // User1 creates subscription
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        // User2 tries to deactivate User1's subscription
        vm.prank(user2);
        vm.expectRevert("Not your subscription");
        subscriptionContract.deactivateSubscription(0);
    }
    
    function testGetActiveSubscriptions() public {
        // Create multiple subscriptions
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        vm.prank(user2);
        subscriptionContract.createSubscription(
            testContract,
            "Approval",
            "user2@example.com"
        );
        
        // Deactivate first subscription
        vm.prank(user1);
        subscriptionContract.deactivateSubscription(0);
        
        // Get active subscriptions
        PingMeSubscriptions.Subscription[] memory activeSubs = 
            subscriptionContract.getActiveSubscriptions();
        
        // Should only have 1 active subscription (User2's)
        assertEq(activeSubs.length, 1);
        assertEq(activeSubs[0].user, user2);
        assertEq(activeSubs[0].eventName, "Approval");
        assertTrue(activeSubs[0].isActive);
    }
    
    function testGetActiveSubscriptionsEmpty() public {
        // No subscriptions created
        PingMeSubscriptions.Subscription[] memory activeSubs = 
            subscriptionContract.getActiveSubscriptions();
        
        assertEq(activeSubs.length, 0);
    }
    
    function testGetActiveSubscriptionsAllDeactivated() public {
        // Create and deactivate subscription
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        vm.prank(user1);
        subscriptionContract.deactivateSubscription(0);
        
        // Get active subscriptions
        PingMeSubscriptions.Subscription[] memory activeSubs = 
            subscriptionContract.getActiveSubscriptions();
        
        assertEq(activeSubs.length, 0);
    }
    
    function testGetSubscription() public {
        // Create subscription
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        // Get subscription details
        PingMeSubscriptions.Subscription memory sub = 
            subscriptionContract.getSubscription(0);
        
        assertEq(sub.user, user1);
        assertEq(sub.contractAddress, testContract);
        assertEq(sub.eventName, "Transfer");
        assertEq(sub.email, "user1@example.com");
        assertTrue(sub.isActive);
        assertGt(sub.createdAt, 0);
    }
    
    function testGetTotalSubscriptions() public {
        // Initially 0
        assertEq(subscriptionContract.getTotalSubscriptions(), 0);
        
        // Create subscriptions
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        assertEq(subscriptionContract.getTotalSubscriptions(), 1);
        
        vm.prank(user2);
        subscriptionContract.createSubscription(
            testContract,
            "Approval",
            "user2@example.com"
        );
        
        assertEq(subscriptionContract.getTotalSubscriptions(), 2);
    }
    
    function testSubscriptionCreatedEvent() public {
        // Expect event emission
        vm.expectEmit(true, true, false, true);
        emit PingMeSubscriptions.SubscriptionCreated(
            0, user1, testContract, "Transfer"
        );
        
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
    }
    
    function testSubscriptionDeactivatedEvent() public {
        // Create subscription first
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        // Expect deactivation event
        vm.expectEmit(true, false, false, false);
        emit PingMeSubscriptions.SubscriptionDeactivated(0);
        
        vm.prank(user1);
        subscriptionContract.deactivateSubscription(0);
    }
    
    function testGasUsage() public {
        // Test gas usage for creating subscription
        uint256 gasStart = gasleft();
        
        vm.prank(user1);
        subscriptionContract.createSubscription(
            testContract,
            "Transfer",
            "user1@example.com"
        );
        
        uint256 gasUsed = gasStart - gasleft();
        console.log("Gas used for createSubscription:", gasUsed);
        
        // Should be reasonable (less than 200k gas)
        assertLt(gasUsed, 200000);
    }
}
