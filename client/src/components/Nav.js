import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

import { TOGGLE_CART } from "../utils/GlobalState/actions";
import Auth from "../utils/auth";
import PlanNav from "./PlanNav";

export default function Nav() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  return (
    <div className="navBar">
      <Link to="/" className="compTitle">
        EasyMeal
      </Link>
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
      <div className="userNavLinks">
        {Auth.loggedIn() ? (
          <Link className="onHoverCus" to="/mydashboard">
            <FaUserCog className="onHoverCus" />
          </Link>
        ) : (
          <Link className="onHoverCus" to="/login">
            <AiOutlineUser className="onHoverCus" />
          </Link>
        )}
        <AiOutlineShoppingCart className="onHoverCus" onClick={toggleCart} />
      </div>
    </div>
  );
}
