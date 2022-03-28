import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { getAccountBalance, currencyFormatter } from "../actions/stripe";

const { Meta } = Card;
const { Ribbon } = Badge;

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
            <Ribbon text="Available" color="blue">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Ribbon>

            <div>Payout Settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
