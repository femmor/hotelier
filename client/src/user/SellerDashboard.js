import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import {
  PlusOutlined,
  WifiOutlined,
  HomeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createConnectAccount } from "../actions/stripe";
import { toast } from "react-toastify";

const SellerDashboard = () => {
  const { auth } = useSelector(state => ({ ...state }));
  const { user } = auth;

  const [loading, setLoading] = useState(false);

  const handleStripe = async () => {
    setLoading(true);
    try {
      const res = await createConnectAccount(auth.token);
      console.log(res); // get login link
      setLoading(false);
    } catch (error) {
      toast.error("Stripe connection failed, please try again!", {
        theme: "colored",
      });
      setLoading(false);
    }
  };

  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your hotels</h2>
            <p>Here are all the hotels you have listed.</p>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/create">
              <div className="d-flex align-items-center gap-2">
                <PlusOutlined /> Add Hotel
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-3 text-center">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms.</h4>
            <p className="lead">
              We partner with stripe to transfer earnings to your bank account.
            </p>
            <button
              disabled={loading}
              className="btn btn-primary mb-3"
              onClick={handleStripe}
            >
              <div className="d-flex align-items-center gap-2">
                {loading ? "Processing..." : `Setup Payouts`}
              </div>
            </button>
            <p className="text-muted">
              <small>
                You will be redirected to stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth && user && user.stripe_seller && user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default SellerDashboard;
