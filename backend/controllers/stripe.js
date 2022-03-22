import User from "../models/user";
import Stripe from "stripe";

// initialize stripe
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // Find user from db
  const user = await User.findById(req.user._id);

  // If user don't have stripe_account_id, create one
  if (!user.stripe_account_id) {
    // Create stripe account with a new stripe_account_id
    const account = await stripe.accounts.create({
      type: "express",
    });
    // Save stripe_account_id in the db
    user.stripe_account_id = account.id;
    user.save();
  } else {
    return res.status(400).json({
      message: "You already have a stripe account",
    });
  }

  // Create account link based on stripe_account_id (for frontend to complete onboarding)
  // Update payment schedule (Optional. default is 2days)
};
