import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER_PURCHASES } from "../utils/queries";

export default function Dash() {
  const me = Auth.getProfile();
  const [myPurchases, setMyPurchases] = useState([]);

  const { data, loading, error } = useQuery(QUERY_USER_PURCHASES, {
    variables: { user_id: me.data.id },
  });
  console.log(me);
  console.log(data);
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
        <h2>your orders placed:</h2>
        <div className="myPurchases">
          {myPurchases.map((purchase) => {
            return (
              <div className="anOrder">
                <p>{purchase.meal_id.mealName}</p>
                <p>{purchase.qty}</p>
                <p>{purchase.buyDate}</p>
              </div>
            );
          })}
        </div>
        <h2>your allergies / diet requirements</h2>
      </div>
    </div>
  );
}
