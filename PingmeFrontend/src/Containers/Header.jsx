import React from "react";

function Header() {
  return (
    <div className="bg-white/90 backdrop-blur-sm px-8 py-4 border-b border-gray-200">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">
              Connected: 0x742d...358d
            </span>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
  <g clip-path="url(#clip0_235_6919)">
    <path d="M4.22221 5.33333C4.83 5.33333 5.41289 5.09189 5.84266 4.66212C6.27243 4.23235 6.51388 3.64945 6.51388 3.04167C6.51388 2.43388 6.27243 1.85098 5.84266 1.42121C5.41289 0.991443 4.83 0.75 4.22221 0.75C3.61442 0.75 3.03153 0.991443 2.60176 1.42121C2.17198 1.85098 1.93054 2.43388 1.93054 3.04167C1.93054 3.64945 2.17198 4.23235 2.60176 4.66212C3.03153 5.09189 3.61442 5.33333 4.22221 5.33333ZM3.40401 6.19271C1.6405 6.19271 0.211792 7.62142 0.211792 9.38493C0.211792 9.67855 0.44991 9.91667 0.74353 9.91667H7.70089C7.99451 9.91667 8.23263 9.67855 8.23263 9.38493C8.23263 7.62142 6.80391 6.19271 5.04041 6.19271H3.40401Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_235_6919">
      <path d="M0.211792 0.75H8.23263V9.91667H0.211792V0.75Z" fill="white"/>
    </clipPath>
  </defs>
</svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
