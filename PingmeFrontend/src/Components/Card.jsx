import React from "react";

function Card() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-16 bg-transparent">
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#111827] leading-tight">
          Powerful Features for Smart Contract Monitoring
        </h2>
        <p className="mt-2 text-lg text-[#4B5563]">
          Everything you need to stay connected with your smart contracts
        </p>
      </div>

      {/* Grid Container */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Multi-Wallet Support",
                description:
                  "Connect with MetaMask, Argent, Rabby, and other popular wallets. Seamless integration with your preferred wallet.",
                bg: "#F0F9FF",
                iconBg: "#2563EB",
                icon: (
                  // Replace this with your actual SVG icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path d="M20 20.5H0V0.5H20V20.5Z" stroke="#E5E7EB" />
                    <path
                      d="M2.5 1.75C1.12109 1.75 0 2.87109 0 4.25V16.75C0 18.1289 1.12109 19.25 2.5 19.25H17.5C18.8789 19.25 20 18.1289 20 16.75V8C20 6.62109 18.8789 5.5 17.5 5.5H3.125C2.78125 5.5 2.5 5.21875 2.5 4.875C2.5 4.53125 2.78125 4.25 3.125 4.25H17.5C18.1914 4.25 18.75 3.69141 18.75 3C18.75 2.30859 18.1914 1.75 17.5 1.75H2.5ZM16.25 11.125C16.5815 11.125 16.8995 11.2567 17.1339 11.4911C17.3683 11.7255 17.5 12.0435 17.5 12.375C17.5 12.7065 17.3683 13.0245 17.1339 13.2589C16.8995 13.4933 16.5815 13.625 16.25 13.625C15.9185 13.625 15.6005 13.4933 15.3661 13.2589C15.1317 13.0245 15 12.7065 15 12.375C15 12.0435 15.1317 11.7255 15.3661 11.4911C15.6005 11.2567 15.9185 11.125 16.25 11.125Z"
                      fill="white"
                    />
                  </svg>
                ),
              },
              {
                title: "Custom Filters",
                description:
                  "Set specific conditions like 'only if transfer > 1000 USDC' to receive only the notifications that matter to you.",
                bg: "#FEF2F2",
                iconBg: "#F97316",
                icon: (
                  // Replace this with your actual SVG icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path d="M20 20.5H0V0.5H20V20.5Z" stroke="#E5E7EB" />
                    <path
                      d="M0.152338 2.64453C0.41015 2.09766 0.957025 1.75 1.56249 1.75H18.4375C19.043 1.75 19.5898 2.09766 19.8476 2.64453C20.1055 3.19141 20.0273 3.83594 19.6445 4.30469L12.5 13.0352V18C12.5 18.4727 12.2344 18.9062 11.8086 19.1172C11.3828 19.3281 10.8789 19.2852 10.5 19L7.99999 17.125C7.68359 16.8906 7.49999 16.5195 7.49999 16.125V13.0352L0.351557 4.30078C-0.0273495 3.83594 -0.109381 3.1875 0.152338 2.64453Z"
                      fill="white"
                    />
                  </svg>
                ),
              },
            ].map((card, index) => (
              <div key={index} className="relative w-full max-w-sm mx-auto">
                <div className="absolute top-1.5 left-1.5 w-full h-full bg-black rounded-lg z-0" />
                <div
                  className="relative w-full h-[292px] rounded-lg p-6 z-10 flex flex-col"
                  style={{ backgroundColor: card.bg }}
                >
                  <div
                    className="w-10 h-10 mb-4 rounded-md text-white flex items-center justify-center"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Center Column */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute top-1.5 left-1.5 w-full h-full bg-black rounded-lg z-0" />
            <div className="relative w-full h-full bg-[#F5ECFF] rounded-lg p-6 z-10 flex flex-col justify-between">
              {/* Top Item */}
              <div className="mb-6">
                <div
                  className="w-10 h-10 mb-4 rounded-md text-white flex items-center justify-center"
                  style={{ backgroundColor: "#8B5CF6" }}
                >
                  {/* Icon 1 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_235_7544)">
                      <path
                        d="M3 0.5C1.62109 0.5 0.5 1.62109 0.5 3V18C0.5 19.3789 1.62109 20.5 3 20.5H13C14.3789 20.5 15.5 19.3789 15.5 18V6.75H10.5C9.80859 6.75 9.25 6.19141 9.25 5.5V0.5H3ZM10.5 0.5V5.5H15.5L10.5 0.5ZM..."
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7544">
                        <path d="M0.5 0.5H15.5V20.5H0.5V0.5Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Multi-Wallet Support
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Connect with MetaMask, Argent, Rabby, and other popular
                  wallets. Seamless integration with your preferred wallet.
                </p>
              </div>

              {/* Divider */}
              <hr className="my-6 border-t border-[#C4C4C4]" />

              {/* Bottom Item */}
              <div className="mb-[50px]">
                <div
                  className="w-10 h-10 mb-4 rounded-md text-white flex items-center justify-center "
                  style={{ backgroundColor: "#6366F1" }}
                >
                  {/* Icon 2 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_235_7582)">
                      <path
                        d="M1.25 3C1.25 1.62109 2.37109 0.5 3.75 0.5H10C11.3789 0.5 12.5 1.62109 12.5 3V10.5H12.8125C14.7109 10.5 16.25 12.0391 16.25 13.9375V15.1875C16.25 15.707 16.668 16.125 17.1875 16.125C17.707 16.125 18.125 15.707 18.125 15.1875V9.17188C17.0469 8.89453 16.25 7.91406 16.25 6.75V4.25L15 3C14.6562 2.65625 14.6562 2.09375 15 1.75C15.3438 1.40625 15.9062 1.40625 16.25 1.75L19.2695 4.76953C19.7383 5.23828 20 5.875 20 6.53906V7.0625V8V9.25V15.1875C20 16.7422 18.7422 18 17.1875 18C15.6328 18 14.375 16.7422 14.375 15.1875V13.9375C14.375 13.0742 13.6758 12.375 12.8125 12.375H12.5V18C13.1914 18 13.75 18.5586 13.75 19.25C13.75 19.9414 13.1914 20.5 12.5 20.5H1.25C0.558594 20.5 0 19.9414 0 19.25C0 18.5586 0.558594 18 1.25 18V3ZM3.75 3.625V7.375C3.75 7.71875 4.03125 8 4.375 8H9.375C9.71875 8 10 7.71875 10 7.375V3.625C10 3.28125 9.71875 3 9.375 3H4.375C4.03125 3 3.75 3.28125 3.75 3.625Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7582">
                        <path d="M0 0.5H20V20.5H0V0.5Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Gasless Setup
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  No gas fees required! Simply sign a <br></br> message to
                  confirm your <br></br>subscription preferences. Quick and{" "}
                  <br></br>
                  cost-effective.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Multi-Channel Alerts",
                description:
                  "Receive notifications via Email or Telegram. Choose your preferred communication channel for instant updates.",
                bg: "#ECFDF5",
                iconBg: "#10B981",
                icon: (
                  // Replace this with your actual SVG icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_235_7550)">
                      <path
                        d="M8.99998 0.5C8.30858 0.5 7.74998 1.05859 7.74998 1.75V2.5C4.89842 3.07812 2.74998 5.60156 2.74998 8.625V9.35938C2.74998 11.1953 2.0742 12.9688 0.855453 14.3438L0.566391 14.668C0.238266 15.0352 0.160141 15.5625 0.35936 16.0117C0.558578 16.4609 1.0078 16.75 1.49998 16.75H16.5C16.9922 16.75 17.4375 16.4609 17.6406 16.0117C17.8437 15.5625 17.7617 15.0352 17.4336 14.668L17.1445 14.3438C15.9258 12.9688 15.25 11.1992 15.25 9.35938V8.625C15.25 5.60156 13.1015 3.07812 10.25 2.5V1.75C10.25 1.05859 9.69139 0.5 8.99998 0.5ZM10.7695 19.7695C11.2383 19.3008 11.5 18.6641 11.5 18H8.99998H6.49998C6.49998 18.6641 6.7617 19.3008 7.23045 19.7695C7.6992 20.2383 8.33592 20.5 8.99998 20.5C9.66405 20.5 10.3008 20.2383 10.7695 19.7695Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7550">
                        <path d="M0.25 0.5H17.75V20.5H0.25V0.5Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ),
              },
              {
                title: "Subscription Management",
                description:
                  "Manage all your subscriptions in one place. Edit rules, pause notifications, or unsubscribe anytime with ease.",
                bg: "#FFFBEB",
                iconBg: "#EC4899",
                icon: (
                  // Replace this with your actual SVG icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_235_7556)">
                      <path
                        d="M12.625 9.875V1.14844C12.625 0.796875 12.8984 0.5 13.25 0.5C18.082 0.5 22 4.41797 22 9.25C22 9.60156 21.7031 9.875 21.3516 9.875H12.625ZM2 11.125C2 6.38672 5.51953 2.46484 10.0859 1.83984C10.4453 1.78906 10.75 2.07812 10.75 2.44141V11.75L16.8633 17.8633C17.125 18.125 17.1055 18.5547 16.8047 18.7656C15.2734 19.8594 13.3984 20.5 11.375 20.5C6.19922 20.5 2 16.3047 2 11.125ZM22.5625 11.75C22.9258 11.75 23.2109 12.0547 23.1641 12.4141C22.8633 14.5977 21.8125 16.5391 20.2773 17.9727C20.043 18.1914 19.6758 18.1758 19.4492 17.9453L13.25 11.75H22.5625Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_235_7556">
                        <path d="M0.75 0.5H23.25V20.5H0.75V0.5Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ),
              },
            ].map((card, index) => (
              <div key={index} className="relative w-full max-w-sm mx-auto">
                <div className="absolute top-1.5 left-1.5 w-full h-full bg-black rounded-lg z-0" />
                <div
                  className="relative w-full h-[292px] rounded-lg p-6 z-10 flex flex-col"
                  style={{ backgroundColor: card.bg }}
                >
                  <div
                    className="w-10 h-10 mb-4 rounded-md text-white flex items-center justify-center"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
