import React from 'react';
import StatsCards from './StatsCards';
import ContractsList from './ContractsList';

function MainContent() {
  return (
    <div className="flex-1 p-8 bg-white/80 backdrop-blur-sm m-4 rounded-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Contracts</h1>
            <p className="text-gray-600">Manage and monitor your smart contract subscriptions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contracts..."
                className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              Add Contract
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Contracts List */}
      <ContractsList />
    </div>
  );
}

export default MainContent;