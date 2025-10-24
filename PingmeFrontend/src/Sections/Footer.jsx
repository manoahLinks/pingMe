import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-[#111827] border-t border-[#E5E7EB] py-10 px-4 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 border-b border-gray-700 pb-10">
          {/* Left Column */}
          <div className="max-w-md flex-1">
            {/* Logo */}
            <div className="flex items-center w-fit h-[47px] px-2 py-2 bg-black border border-black rounded gap-2">
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
              <p className="text-white text-base font-bold leading-7">
                Ping It
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-base leading-6 mt-4">
              The easiest way to stay informed about smart contract events.
              Never miss an important on-chain transaction again.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {["span.png", "Frame.png", "frame1.png"].map((src, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800"
                >
                  <img src={src} alt={`icon-${index}`} className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Features", "Dashboard", "API", "Pricing"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Documentation", "Help Center", "Contact Us", "Status"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-sm text-gray-500 pt-4">
          <p>© 2024 Ping It. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 mt-4 lg:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
