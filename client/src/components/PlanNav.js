import React from "react";
import { Link } from "react-router-dom";

export default function PlanNav() {
  return (
    <ul>
      <li>
        <Link to="/plan">plan</Link>
      </li>
      <li>
        <Link to="/">home</Link>
      </li>
    </ul>
  );
}
