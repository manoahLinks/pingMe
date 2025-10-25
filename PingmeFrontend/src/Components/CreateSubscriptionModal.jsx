import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { getSomniaContractUrl, parseEventsFromABI, validateContractAddress, formatContractInfo } from '../services/contractAPI';

function CreateSubscriptionModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [contractAddress, setContractAddress] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [email, setEmail] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [contractInfo, setContractInfo] = useState(null);
  const [lastFetchedAddress, setLastFetchedAddress] = useState(null);

  // Use useFetch hook for API calls
  const { data: contractData, loading: isLoading, error: apiError, success: apiSuccess } = useFetch(
    shouldFetch && contractAddress ? getSomniaContractUrl(contractAddress) : null
  );

  const steps = [
    { number: 1, title: 'Contract Address', description: 'Enter the smart contract address' },
    { number: 2, title: 'Select Events', description: 'Choose events to monitor' },
    { number: 3, title: 'Confirmation', description: 'Review and create subscription' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleFetchEvents = () => {
    if (!contractAddress || !isWalletConnected) return;
    
    // Validate contract address
    if (!validateContractAddress(contractAddress)) {
      alert('Please enter a valid Ethereum contract address');
      return;
    }
    
    // Avoid duplicate requests for the same address
    if (lastFetchedAddress === contractAddress) {
      return;
    }
    
    setLastFetchedAddress(contractAddress);
    setShouldFetch(true);
  };

  // Process API response when data arrives
  useEffect(() => {
    if (contractData && apiSuccess) {
      const formattedInfo = formatContractInfo(contractData);
      setContractInfo(formattedInfo);
      
      if (contractData.abi) {
        const events = parseEventsFromABI(contractData.abi);
        setAvailableEvents(events);
      } else {
        setAvailableEvents([]);
      }
    }
  }, [contractData, apiSuccess]);

  // Handle API errors
  useEffect(() => {
    if (apiError) {
      console.error('API Error:', apiError);
      
      if (apiError.includes('429')) {
        alert('Rate limit exceeded. Please wait a moment before trying again.');
      } else if (apiError.includes('404')) {
        alert('Contract not found. Please check the contract address.');
      } else {
        alert(`Failed to fetch contract data: ${apiError}`);
      }
      
      setAvailableEvents([]);
    }
  }, [apiError]);

  const handleEventToggle = (eventName) => {
    setSelectedEvents(prev => 
      prev.includes(eventName) 
        ? prev.filter(e => e !== eventName)
        : [...prev, eventName]
    );
  };

  const handleCreateSubscription = () => {
    // Simulate subscription creation
    console.log('Creating subscription:', {
      contractAddress,
      selectedEvents,
      email
    });
    onClose();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            currentStep >= step.number 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 text-gray-500'
          }`}>
            {step.number}
          </div>
          <div className="ml-3">
            <div className={`text-sm font-medium ${
              currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.title}
            </div>
            <div className="text-xs text-gray-500">{step.description}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderContractInput = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Smart Contract Address
        </label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0xB6324a2BC2845199B62474882f1bE9552018734F"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the contract address you want to monitor
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleConnectWallet}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isWalletConnected
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
        
        <button
          onClick={handleFetchEvents}
          disabled={!contractAddress || !isWalletConnected || isLoading}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Fetching Events...' : 'Fetch Events'}
        </button>
      </div>

      {contractInfo && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Information</h3>
          <div className="space-y-1 text-sm">
            <div><strong>Name:</strong> {contractInfo.name}</div>
            <div><strong>Verified:</strong> {contractInfo.isVerified ? 'Yes' : 'No'}</div>
            <div><strong>Language:</strong> {contractInfo.language}</div>
            <div><strong>Compiler:</strong> {contractInfo.compilerVersion}</div>
          </div>
        </div>
      )}

      {availableEvents.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Available Events ({availableEvents.length})</h3>
          <div className="space-y-2">
            {availableEvents.map((event, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{event.name}</div>
                <div className="text-sm text-gray-600 font-mono">{event.signature}</div>
                <div className="text-xs text-gray-500">{event.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableEvents.length === 0 && contractInfo && !isLoading && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <div className="text-yellow-800">
            <strong>No events found</strong> - This contract doesn't emit any events that can be monitored.
          </div>
        </div>
      )}

      {apiError && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg">
          <div className="text-red-800 mb-3">
            <strong>Error:</strong> {apiError}
          </div>
          {apiError.includes('429') && (
            <div className="space-y-2">
              <p className="text-sm text-red-700">
                Rate limit exceeded. Please wait a moment before trying again.
              </p>
              <button
                onClick={() => {
                  setShouldFetch(false);
                  setTimeout(() => setShouldFetch(true), 2000);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Retry in 2 seconds
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderEventSelection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Events to Monitor</h3>
        <div className="space-y-3">
          {availableEvents.map((event, index) => (
            <label key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedEvents.includes(event.name)}
                onChange={() => handleEventToggle(event.name)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{event.name}</div>
                <div className="text-sm text-gray-600">{event.signature}</div>
                <div className="text-xs text-gray-500">{event.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email for Notifications
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          You'll receive email notifications when these events occur
        </p>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Subscription</h3>
        <p className="text-gray-600">Please review the details before creating your subscription</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Contract Address</div>
          <div className="text-sm text-gray-900 font-mono">{contractAddress}</div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-500">Selected Events</div>
          <div className="mt-2 space-y-1">
            {selectedEvents.map((event, index) => (
              <div key={index} className="text-sm text-gray-900 bg-white px-3 py-1 rounded border">
                {event}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-500">Notification Email</div>
          <div className="text-sm text-gray-900">{email}</div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Subscription</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {renderStepIndicator()}

          <div className="mb-8">
            {currentStep === 1 && renderContractInput()}
            {currentStep === 2 && renderEventSelection()}
            {currentStep === 3 && renderConfirmation()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!contractAddress || !isWalletConnected || availableEvents.length === 0)) ||
                  (currentStep === 2 && (selectedEvents.length === 0 || !email))
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCreateSubscription}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Subscription
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSubscriptionModal;
