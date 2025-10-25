import React, { useState } from 'react';
import CreateSubscriptionModal from '../Components/CreateSubscriptionModal';
import Sidebar from '../Containers/Sidebar';
import Header from '../Containers/Header';

function MyContracts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contracts, setContracts] = useState([
    {
      id: 1,
      address: '0x742d...358d',
      name: 'USDC Token',
      events: ['Transfer', 'Approval'],
      status: 'active',
      notifications: 127,
      lastActivity: '2 minutes ago'
    },
    {
      id: 2,
      address: '0x1f98...4a2b',
      name: 'Uniswap V3',
      events: ['Swap', 'Mint', 'Burn'],
      status: 'active',
      notifications: 89,
      lastActivity: '5 minutes ago'
    },
    {
      id: 3,
      address: '0x7a25...9c1d',
      name: 'Aave Pool',
      events: ['Deposit', 'Withdraw'],
      status: 'inactive',
      notifications: 0,
      lastActivity: '1 hour ago'
    }
  ]);

  const handleAddContract = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Content */}
        <div className="flex-1">
          {/* Page Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Contracts</h1>
                <p className="text-gray-600 mt-1">
                  Manage and monitor your smart contract subscriptions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search contracts..."
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleAddContract}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Contract
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-600">Total Contracts</h3>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-gray-900">{contracts.length}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Active subscriptions</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-600">Active Contracts</h3>
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {contracts.filter(c => c.status === 'active').length}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Currently monitoring</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-600">Total Notifications</h3>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {contracts.reduce((sum, c) => sum + c.notifications, 0)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">All time</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-gray-900">98.5%</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Delivery success</p>
              </div>
            </div>

            {/* Contracts List */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Your Contracts</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <div key={contract.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{contract.name}</h4>
                          <p className="text-sm text-gray-600 font-mono">{contract.address}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              contract.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {contract.status}
                            </span>
                            <span className="text-xs text-gray-500">{contract.notifications} notifications</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-900">
                            {contract.events.length} events
                          </div>
                          <div className="text-xs text-gray-500">
                            Last: {contract.lastActivity}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create Subscription Modal */}
        <CreateSubscriptionModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
}

export default MyContracts;