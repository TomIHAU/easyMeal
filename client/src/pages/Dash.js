import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Moment from "react-moment";
import Auth from "../utils/auth";
import { QUERY_USER_PURCHASES } from "../utils/queries";

export default function Dash() {
  const me = Auth.getProfile();
  const [myPurchases, setMyPurchases] = useState([]);

  const { data, loading, error } = useQuery(QUERY_USER_PURCHASES, {
    variables: { user_id: me.data.id },
  });

  useEffect(() => {
    if (data) {
      setMyPurchases(data.myPurchases);
    }
  }, [data, data?.myPurchases]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return `Error! ${error.message}`;

  return (
    <div className="about">
      <button
        className="mainBannerBtn logoutBtn"
        href="/"
        onClick={() => Auth.logout()}
      >
        logout
      </button>
      <div className="dashHeader">
        <h1>Welcome {me.data.username}</h1>
      </div>
      <div className="mainDash">
        {myPurchases.length ? (
          <div>
            <h2>Current Orders:</h2>
            <div className="myPurchases">
              {myPurchases.map((purchase) => {
                return (
                  <div className="anOrder">
                    <div>
                      Ordered on:{" "}
                      <Moment format="D MMM">
                        {parseInt(purchase.buyDate)}
                      </Moment>
                    </div>
                    <div>
                      {purchase.purchases.map((product) => {
                        return (
                          <div>
                            <p>
                              {product.qty} {product.meal_id.mealName}
                              {product.qty > 1 && `'s`}
                            </p>
                          </div>
                        );
                      })}{" "}
                    </div>
                    <div className="anOrderArrive">
                      <p>Estimated Delivery Date:</p>
                      <Moment format="D MMM" add={{ days: 6 }}>
                        {parseInt(purchase.buyDate)}
                      </Moment>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h2>No Orders Currently</h2>
        )}
      </div>
    </div>
  );
}
