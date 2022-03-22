import User from "../models/user";
import Stripe from "stripe";

// initialize stripe
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // Find user from db
  const user = await User.findById(req.user._id);

  // If user don't have stripe_account_id, create one
  const account = await stripe.accounts.create({
    type: "express",
  });
  console.log(account);

  // Create account link based on stripe_account_id (for frontend to complete onboarding)
  // Update payment schedule (Optional. default is 2days)
};
