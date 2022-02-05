import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

import Auth from "../utils/auth";

export default function Nav() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <div>
      <div>
        <span></span>
      </div>
    </div>
  );
}
