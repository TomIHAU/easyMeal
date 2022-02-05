import React, { useState } from "react";

import Auth from "../utils/auth";
export default function Dash() {
  const me = Auth.getProfile();

  return (
    <div className="About">
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

      <h2>your orders placed:</h2>
      <h2>your allergies / diet requirements</h2>
    </div>
  );
}
