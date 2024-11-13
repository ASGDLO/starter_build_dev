import {
  lemonSqueezySetup,
  createCheckout,
  cancelSubscription,
} from '@lemonsqueezy/lemonsqueezy.js';

export const createLemonSqueezyCheckout = async (
  variantId: string,
  userId: string,
  email: string,
  redirectUrl: string
) => {
  try {
    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });

    const storeId = process.env.LEMONSQUEEZY_STORE_ID;
    if (!storeId) {
      throw new Error('Missing Lemon Squeezy storeId');
    }

    // Ensure environment variables are set
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    if (!apiKey) {
      throw new Error('LEMONSQUEEZY_API_KEY is not defined');
    }

    const checkoutSession = await createCheckout(storeId, variantId, {
      productOptions: {
        redirectUrl,
      },
      checkoutData: {
        email,
        custom: {
          user_id: userId, // Use snake_case to match webhook payload
        },
      },
    });

    console.log('Checkout Session Response:', checkoutSession);

    if (
      checkoutSession &&
      checkoutSession.data &&
      checkoutSession.data.data &&
      checkoutSession.data.data.attributes &&
      checkoutSession.data.data.attributes.url
    ) {
      const checkoutUrl = checkoutSession.data.data.attributes.url;
      console.log('Checkout URL Generated:', checkoutUrl);
      return checkoutUrl;
    }

    throw new Error('Invalid response structure from Lemon Squeezy');
  } catch (error) {
    const err = error as Error;
    console.error('Lemon Squeezy Checkout Error:', err);
    if (err.cause) {
      console.error('Error details:', err.cause);
    } else {
      console.error('Error details:', err);
    }
    throw error;
  }
};

export const cancelLemonSqueezySubscription = async (
  subscriptionId: string
) => {
  try {
    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });

    const cancelledSubscription = await cancelSubscription(subscriptionId);
    console.log('Cancelled Subscription Response:', cancelledSubscription);

    return cancelledSubscription;
  } catch (error: any) {
    console.error(
      'Lemon Squeezy Cancel Subscription Error:',
      error.response?.data || error.message
    );
    throw error;
  }
};
