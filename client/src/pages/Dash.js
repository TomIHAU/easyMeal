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
        <div className="myDashDetails">
          <h2>My Details</h2>
          <div className="myDashSec">
            <h3>Contact Information</h3>
            <p>
              <strong>Email: </strong>
              {me.data.email}
            </p>
            <button className="mainBannerBtn dashBtn">Edit Contact Info</button>
          </div>
          <div className="myDashSec">
            <h3>Default Shipping Information</h3>
            {me.data.address ? (
              <div>hello</div>
            ) : (
              <h3>no Information provided</h3>
            )}
            <div className="dashBtnGroup">
              <button className="mainBannerBtn dashBtn">
                Edit Shipping Info
              </button>
              <button className="mainBannerBtn dashBtn">
                Remove Shipping Info
              </button>
            </div>
          </div>
        </div>
        {myPurchases.length ? (
          <div className="dashOrders">
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
