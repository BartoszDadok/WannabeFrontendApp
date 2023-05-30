export const fetchStripePublishableKey = async () => {
  try {
    const response = await fetch(
      "https://wannabe.cyclic.app/stripe-publishable-key"
    );
    const { publishableStripeKey } = await response.json();

    return publishableStripeKey;
  } catch (e) {
    console.log(e);
    console.warn("Unable to fetch pusblishable key");
  }
};
