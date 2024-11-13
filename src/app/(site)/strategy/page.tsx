import Strategy from "@/components/Strategy";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy | crypto-build.com",
  description: "Explore our algorithmic trading strategies to maximize your profits.",
};

const StrategyPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Strategy" />
      <Strategy />
    </main>
  );
};

export default StrategyPage;