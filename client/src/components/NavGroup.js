import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlanNav from "./PlanNav";

export default function NavGroup() {
  const [showPlans, setShowPlans] = useState(false);

  function handleShowPlans() {
    setShowPlans(!showPlans);
  }
  return (
    <ul className="navGroup">
      <li className="navSolo">
        <Link to="/ourRange">Meals</Link>
      </li>
      <li className="navSolo">
        <Link to="/">links</Link>
      </li>
      <li className="navSolo " onClick={handleShowPlans}>
        Plans
        <div
          className="navContent"
          style={showPlans ? { display: "block" } : { display: "none" }}
        >
          <PlanNav />
        </div>
      </li>
      <li className="navSolo">
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}
