import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";
import { getAccountBalance } from "../actions/stripe";

const { Meta } = Card;

const ConnectNav = () => {
  const [balance, setBalance] = useState(0);
  const { auth } = useSelector(state => ({ ...state }));
  const { user, token } = auth;

  useEffect(() => {
    getAccountBalance(token).then(res => {
      setBalance(res.data);
    });
  }, []);

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined: ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        user &&
        user.stripe_seller &&
        user.stripe_seller.charges_enabled && (
          <>
            <div>Pending Balance</div>

            <div>Payout Settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
