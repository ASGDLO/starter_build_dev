import Image from "next/image";
import Link from 'next/link';

const Strategy = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-dark-2">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Free Strategies</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Discover the algorithmic trading strategies we employ to help you maximize your profits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* N Bar Reversal Detector Strategy */}
          <Link href="/strategies/N-Bar-Reversal-Detector" className="block">
            <div className="bg-white dark:bg-dark-1 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-2">N Bar Reversal Detector</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This strategy assumes that asset prices will revert to their mean over time, allowing for strategic buy and sell decisions.
                </p>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
                <Image
                  src="/images/backtesting/Screenshot from 2024-10-08 11-23-14.png"
                  alt="Backtesting Screenshot"
                  width={500} // Adjust the width as needed
                  height={300} // Adjust the height as needed
                  className="rounded-lg"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Strategy;