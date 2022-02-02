import React, { useState } from "react";

import Auth from "../utils/auth";
export default function Dash() {
  return (
    <div className="About">
      <h1>dhas</h1>
      <h2>orders placed</h2>
      <h2>allergies/dietrequirements</h2>
      <button href="/" onClick={() => Auth.logout()}>
        logout
      </button>
    </div>
  );
}
