import { Feature } from "@/types/feature";
import Newsletter from "./NewsletterForm";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black icon-3d"
      >
        <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 16V21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Copy Trading",
    paragraph: "Easily replicate expert trader strategies without needing any prior experience.",
    btn: "Start Copying",
    btnLink: "https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?ref=76333389",
  },
  {
    id: 2,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black icon-3d"
      >
        <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 6L12 3L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 10V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 10V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 10V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Profit Maximization",
    paragraph: "Follow top-performing traders to grow your portfolio with optimized returns.",
    btn: "Maximize Now",
    btnLink: "https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?ref=76333389",
  },
  {
    id: 3,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black icon-3d"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "User-Friendly Interface",
    paragraph: "Intuitive design that's easy to navigate for both beginners and experienced traders.",
    btn: "Explore Interface",
    btnLink: "https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?ref=76333389",
  },
  {
    id: 4,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-black icon-3d"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real-Time Tracking",
    paragraph: "Live monitoring of portfolio performance and trader activities.",
    btn: "Track Now",
    btnLink: "https://www.binance.com/en/copy-trading/lead-details/4174913719175507969?ref=76333389",
  }
];

export default function AwesomeFeatures() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Discover Our Features
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner shadow-gray-500">
                  <span className="text-black">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  {feature.paragraph}
                </p>
                <div className="text-center">
                  <a
                    href={feature.btnLink}
                    className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                  >
                    {feature.btn}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h3 className="mb-[6px] text-[28px] font-semibold leading-[40px] text-black">
            Join our newsletter!
          </h3>
          <p className="mb-5 text-base text-black">
            Enter your email to receive our latest newsletter.
          </p>
          <Newsletter />
        </div>
      </div>
    </section>
  );
}