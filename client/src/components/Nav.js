import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

export default function Nav() {
  return (
    <div className="navBar">
      <h2>appName</h2>
      <ul className="navGroup">
        <li className="navSolo">
          <Link to="/links">links</Link>
        </li>
        <li className="navSolo">
          <Link to="/links">links</Link>
        </li>
        <li className="navSolo">
          <Link to="/links">links</Link>
        </li>
        <li className="navSolo">
          <Link to="/links">links</Link>
        </li>
      </ul>
      <div className="userNavLinks">
        <AiOutlineUser />
        <AiOutlineShoppingCart />
      </div>
    </div>
  );
}
