import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import PlanNav from "./PlanNav";

export default function Nav() {
  return (
    <div className="navBar">
      <h2>EasyMeal</h2>
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
        <Link to="/login">
          <AiOutlineUser className="onHoverCus" />
        </Link>
        <Link to="/cart">
          <AiOutlineShoppingCart className="onHoverCus" />
        </Link>
      </div>
    </div>
  );
}
