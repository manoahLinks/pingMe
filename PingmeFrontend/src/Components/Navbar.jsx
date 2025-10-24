import React from "react";

const PingItLanding = () => {
  return (
    <div className="hidden lg:flex min-h-screen relative flex-col items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('Background-image.png')] bg-cover bg-center -z-10" />

      {/* Navbar */}
      <nav className="w-full max-w-[1306px] h-[47px] border border-black shadow-[3px_3px_0px_0px_black] mt-6 bg-white flex items-center justify-between relative z-10">
        {/* Left Logo Section */}
        <div className="flex h-full items-center bg-black text-white px-3">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2">
            {/* Logo SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
  <path d="M12.9033 0.604492C16.2782 0.604727 19.0136 3.34089 19.0136 6.71582V12.8271C19.0134 16.2019 16.278 18.9373 12.9033 18.9375H6.79196C3.41703 18.9375 0.680868 16.202 0.680634 12.8271V6.71582C0.680634 3.34075 3.41689 0.604492 6.79196 0.604492H12.9033Z" fill="#FCFCFC"/>
  <path d="M12.9033 0.604492C16.2782 0.604727 19.0136 3.34089 19.0136 6.71582V12.8271C19.0134 16.2019 16.278 18.9373 12.9033 18.9375H6.79196C3.41703 18.9375 0.680868 16.202 0.680634 12.8271V6.71582C0.680634 3.34075 3.41689 0.604492 6.79196 0.604492H12.9033Z" stroke="#E5E7EB"/>
  <path d="M9.94235 4.42389C9.57264 4.42389 9.27395 4.72258 9.27395 5.09229V5.49333C7.74915 5.80247 6.60034 7.15181 6.60034 8.76851V9.16119C6.60034 10.1429 6.23898 11.0912 5.58729 11.8265L5.43272 11.9998C5.25726 12.1962 5.21549 12.4781 5.32202 12.7183C5.42854 12.9586 5.66875 13.1131 5.93193 13.1131H13.9528C14.216 13.1131 14.4541 12.9586 14.5627 12.7183C14.6713 12.4781 14.6274 12.1962 14.452 11.9998L14.2974 11.8265C13.6457 11.0912 13.2844 10.145 13.2844 9.16119V8.76851C13.2844 7.15181 12.1355 5.80247 10.6108 5.49333V5.09229C10.6108 4.72258 10.3121 4.42389 9.94235 4.42389ZM10.8886 14.7277C11.1392 14.4771 11.2792 14.1366 11.2792 13.7815H9.94235H8.60554C8.60554 14.1366 8.74549 14.4771 8.99614 14.7277C9.24679 14.9784 9.58726 15.1183 9.94235 15.1183C10.2974 15.1183 10.6379 14.9784 10.8886 14.7277Z" fill="black"/>
</svg>
          </div>
          <span className="font-semibold">Ping It</span>
        </div>

        {/* Center Links */}
        <div className="flex items-center space-x-8 text-gray-700">
          <a href="#features" className="hover:text-black">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-black">
            How It Works
          </a>
          <a
            href="#dashboard"
            className="text-blue-600 font-medium hover:underline"
          >
            Dashboard
          </a>
        </div>

        {/* Right Button */}
        <div className="h-full bg-blue-600 px-6 flex items-center text-white font-medium cursor-pointer hover:bg-blue-700">
          Launch App
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full max-w-[1306px] px-6 text-center mt-20 relative z-10">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <g clip-path="url(#clip0_234_6325)">
    <path d="M4.28206 11.2744L3.43714 10.4295C3.20471 10.1971 3.12268 9.86076 3.22659 9.54904C3.30862 9.30568 3.418 8.98849 3.54925 8.62482H0.656277C0.42112 8.62482 0.20237 8.49904 0.0847921 8.29396C-0.032786 8.08888 -0.0300516 7.83732 0.0902609 7.63498L1.52581 5.21505C1.88128 4.61623 2.52385 4.24982 3.21839 4.24982H5.46878C5.5344 4.14045 5.60003 4.03927 5.66565 3.94084C7.9051 0.637711 11.241 0.528336 13.2317 0.894742C13.5489 0.952164 13.7949 1.20099 13.8551 1.51818C14.2215 3.51154 14.1094 6.84474 10.809 9.0842C10.7133 9.14982 10.6094 9.21545 10.5 9.28107V11.5315C10.5 12.226 10.1336 12.8713 9.53479 13.224L7.11487 14.6596C6.91253 14.7799 6.66096 14.7826 6.45589 14.6651C6.25081 14.5475 6.12503 14.3315 6.12503 14.0936V11.1623C5.73948 11.2963 5.40315 11.4057 5.14885 11.4877C4.84261 11.5861 4.50901 11.5014 4.27932 11.2744H4.28206ZM10.5 5.34357C10.7901 5.34357 11.0683 5.22834 11.2734 5.02322C11.4785 4.8181 11.5938 4.5399 11.5938 4.24982C11.5938 3.95974 11.4785 3.68154 11.2734 3.47642C11.0683 3.2713 10.7901 3.15607 10.5 3.15607C10.2099 3.15607 9.93175 3.2713 9.72663 3.47642C9.52151 3.68154 9.40628 3.95974 9.40628 4.24982C9.40628 4.5399 9.52151 4.8181 9.72663 5.02322C9.93175 5.22834 10.2099 5.34357 10.5 5.34357Z" fill="#1D4ED8"/>
  </g>
  <defs>
    <clipPath id="clip0_234_6325">
      <path d="M0 0.75H14V14.75H0V0.75Z" fill="white"/>
    </clipPath>
  </defs>
</svg>
          <span className="text-blue-700 font-medium text-sm">
            Smart Contract Notifications Made Simple
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-12 max-w-[903px] text-[3.75rem] leading-[3.75rem] font-extrabold text-black">
          Never Miss an On-Chain{" "}
          <span className="text-black/70 block"> Event Again</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-[658px] text-[#3A3A3A] text-base font-medium leading-[2.1rem]">
          Get instant notifications when specific functions or events are
          triggered in your favorite smart contracts. Stay informed, stay ahead.
        </p>

        {/* CTA Button */}
        <button className="inline-flex mt-16 h-[47px] w-[225.31px] border border-black shadow-[3px_3px_0px_0px_black]">
          <div className="flex items-center justify-center w-[180px] h-full px-[29px] py-[15px] bg-[#1D4ED8]">
            <span className="text-white font-medium text-base cursor-pointer transition hover:scale-[1.01]">
              Connect Wallet
            </span>
          </div>
          <div className="flex items-center justify-center w-[45.31px] h-full pr-[20.81px] bg-white">
            {/* Arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path d="M7.27968 5.97012C7.57264 6.26309..." fill="black" />
            </svg>
          </div>
        </button>
      </main>
    </div>
  );
};

export default PingItLanding;
