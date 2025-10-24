import React from "react";

function Overview() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6  rounded flex items-center justify-center">
              {/* Ping It Logo SVG placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 0C20.4183 0 24 3.58172 24 8V16C24 20.4183 20.4183 24 16 24H8C3.58172 24 0 20.4183 0 16V8C0 3.58172 3.58172 0 8 0H16Z"
                  fill="#FCFCFC"
                />
                <path
                  d="M16 0C20.4183 0 24 3.58172 24 8V16C24 20.4183 20.4183 24 16 24H8C3.58172 24 0 20.4183 0 16V8C0 3.58172 3.58172 0 8 0H16Z"
                  stroke="#E5E7EB"
                />
                <path
                  d="M12.1245 5C11.6405 5 11.2495 5.39102 11.2495 5.875V6.4C9.25338 6.80469 7.74947 8.57109 7.74947 10.6875V11.2016C7.74947 12.4867 7.27643 13.7281 6.4233 14.6906L6.22096 14.9176C5.99127 15.1746 5.93658 15.5437 6.07604 15.8582C6.21549 16.1727 6.52994 16.375 6.87447 16.375H17.3745C17.719 16.375 18.0307 16.1727 18.1729 15.8582C18.3151 15.5437 18.2577 15.1746 18.028 14.9176L17.8256 14.6906C16.9725 13.7281 16.4995 12.4895 16.4995 11.2016V10.6875C16.4995 8.57109 14.9956 6.80469 12.9995 6.4V5.875C12.9995 5.39102 12.6085 5 12.1245 5ZM13.3631 18.4887C13.6913 18.1605 13.8745 17.7148 13.8745 17.25H12.1245H10.3745C10.3745 17.7148 10.5577 18.1605 10.8858 18.4887C11.2139 18.8168 11.6596 19 12.1245 19C12.5893 19 13.035 18.8168 13.3631 18.4887Z"
                  fill="black"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">Ping It</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
            >
              {/* Overview icon SVG placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
              >
                <path d="M18 16H0V0H18V16Z" stroke="#E5E7EB" />
                <path
                  d="M9.5 7.5V0.51875C9.5 0.2375 9.71875 0 10 0C13.8656 0 17 3.13438 17 7C17 7.28125 16.7625 7.5 16.4813 7.5H9.5ZM1 8.5C1 4.70937 3.81562 1.57187 7.46875 1.07187C7.75625 1.03125 8 1.2625 8 1.55313V9L12.8906 13.8906C13.1 14.1 13.0844 14.4438 12.8438 14.6125C11.6187 15.4875 10.1187 16 8.5 16C4.35938 16 1 12.6438 1 8.5ZM17.45 9C17.7406 9 17.9688 9.24375 17.9312 9.53125C17.6906 11.2781 16.85 12.8312 15.6219 13.9781C15.4344 14.1531 15.1406 14.1406 14.9594 13.9563L10 9H17.45Z"
                  fill="#2563EB"
                />
              </svg>
              <span className="font-medium">Overview</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {/* My Contracts icon SVG placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
              >
                <g clip-path="url(#clip0_723_592)">
                  <path
                    d="M2 0C0.896875 0 0 0.896875 0 2V14C0 15.1031 0.896875 16 2 16H10C11.1031 16 12 15.1031 12 14V5H8C7.44688 5 7 4.55312 7 4V0H2ZM8 0V4H12L8 0ZM2.5 2H4.5C4.775 2 5 2.225 5 2.5C5 2.775 4.775 3 4.5 3H2.5C2.225 3 2 2.775 2 2.5C2 2.225 2.225 2 2.5 2ZM2.5 4H4.5C4.775 4 5 4.225 5 4.5C5 4.775 4.775 5 4.5 5H2.5C2.225 5 2 4.775 2 4.5C2 4.225 2.225 4 2.5 4ZM4.19375 11.9312C4.00312 12.5656 3.41875 13 2.75625 13H2.5C2.225 13 2 12.775 2 12.5C2 12.225 2.225 12 2.5 12H2.75625C2.97812 12 3.17188 11.8562 3.23438 11.6438L3.7 10.0969C3.80625 9.74375 4.13125 9.5 4.5 9.5C4.86875 9.5 5.19375 9.74063 5.3 10.0969L5.6625 11.3031C5.89375 11.1094 6.1875 11 6.5 11C6.99687 11 7.45 11.2812 7.67188 11.725L7.80937 12H9.5C9.775 12 10 12.225 10 12.5C10 12.775 9.775 13 9.5 13H7.5C7.30937 13 7.1375 12.8938 7.05312 12.725L6.77812 12.1719C6.725 12.0656 6.61875 12 6.50313 12C6.3875 12 6.27813 12.0656 6.22813 12.1719L5.95312 12.725C5.8625 12.9094 5.66563 13.0188 5.4625 13C5.25938 12.9812 5.08437 12.8406 5.02812 12.6469L4.5 10.9062L4.19375 11.9312Z"
                    fill="#4B5563"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_723_592">
                    <path d="M0 0H12V16H0V0Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium">My Contracts</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {/* Notifications icon SVG placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill="none"
              >
                <g clip-path="url(#clip0_723_599)">
                  <path
                    d="M7.00001 0.5C6.44689 0.5 6.00001 0.946875 6.00001 1.5V2.1C3.71876 2.5625 2.00001 4.58125 2.00001 7V7.5875C2.00001 9.05625 1.45939 10.475 0.484387 11.575L0.253137 11.8344C-0.00936282 12.1281 -0.0718628 12.55 0.0875122 12.9094C0.246887 13.2688 0.606262 13.5 1.00001 13.5H13C13.3938 13.5 13.75 13.2688 13.9125 12.9094C14.075 12.55 14.0094 12.1281 13.7469 11.8344L13.5156 11.575C12.5406 10.475 12 9.05937 12 7.5875V7C12 4.58125 10.2813 2.5625 8.00001 2.1V1.5C8.00001 0.946875 7.55314 0.5 7.00001 0.5ZM8.41564 15.9156C8.79064 15.5406 9.00001 15.0312 9.00001 14.5H7.00001H5.00001C5.00001 15.0312 5.20939 15.5406 5.58439 15.9156C5.95939 16.2906 6.46876 16.5 7.00001 16.5C7.53126 16.5 8.04064 16.2906 8.41564 15.9156Z"
                    fill="#4B5563"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_723_599">
                    <path d="M0 0.5H14V16.5H0V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium">Notifications</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {/* Activity History icon SVG placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <g clip-path="url(#clip0_723_605)">
                  <path
                    d="M2.34375 2.84375L1.28125 1.78125C0.809375 1.30937 0 1.64375 0 2.30938V5.75C0 6.16563 0.334375 6.5 0.75 6.5H4.19063C4.85938 6.5 5.19375 5.69063 4.72188 5.21875L3.75938 4.25625C4.84375 3.17188 6.34375 2.5 8 2.5C11.3125 2.5 14 5.1875 14 8.5C14 11.8125 11.3125 14.5 8 14.5C6.725 14.5 5.54375 14.1031 4.57188 13.425C4.11875 13.1094 3.49687 13.2188 3.17812 13.6719C2.85938 14.125 2.97187 14.7469 3.425 15.0656C4.725 15.9688 6.30312 16.5 8 16.5C12.4187 16.5 16 12.9187 16 8.5C16 4.08125 12.4187 0.5 8 0.5C5.79063 0.5 3.79063 1.39688 2.34375 2.84375ZM8 4.5C7.58437 4.5 7.25 4.83437 7.25 5.25V8.5C7.25 8.7 7.32812 8.89062 7.46875 9.03125L9.71875 11.2812C10.0125 11.575 10.4875 11.575 10.7781 11.2812C11.0687 10.9875 11.0719 10.5125 10.7781 10.2219L8.74687 8.19063V5.25C8.74687 4.83437 8.4125 4.5 7.99687 4.5H8Z"
                    fill="#4B5563"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_723_605">
                    <path d="M0 0.5H16V16.5H0V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium">Activity History</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              {/* Settings icon SVG placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <g clip-path="url(#clip0_723_605)">
                  <path
                    d="M2.34375 2.84375L1.28125 1.78125C0.809375 1.30937 0 1.64375 0 2.30938V5.75C0 6.16563 0.334375 6.5 0.75 6.5H4.19063C4.85938 6.5 5.19375 5.69063 4.72188 5.21875L3.75938 4.25625C4.84375 3.17188 6.34375 2.5 8 2.5C11.3125 2.5 14 5.1875 14 8.5C14 11.8125 11.3125 14.5 8 14.5C6.725 14.5 5.54375 14.1031 4.57188 13.425C4.11875 13.1094 3.49687 13.2188 3.17812 13.6719C2.85938 14.125 2.97187 14.7469 3.425 15.0656C4.725 15.9688 6.30312 16.5 8 16.5C12.4187 16.5 16 12.9187 16 8.5C16 4.08125 12.4187 0.5 8 0.5C5.79063 0.5 3.79063 1.39688 2.34375 2.84375ZM8 4.5C7.58437 4.5 7.25 4.83437 7.25 5.25V8.5C7.25 8.7 7.32812 8.89062 7.46875 9.03125L9.71875 11.2812C10.0125 11.575 10.4875 11.575 10.7781 11.2812C11.0687 10.9875 11.0719 10.5125 10.7781 10.2219L8.74687 8.19063V5.25C8.74687 4.83437 8.4125 4.5 7.99687 4.5H8Z"
                    fill="#4B5563"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_723_605">
                    <path d="M0 0.5H16V16.5H0V0.5Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium">Settings</span>
            </a>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 space-y-3 bg-[#EFF6FF]">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            {/* Plus icon SVG placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
            >
              <path d="M14 16H0V0H14V16Z" stroke="#E5E7EB" />
              <path
                d="M8 2.5C8 1.94687 7.55312 1.5 7 1.5C6.44688 1.5 6 1.94687 6 2.5V7H1.5C0.946875 7 0.5 7.44688 0.5 8C0.5 8.55312 0.946875 9 1.5 9H6V13.5C6 14.0531 6.44688 14.5 7 14.5C7.55312 14.5 8 14.0531 8 13.5V9H12.5C13.0531 9 13.5 8.55312 13.5 8C13.5 7.44688 13.0531 7 12.5 7H8V2.5Z"
                fill="#2563EB"
              />
            </svg>
            <span>Add New Contract</span>
          </button>
          <div className="text-xs text-gray-500">
            Start monitoring a new smart contract to track events
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
              <p className="text-gray-600 mt-1">
                Monitor your smart contract activity and notifications
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button className="cursor-pointer flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <span>Last 7 days</span>
                {/* ChevronDown icon SVG placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.69462 8.07042C5.84504 7.9257 6.04677 7.84662 6.25547 7.85055C6.46416 7.85449 6.66276 7.94113 6.80762 8.09142L10.7031 12.2263L14.5986 8.09142C14.6694 8.01336 14.7552 7.9503 14.8508 7.90599C14.9464 7.86168 15.05 7.83702 15.1553 7.83346C15.2606 7.8299 15.3656 7.84752 15.464 7.88527C15.5624 7.92303 15.6522 7.98015 15.7281 8.05326C15.8041 8.12636 15.8645 8.21396 15.906 8.31086C15.9474 8.40777 15.969 8.512 15.9694 8.61739C15.9698 8.72278 15.9491 8.82719 15.9084 8.92441C15.8677 9.02164 15.808 9.10972 15.7326 9.18342L11.2701 13.9084C11.1967 13.9846 11.1086 14.0453 11.0112 14.0867C10.9137 14.1281 10.809 14.1494 10.7031 14.1494C10.5973 14.1494 10.4925 14.1281 10.3951 14.0867C10.2977 14.0453 10.2096 13.9846 10.1361 13.9084L5.67362 9.18342C5.5289 9.033 5.44982 8.83127 5.45375 8.62257C5.45769 8.41387 5.54433 8.21528 5.69462 8.07042Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                {/* Download icon SVG placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_235_7706)">
                    <path
                      d="M9.46875 1C9.46875 0.446875 9.02188 0 8.46875 0C7.91563 0 7.46875 0.446875 7.46875 1V8.58438L5.175 6.29063C4.78438 5.9 4.15 5.9 3.75938 6.29063C3.36875 6.68125 3.36875 7.31563 3.75938 7.70625L7.75938 11.7063C8.15 12.0969 8.78438 12.0969 9.175 11.7063L13.175 7.70625C13.5656 7.31563 13.5656 6.68125 13.175 6.29063C12.7844 5.9 12.15 5.9 11.7594 6.29063L9.46875 8.58438V1ZM2.46875 11C1.36563 11 0.46875 11.8969 0.46875 13V14C0.46875 15.1031 1.36563 16 2.46875 16H14.4688C15.5719 16 16.4688 15.1031 16.4688 14V13C16.4688 11.8969 15.5719 11 14.4688 11H11.2969L9.88125 12.4156C9.1 13.1969 7.83437 13.1969 7.05312 12.4156L5.64062 11H2.46875ZM13.9688 12.75C14.1677 12.75 14.3584 12.829 14.4991 12.9697C14.6397 13.1103 14.7188 13.3011 14.7188 13.5C14.7188 13.6989 14.6397 13.8897 14.4991 14.0303C14.3584 14.171 14.1677 14.25 13.9688 14.25C13.7698 14.25 13.5791 14.171 13.4384 14.0303C13.2978 13.8897 13.2188 13.6989 13.2188 13.5C13.2188 13.3011 13.2978 13.1103 13.4384 12.9697C13.5791 12.829 13.7698 12.75 13.9688 12.75Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_235_7706">
                      <path d="M0.46875 0H16.4688V16H0.46875V0Z" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Contracts
                </h3>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  {/* Icon placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="19"
                    viewBox="0 0 14 19"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_235_7722)">
                      <path
                        d="M2.5 0.25C1.25898 0.25 0.25 1.25898 0.25 2.5V16C0.25 17.241 1.25898 18.25 2.5 18.25H11.5C12.741 18.25 13.75 17.241 13.75 16V5.875H9.25C8.62773 5.875 8.125 5.37227 8.125 4.75V0.25H2.5ZM9.25 0.25V4.75H13.75L9.25 0.25ZM3.0625 2.5H5.3125C5.62187 2.5 5.875 2.75312 5.875 3.0625C5.875 3.37188 5.62187 3.625 5.3125 3.625H3.0625C2.75312 3.625 2.5 3.37188 2.5 3.0625C2.5 2.75312 2.75312 2.5 3.0625 2.5ZM3.0625 4.75H5.3125C5.62187 4.75 5.875 5.00313 5.875 5.3125C5.875 5.62187 5.62187 5.875 5.3125 5.875H3.0625C2.75312 5.875 2.5 5.62187 2.5 5.3125C2.5 5.00313 2.75312 4.75 3.0625 4.75ZM4.96797 13.6727C4.75352 14.3863 4.09609 14.875 3.35078 14.875H3.0625C2.75312 14.875 2.5 14.6219 2.5 14.3125C2.5 14.0031 2.75312 13.75 3.0625 13.75H3.35078C3.60039 13.75 3.81836 13.5883 3.88867 13.3492L4.4125 11.609C4.53203 11.2117 4.89766 10.9375 5.3125 10.9375C5.72734 10.9375 6.09297 11.2082 6.2125 11.609L6.62031 12.966C6.88047 12.748 7.21094 12.625 7.5625 12.625C8.12148 12.625 8.63125 12.9414 8.88086 13.4406L9.03555 13.75H10.9375C11.2469 13.75 11.5 14.0031 11.5 14.3125C11.5 14.6219 11.2469 14.875 10.9375 14.875H8.6875C8.47305 14.875 8.27969 14.7555 8.18477 14.5656L7.87539 13.9434C7.81562 13.8238 7.69609 13.75 7.56602 13.75C7.43594 13.75 7.31289 13.8238 7.25664 13.9434L6.94727 14.5656C6.84531 14.773 6.62383 14.8961 6.39531 14.875C6.1668 14.8539 5.96992 14.6957 5.90664 14.4777L5.3125 12.5195L4.96797 13.6727Z"
                        fill="#2563EB"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7722">
                        <path
                          d="M0.25 0.25H13.75V18.25H0.25V0.25Z"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-900">8</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">+5 this week</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-medium text-gray-600">
                  Notifications Today
                </h2>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  {/* Icon placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_235_7735)">
                      <path
                        d="M8.00006 0.25C7.37779 0.25 6.87506 0.752734 6.87506 1.375V2.05C4.30865 2.57031 2.37506 4.84141 2.37506 7.5625V8.22344C2.37506 9.87578 1.76686 11.4719 0.669981 12.7094L0.409825 13.0012C0.114513 13.3316 0.0442001 13.8063 0.223497 14.2105C0.402794 14.6148 0.807091 14.875 1.25006 14.875H14.7501C15.193 14.875 15.5938 14.6148 15.7766 14.2105C15.9594 13.8063 15.8856 13.3316 15.5903 13.0012L15.3301 12.7094C14.2333 11.4719 13.6251 9.8793 13.6251 8.22344V7.5625C13.6251 4.84141 11.6915 2.57031 9.12506 2.05V1.375C9.12506 0.752734 8.62232 0.25 8.00006 0.25ZM9.59264 17.5926C10.0145 17.1707 10.2501 16.5977 10.2501 16H8.00006H5.75006C5.75006 16.5977 5.98561 17.1707 6.40748 17.5926C6.82936 18.0145 7.4024 18.25 8.00006 18.25C8.59772 18.25 9.17076 18.0145 9.59264 17.5926Z"
                        fill="#9333EA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7735">
                        <path
                          d="M0.125 0.25H15.875V18.25H0.125V0.25Z"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-900">127</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">+30% vs yesterday</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-600">
                  Active Subscriptions
                </h3>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  {/* Icon placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="19"
                    viewBox="0 0 14 19"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_235_7748)">
                      <path
                        d="M2.81641 1.62117C2.29609 1.30125 1.64219 1.2907 1.11133 1.58953C0.580469 1.88836 0.25 2.45086 0.25 3.06257V15.4376C0.25 16.0493 0.580469 16.6118 1.11133 16.9106C1.64219 17.2094 2.29609 17.1954 2.81641 16.879L12.9414 10.6915C13.4441 10.3856 13.75 9.8407 13.75 9.25007C13.75 8.65945 13.4441 8.11804 12.9414 7.80867L2.81641 1.62117Z"
                        fill="#16A34A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7748">
                        <path
                          d="M0.25 0.25H13.75V18.25H0.25V0.25Z"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-900">24</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">+3 this week</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-600">
                  Success Rate
                </h3>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center ">
                  {/* Icon placeholder */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path d="M18 18.25H0V0.25H18V18.25Z" stroke="#E5E7EB" />
                    <path
                      d="M2.25 2.5C2.25 1.87773 1.74727 1.375 1.125 1.375C0.502734 1.375 0 1.87773 0 2.5V14.3125C0 15.8664 1.25859 17.125 2.8125 17.125H16.875C17.4973 17.125 18 16.6223 18 16C18 15.3777 17.4973 14.875 16.875 14.875H2.8125C2.50312 14.875 2.25 14.6219 2.25 14.3125V2.5ZM16.5445 5.54453C16.984 5.10508 16.984 4.39141 16.5445 3.95195C16.1051 3.5125 15.3914 3.5125 14.952 3.95195L11.25 7.65742L9.23203 5.63945C8.79258 5.2 8.07891 5.2 7.63945 5.63945L3.70195 9.57695C3.2625 10.0164 3.2625 10.7301 3.70195 11.1695C4.14141 11.609 4.85508 11.609 5.29453 11.1695L8.4375 8.03008L10.4555 10.048C10.8949 10.4875 11.6086 10.4875 12.048 10.048L16.548 5.54805L16.5445 5.54453Z"
                      fill="#EA580C"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-900">98.5%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">+0.3% this week</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications Overview
                </h3>
                <div className="flex gap-3">
                  <button className="flex mb-1 h-5 px-[12px] pr-[6.453px] justify-end items-center rounded-full border border-[#E5E7EB] bg-[#DBEAFE]">
                    <span class="w-[21px] h-3 text-center text-[#1D4ED8] font-inter text-xs font-normal leading-none ">
                      7D
                    </span>
                  </button>
                  <span class="w-[29px] h-4 shrink-0 text-center text-[#6B7280] font-inter text-xs font-normal leading-none mt-1">
                    30D
                  </span>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center"></div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Contract Types
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center"></div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                    {/* Icon placeholder */}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="13"
                      viewBox="0 0 10 13"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_235_7790)">
                        <path
                          d="M5.52974 1.4707C5.23677 1.17773 4.76099 1.17773 4.46802 1.4707L0.718018 5.2207C0.425049 5.51367 0.425049 5.98945 0.718018 6.28242C1.01099 6.57539 1.48677 6.57539 1.77974 6.28242L4.25005 3.80977V11.0004C4.25005 11.4152 4.58521 11.7504 5.00005 11.7504C5.41489 11.7504 5.75005 11.4152 5.75005 11.0004V3.80977L8.22036 6.28008C8.51333 6.57305 8.98911 6.57305 9.28208 6.28008C9.57505 5.98711 9.57505 5.51133 9.28208 5.21836L5.53208 1.46836L5.52974 1.4707Z"
                          fill="#16A34A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_235_7790">
                          <path d="M0.5 0.5H9.5V12.5H0.5V0.5Z" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        Large Deposit Detected
                      </h4>
                      <span className="flex h-6 px-[2.656px] py-1 pr-[2.656px] pl-2 justify-end items-center rounded-full border border-gray-200 bg-blue-100 ">
                        <p className="w-[31px] h-3 text-blue-700 font-inter text-[12px] font-normal leading-none">
                          DeFi
                        </p>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      10,000 USDC deposited to Aave Pool
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                    {/* Icon placeholder */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_235_7802)">
                        <path
                          d="M0.750024 2.75033H8.25002V1.25033C8.25002 0.947984 8.43284 0.673766 8.71409 0.556578C8.99534 0.439391 9.31643 0.505016 9.53206 0.718297L11.7821 2.9683C11.9227 3.10892 12.0024 3.29877 12.0024 3.49798C12.0024 3.6972 11.9227 3.88705 11.7821 4.02767L9.53206 6.27767C9.31643 6.4933 8.99534 6.55658 8.71409 6.43939C8.43284 6.3222 8.25002 6.05033 8.25002 5.74564V4.25033H0.750024C0.335181 4.25033 2.44142e-05 3.91517 2.44142e-05 3.50033C2.44142e-05 3.08548 0.335181 2.75033 0.750024 2.75033ZM11.25 8.75033C11.6649 8.75033 12 9.08548 12 9.50033C12 9.91517 11.6649 10.2503 11.25 10.2503H3.75002V11.7503C3.75002 12.0527 3.56721 12.3269 3.28596 12.4441C3.00471 12.5613 2.68362 12.4956 2.46799 12.2824L0.217993 10.0324C0.0773682 9.89174 -0.00231934 9.70189 -0.00231934 9.50267C-0.00231934 9.30345 0.0773682 9.11361 0.217993 8.97298L2.46799 6.72298C2.68362 6.50736 3.00471 6.44408 3.28596 6.56127C3.56721 6.67845 3.75002 6.95033 3.75002 7.25502V8.75502H11.25V8.75033Z"
                          fill="#9333EA"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_235_7802">
                          <path d="M0 0.5H12V12.5H0V0.5Z" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        Uniswap Swap Alert
                      </h4>
                      <span className="flex h-6 px-[2.656px] py-1 pr-[2.656px] pl-2 justify-end items-center rounded-full border border-gray-200 bg-blue-100 ">
                        <p className="w-[31px] h-3 text-blue-700 font-inter text-[12px] font-normal leading-none">
                          DeFi
                        </p>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Large swap 50 ETH → 49,432 USDC
                    </p>
                    <p className="text-xs text-gray-500 mt-1">8 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                    {/* Icon placeholder */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                    >
                      <path d="M12 12.5H0V0.5H12V12.5Z" stroke="#E5E7EB" />
                      <path
                        d="M0 2.75C0 1.92266 0.672656 1.25 1.5 1.25H10.5C11.3273 1.25 12 1.92266 12 2.75V10.25C12 11.0773 11.3273 11.75 10.5 11.75H1.5C0.672656 11.75 0 11.0773 0 10.25V2.75ZM7.58906 5.24609C7.48359 5.09141 7.31016 5 7.125 5C6.93984 5 6.76406 5.09141 6.66094 5.24609L4.62187 8.23672L4.00078 7.46094C3.89297 7.32734 3.73125 7.25 3.5625 7.25C3.39375 7.25 3.22969 7.32734 3.12422 7.46094L1.62422 9.33594C1.48828 9.50469 1.4625 9.73672 1.55625 9.93125C1.65 10.1258 1.84687 10.25 2.0625 10.25H4.3125H5.0625H9.9375C10.1461 10.25 10.3383 10.1352 10.4344 9.95C10.5305 9.76484 10.5187 9.54219 10.4016 9.37109L7.58906 5.24609ZM2.625 5C2.92337 5 3.20952 4.88147 3.4205 4.6705C3.63147 4.45952 3.75 4.17337 3.75 3.875C3.75 3.57663 3.63147 3.29048 3.4205 3.0795C3.20952 2.86853 2.92337 2.75 2.625 2.75C2.32663 2.75 2.04048 2.86853 1.8295 3.0795C1.61853 3.29048 1.5 3.57663 1.5 3.875C1.5 4.17337 1.61853 4.45952 1.8295 4.6705C2.04048 4.88147 2.32663 5 2.625 5Z"
                        fill="#EA580C"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        NFT Transfer
                      </h4>
                      <span className="flex h-6 pr-[2.875px] pl-2 py-1 justify-end items-center rounded-full border border-gray-200 bg-purple-100">
                        <p className="w-[29px] h-3 text-[#7E22CE] font-inter text-xs font-normal leading-none">
                          {" "}
                          NFT
                        </p>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Bored Ape #4823 transferred
                    </p>
                    <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Most Active */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Most Active
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {/* Icon placeholder */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_235_7831)">
                          <path
                            d="M12.6562 2.375C12.6562 2.79688 12.3211 3.18594 11.7563 3.5C11.0742 3.87734 10.057 4.14453 8.88984 4.22422C8.80312 4.18203 8.71641 4.14219 8.625 4.10703C7.70156 3.72031 6.47344 3.5 5.15625 3.5C4.96172 3.5 4.77187 3.50469 4.58203 3.51406L4.55625 3.5C3.99141 3.18594 3.65625 2.79688 3.65625 2.375C3.65625 1.33906 5.67188 0.5 8.15625 0.5C10.6406 0.5 12.6562 1.33906 12.6562 2.375ZM4.42266 4.27578C4.66172 4.25938 4.90781 4.25 5.15625 4.25C6.61406 4.25 7.90781 4.53828 8.73047 4.98594C9.31172 5.30234 9.65625 5.69609 9.65625 6.125C9.65625 6.21875 9.63984 6.31016 9.60703 6.39922C9.49922 6.70859 9.20859 6.99219 8.78672 7.23125C8.78438 7.23359 8.77969 7.23359 8.77734 7.23594C8.77031 7.24062 8.76328 7.24297 8.75625 7.24766C7.93594 7.70234 6.62813 7.99766 5.15625 7.99766C3.75938 7.99766 2.51016 7.73281 1.68281 7.31562C1.63828 7.29453 1.59609 7.27109 1.55391 7.24766C0.991406 6.93594 0.65625 6.54688 0.65625 6.125C0.65625 5.30937 1.90781 4.61328 3.65625 4.35781C3.90234 4.32266 4.15781 4.29453 4.42266 4.27578ZM10.4062 6.125C10.4062 5.61172 10.1578 5.18984 9.84141 4.87344C10.5047 4.77031 11.1117 4.60625 11.6273 4.39297C12.0094 4.23359 12.3656 4.03672 12.6562 3.79531V4.625C12.6562 5.07734 12.2695 5.49453 11.6297 5.81797C11.2875 5.99141 10.8703 6.13906 10.4016 6.25156C10.4039 6.20937 10.4062 6.16953 10.4062 6.12734V6.125ZM9.65625 8.375C9.65625 8.79688 9.32109 9.18594 8.75625 9.5C8.71406 9.52344 8.67188 9.54453 8.62734 9.56797C7.80234 9.98516 6.55312 10.25 5.15625 10.25C3.68438 10.25 2.37656 9.95469 1.55625 9.5C0.991406 9.18594 0.65625 8.79688 0.65625 8.375V7.54531C0.949219 7.78672 1.30313 7.98359 1.68516 8.14297C2.61094 8.52969 3.83906 8.75 5.15625 8.75C6.47344 8.75 7.70156 8.52969 8.62734 8.14297C8.81016 8.06797 8.98594 7.98125 9.15234 7.8875C9.29531 7.80781 9.42891 7.71875 9.55547 7.625C9.59063 7.59922 9.62344 7.57109 9.65625 7.54531V7.625V7.75859V8.375ZM10.4062 8.375V7.625V7.01797C10.8516 6.91953 11.2617 6.79531 11.6273 6.64297C12.0094 6.48359 12.3656 6.28672 12.6562 6.04531V6.875C12.6562 7.12109 12.5391 7.36719 12.307 7.59922C11.925 7.98125 11.2523 8.29531 10.4016 8.49922C10.4039 8.45937 10.4062 8.41719 10.4062 8.375ZM5.15625 11C6.47344 11 7.70156 10.7797 8.62734 10.393C9.00938 10.2336 9.36563 10.0367 9.65625 9.79531V10.625C9.65625 11.6609 7.64062 12.5 5.15625 12.5C2.67188 12.5 0.65625 11.6609 0.65625 10.625V9.79531C0.949219 10.0367 1.30313 10.2336 1.68516 10.393C2.61094 10.7797 3.83906 11 5.15625 11Z"
                            fill="#2563EB"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_235_7831">
                            <path
                              d="M0.65625 0.5H12.6562V12.5H0.65625V0.5Z"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Uniswap V3</h4>
                      <p className="text-sm text-gray-600">47 notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      {/* Icon placeholder */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_235_7842)">
                          <path
                            d="M6.36096 0.560742L1.11096 2.81074C0.78284 2.95137 0.600027 3.30293 0.672684 3.6498C0.74534 3.99668 1.05003 4.2498 1.40628 4.2498V4.4373C1.40628 4.74902 1.65706 4.9998 1.96878 4.9998H11.3438C11.6555 4.9998 11.9063 4.74902 11.9063 4.4373V4.2498C12.2625 4.2498 12.5696 3.99902 12.6399 3.6498C12.7102 3.30059 12.5274 2.94902 12.2016 2.81074L6.95159 0.560742C6.76409 0.481055 6.54846 0.481055 6.36096 0.560742ZM3.65628 5.7498H2.15628V10.3506C2.14222 10.3576 2.12815 10.367 2.11409 10.3764L0.98909 11.1264C0.714871 11.3092 0.590652 11.6514 0.686746 11.9678C0.78284 12.2842 1.07581 12.4998 1.40628 12.4998H11.9063C12.2367 12.4998 12.5274 12.2842 12.6235 11.9678C12.7196 11.6514 12.5977 11.3092 12.3211 11.1264L11.1961 10.3764C11.1821 10.367 11.168 10.36 11.1539 10.3506V5.7498H9.65628V10.2498H8.71878V5.7498H7.21878V10.2498H6.09378V5.7498H4.59378V10.2498H3.65628V5.7498ZM6.65628 1.9998C6.85519 1.9998 7.04596 2.07882 7.18661 2.21947C7.32726 2.36013 7.40628 2.55089 7.40628 2.7498C7.40628 2.94872 7.32726 3.13948 7.18661 3.28013C7.04596 3.42079 6.85519 3.4998 6.65628 3.4998C6.45737 3.4998 6.2666 3.42079 6.12595 3.28013C5.9853 3.13948 5.90628 2.94872 5.90628 2.7498C5.90628 2.55089 5.9853 2.36013 6.12595 2.21947C6.2666 2.07882 6.45737 1.9998 6.65628 1.9998Z"
                            fill="#16A34A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_235_7842">
                            <path
                              d="M0.65625 0.5H12.6562V12.5H0.65625V0.5Z"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Aave Pool</h4>
                      <p className="text-sm text-gray-600">29 notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <span className="text-sm font-medium">+8%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      {/* Icon placeholder */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_235_7853)">
                          <path
                            d="M0.65625 2.75C0.65625 1.92266 1.32891 1.25 2.15625 1.25H11.1562C11.9836 1.25 12.6562 1.92266 12.6562 2.75V10.25C12.6562 11.0773 11.9836 11.75 11.1562 11.75H2.15625C1.32891 11.75 0.65625 11.0773 0.65625 10.25V2.75ZM8.24531 5.24609C8.13984 5.09141 7.96641 5 7.78125 5C7.59609 5 7.42031 5.09141 7.31719 5.24609L5.27812 8.23672L4.65703 7.46094C4.54922 7.32734 4.3875 7.25 4.21875 7.25C4.05 7.25 3.88594 7.32734 3.78047 7.46094L2.28047 9.33594C2.14453 9.50469 2.11875 9.73672 2.2125 9.93125C2.30625 10.1258 2.50312 10.25 2.71875 10.25H4.96875H5.71875H10.5938C10.8023 10.25 10.9945 10.1352 11.0906 9.95C11.1867 9.76484 11.175 9.54219 11.0578 9.37109L8.24531 5.24609ZM3.28125 5C3.57962 5 3.86577 4.88147 4.07675 4.6705C4.28772 4.45952 4.40625 4.17337 4.40625 3.875C4.40625 3.57663 4.28772 3.29048 4.07675 3.0795C3.86577 2.86853 3.57962 2.75 3.28125 2.75C2.98288 2.75 2.69673 2.86853 2.48575 3.0795C2.27478 3.29048 2.15625 3.57663 2.15625 3.875C2.15625 4.17337 2.27478 4.45952 2.48575 4.6705C2.69673 4.88147 2.98288 5 3.28125 5Z"
                            fill="#9333EA"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_235_7853">
                            <path
                              d="M0.65625 0.5H12.6562V12.5H0.65625V0.5Z"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">OpenSea</h4>
                      <p className="text-sm text-gray-600">16 notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-red-600">
                    <span className="text-sm font-medium">-33%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
