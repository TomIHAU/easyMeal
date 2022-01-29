import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { TOGGLE_CART } from "../utils/GlobalState/actions";
import PlanNav from "./PlanNav";
import Cart from "./Cart";

export default function Nav() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  function toggleCart() {
    console.log("hello");
    console.log(state);
    dispatch({ type: TOGGLE_CART });
  }
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
        <AiOutlineShoppingCart onClick={toggleCart} />
      </div>
    </div>
  );
}
