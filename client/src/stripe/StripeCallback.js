import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = ({ history }) => {
  const { auth } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      //  update user in local storage
      updateUserInLocalStorage(res.data, () => {
        // update user in redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        // redirect user to dashboard
        window.location.href = "/dashboard/seller";
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      accountStatus();
    }
  }, [auth]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5">
      <LoadingOutlined className="h1 text-primary p-5" />
      <p className="text-muted">Communicating with Stripe...</p>
    </div>
  );
};

export default StripeCallback;
