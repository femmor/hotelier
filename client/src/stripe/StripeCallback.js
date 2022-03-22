import React, { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const StripeCallback = ({ history }) => {
  useEffect(() => {}, []);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-5">
      <LoadingOutlined className="h1 text-primary p-5" />
      <p className="text-muted">Communicating with Stripe...</p>
    </div>
  );
};

export default StripeCallback;
