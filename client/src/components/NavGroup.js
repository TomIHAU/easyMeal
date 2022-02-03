import React from "react";
import { Link } from "react-router-dom";
import PlanNav from "./PlanNav";

export default function NavGroup() {
  return (
    <ul className="navGroup">
      <li className="navSolo">
        <Link to="/ourRange">Meals</Link>
      </li>
      <li className="navSolo">
        <Link to="/">links</Link>
      </li>
      <li className="navSolo navHover">
        <p>Plans</p>
        <div className="navContent">
          <PlanNav />
        </div>
      </li>
      <li className="navSolo">
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}
