import express from "express";
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSettings,
} from "../controllers/stripe";
import { requireSignIn } from "../middlewares";

const router = express.Router();

router.post("/create-connect-account", requireSignIn, createConnectAccount);
router.post("/get-account-status", requireSignIn, getAccountStatus);
router.post("/get-account-balance", requireSignIn, getAccountBalance);
router.post("/payout-settings", requireSignIn, payoutSettings);

module.exports = router;
