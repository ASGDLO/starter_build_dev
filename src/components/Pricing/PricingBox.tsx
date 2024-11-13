"use client";

import { useRouter } from "next/navigation"; // Correct for Next.js 13 app directory
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";

// Extend the session user type to include 'id'
interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const PricingBox = ({ product }: { product: Price }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const variantId = "549948"; // Same as Code A, replace with your product's variant ID
  const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL; // Use NEXT_PUBLIC_SITE_URL for client-side access

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleCheckout = async () => {
    const user = session?.user as ExtendedUser; // Type assertion

    if (!user || !user.id) {
      alert("Please sign up first!");
      return;
    }

    const userId = user.id;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/payment/subscribe", {
        userId,
        priceId: product.id,
        variantId, // Added variantId from Code A
        redirectUrl, // Added redirect URL from Code A
      });

      if (response.data.checkoutURL) {
        window.location.href = response.data.checkoutURL;
        // Do not set isLoading to false here, as the page will redirect
        return;
      } else {
        console.error("Checkout URL missing in response");
        setIsLoading(false); // Set isLoading to false if no redirect URL
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setIsLoading(false); // Set isLoading to false if there's an error
    }
  }



  // const handleCheckout = () => {
  //   alert("Service is not yet launched. Please check back later.");
  //   // Prevent further processing
  // };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="relative z-10 mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-lg transition-transform transform hover:scale-105 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14">
        {product.nickname === "Premium" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
            Recommended
          </p>
        )}

        <span className="mb-5 block text-xl font-semibold text-dark dark:text-white">
          {product.nickname}
        </span>
        <h2 className="mb-11 text-4xl font-bold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
          {product.unit_amount === 0 ? (
            <span className="text-2xl font-bold">Free</span>
          ) : (
            <>
              <span className="text-xl font-medium">$ </span>
              <span className="-ml-1 -tracking-[2px]">
                {(product.unit_amount / 100).toLocaleString("en-US", {
                  currency: "USD",
                })}
              </span>
            </>
          )}

          {product.nickname === "Monthly Subscription" && (
            <span className="text-base font-normal text-body-color dark:text-dark-6">
              {" "}
              per month
            </span>
          )}
          {product.nickname === "Yearly Subscription" && (
            <span className="text-base font-normal text-body-color dark:text-dark-6">
              {" "}
              per year
            </span>
          )}
          {product.nickname === "Unlimited Access" && (
            <span className="text-base font-normal text-body-color dark:text-dark-6">
              {" "}
              Unlimited
            </span>
          )}
        </h2>

        <div className="mb-[50px]">
          <h3 className="mb-5 text-lg font-medium text-dark dark:text-white">
            Features
          </h3>
          <div className="mb-10">
            {product?.offers.map((offer, i) => (
              <OfferList key={i} text={offer} />
            ))}
          </div>
        </div>

        <div className="w-full">
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
          >
            {isLoading ? "Loading..." : "Purchase Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
