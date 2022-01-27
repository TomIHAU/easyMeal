import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import PlanNav from "./PlanNav";

export default function Nav() {
  return (
    <div className="navBar">
      <h2>appName</h2>
      <ul className="navGroup">
        <li className="navSolo">
          <Link to="/plan">plan</Link>
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
          <Link to="/">links</Link>
        </li>
      </ul>
      <div className="userNavLinks">
        <AiOutlineUser />
        <AiOutlineShoppingCart />
      </div>
    </div>
  );
}
