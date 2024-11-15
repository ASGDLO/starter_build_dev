"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";

const Pricing = () => {
  const basicPlan = pricingData.filter(
    (product) =>
      product.nickname === "Monthly Subscription" 
      // product.nickname === "Yearly Subscription" 

  );

  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Pricing Table"
            title="Join Our Membership"
            paragraph="join our membership to get unlimited access to all our strategies"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {basicPlan.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
