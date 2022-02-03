import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UPDATE_FILTER } from "../utils/GlobalState/actions";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
export default function FilterForm() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [formState, setFormState] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  useEffect(() => {
    setFormState(new Array(state.meals.length).fill(false));
  }, [state.meals.length]);

  function handleFilter(args) {
    dispatch({ type: UPDATE_FILTER, filters: args });
  }

  const handleOnChange = (event) => {
    const id = parseInt(event.target.id);
    const updatedCheckedState = formState.map((item, index) =>
      index === id ? (item = !item) : item
    );

    setFormState(updatedCheckedState);
    const filters = updatedCheckedState.reduce((acc, cur, index) => {
      if (cur === true) {
        acc.push(state.meals[index].mealName);
      }
      return acc;
    }, []);

    handleFilter(filters);
  };

  const { meals, filters } = state;
  return showFilter ? (
    <aside className="filterAside">
      <div className="showFilterBtn" onClick={handleShowFilter}>
        <BsChevronUp onClick={handleShowFilter} />
      </div>
      <form>
        {meals.map((meal, index) => {
          return (
            <div>
              <input
                type="checkbox"
                key={index}
                id={index}
                name={meal.mealName}
                onChange={(event) => {
                  handleOnChange(event);
                }}
              ></input>
              <label htmlFor={meal.mealName}>{meal.mealName}</label>
            </div>
          );
        })}
      </form>
    </aside>
  ) : (
    <div>
      <div className="showFilterBtn" onClick={handleShowFilter}>
        <BsChevronDown />
      </div>
    </div>
  );
}
