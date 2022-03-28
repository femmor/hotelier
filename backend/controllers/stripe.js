import User from "../models/user";
import Stripe from "stripe";
import queryString from "query-string";

// initialize stripe
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  // Find user from db
  const user = await User.findById(req.user._id).exec();

  // If user don't have stripe_account_id, create one
  if (!user.stripe_account_id) {
    // Create stripe account with a new stripe_account_id
    const account = await stripe.accounts.create({
      type: "express",
    });
    // Save stripe_account_id in the db
    user.stripe_account_id = account.id;
    user.save();
  }

  // Create account link based on stripe_account_id (for frontend to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  // pre-fill any user information
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });

  // Generate link and send to frontend
  const link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  res.send(link);

  // Update payment schedule (Optional. default is 2days)
};

// Update stripe payout delay days
const updatePayoutDelay = async accountId => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  // Find user from db
  const user = await User.findById(req.user._id).exec();

  // Get account status
  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  // Update payout delay days
  const updatedAccount = await updatePayoutDelay(user.stripe_account_id);

  // Find the user and update the user account status
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  // Send the updated user to frontend
  res.json(updatedUser);
};
