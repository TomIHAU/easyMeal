import React from "react";
import { Link } from "react-router-dom";

export default function PlanNav() {
  return (
    <ul className="planNavDrop">
      <li>
        <Link to="/plan">Custom plan</Link>
      </li>
      <li>
        <Link to="/plan/1">Health Kick</Link>
      </li>
      <li>
        <Link to="/plan/2">Muscle Gain</Link>
      </li>
      <li>
        <Link to="/plan/3">Calorie Control</Link>
      </li>
    </ul>
  );
}
