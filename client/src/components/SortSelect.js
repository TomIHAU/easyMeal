import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { UPDATE_SORT } from "../utils/GlobalState/actions";

export default function SortSelect() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function handleSort(arg) {
    dispatch({ type: UPDATE_SORT, sort: arg });
  }

  return (
    <select
      value={state.sort}
      onChange={(event) => handleSort(event.target.value)}
    >
      <option value="">Sort by:</option>
      <option value="price">Price</option>
      <option value="carbs">Carbs</option>
      <option value="fat">Fat</option>
      <option value="protein">Protein</option>
    </select>
  );
}
