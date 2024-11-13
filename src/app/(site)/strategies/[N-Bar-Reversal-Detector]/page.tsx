"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import TradingViewInput from "@/components/TradingViewInput";
import { FaChartLine, FaBullseye, FaExclamationTriangle } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { clientCommandMessageReg } from "bullmq";

const NBarReversalDetectorPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen"
    >
      {/* Breadcrumb Section */}
      <Breadcrumb pageName="N Bar Reversal Detector" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2 mb-8 lg:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/backtesting/Screenshot from 2024-10-08 11-23-14.png"
              alt="N Bar Reversal Strategy Performance"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
              priority
            />
          </motion.div>

          {/* Header */}
          <div className="lg:ml-12 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              N Bar Reversal Strategy
            </h1>
            <p className="text-xl text-gray-600">
              Discover the power of the N Bar Reversal Detector to optimize your trading strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <TradingViewInput />
          </div>
          <div className="md:w-1/2 md:pl-6 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Start Analyzing
            </motion.button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 py-12 space-y-16">
        {/* Strategy Description */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaBullseye className="text-indigo-500 mr-2" />
            What is N Bar Reversal Detector?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            The N Bar Reversal Detector strategy is designed to identify potential reversals in asset prices by analyzing a specific number of bars or candlesticks. This strategy assumes that asset prices will revert to their mean over time, allowing for strategic buy and sell decisions.
          </p>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaChartLine className="text-indigo-500 mr-2" />
            How It Works
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The strategy monitors the price action over a set number of bars. When a reversal pattern is detected, it triggers a buy or sell signal. This approach is particularly effective in volatile markets where price reversals are common.
          </p>

        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaBullseye className="text-indigo-500 mr-2" />
            Benefits
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>📈 Identifies potential reversals early.</li>
            <li>🧠 Helps in making informed trading decisions.</li>
            <li>🔗 Can be used in conjunction with other indicators for better accuracy.</li>
            <li>🔍 Enhances market analysis with precise data.</li>
          </ul>
        </motion.div>

        {/* Risks Section */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaExclamationTriangle className="text-indigo-500 mr-2" />
            Risks
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            As with any trading strategy, there are risks involved. The N Bar Reversal Detector may not always accurately predict reversals, especially in trending markets. It&apos;s important to use this strategy as part of a broader trading plan.
          </p>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default NBarReversalDetectorPage;
