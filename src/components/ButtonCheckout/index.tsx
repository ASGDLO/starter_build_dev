// /src/components/ButtonCheckout/index.tsx

"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface ButtonCheckoutProps {
  variantId: string;
  redirectUrl: string;
}

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const ButtonCheckout = ({ variantId, redirectUrl }: ButtonCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleCheckout = async () => {
    if (!session || !session.user) {
      console.error("User is not authenticated");
      return;
    }

    const userId = (session.user as ExtendedUser).id; // Cast session.user to ExtendedUser

    setIsLoading(true);
    console.log("Button clicked!"); // Log for testing if the button works

    try {
      const response = await axios.post("/api/payment/subscribe", {
        userId,
        variantId,
        redirectUrl,
      });
      console.log("API Response: ", response.data); // Log the API response

      // Redirect to Lemon Squeezy checkout page
      if (response.data.checkoutURL) {
        window.location.href = response.data.checkoutURL;
      } else {
        console.error("Checkout URL missing in response");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? "Loading..." : "Subscribe Now"}
    </button>
  );
};

export default ButtonCheckout;
