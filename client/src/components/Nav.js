import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

import { TOGGLE_CART } from "../utils/GlobalState/actions";
import Auth from "../utils/auth";
import NavGroup from "./NavGroup";

export default function Nav() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [width, setWidth] = useState(window.innerWidth);
  const [showNav, setShowNav] = useState(false);

  function handleShowNav() {
    setShowNav(!showNav);
  }

  useState(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  });
  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  return (
    <div className="navBar">
      {width > 500 ? (
        <Link to="/" className="compTitle">
          EasyMeal
        </Link>
      ) : (
        <div>
          <AiOutlineMenu
            className="hamburger onHoverCus"
            onClick={handleShowNav}
          />
          {showNav && <NavGroup />}
        </div>
      )}
      {width > 500 ? (
        <NavGroup />
      ) : (
        <Link to="/" className="compTitle">
          EasyMeal
        </Link>
      )}
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
