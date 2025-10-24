import React from "react";

function Button() {
  return (
    <section className="w-full bg-[#F9FAFB] border-t border-[#E5E7EB] py-16 px-4 md:px-20">
      {/* Heading */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
          How Ping It Works
        </h2>
        <p className="mt-2 text-base md:text-lg text-[#4B5563] leading-relaxed">
          Get started with smart contract notifications in just a few simple
          steps
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center max-w-7xl mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="relative w-full max-w-[300px] h-[262px] flex-shrink-0"
          >
            {/* Shadow Box */}
            <div className="absolute top-2 left-2 w-full h-full bg-black rounded-md" />

            {/* Card */}
            <div className="relative w-full h-full border border-[#C4C4C4] bg-white flex flex-col items-center justify-center p-6 z-10 rounded-md shadow-sm">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mb-4">
                {step}
              </div>
              <h3 className="text-lg font-bold text-black mb-2">
                Connect Wallet
              </h3>
              <p className="text-center text-gray-700 text-sm leading-5">
                Connect your MetaMask, Argent, or other supported wallet to get
                started with Ping It.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Button;
