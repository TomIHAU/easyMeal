import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UPDATE_FILTER } from "../utils/GlobalState/actions";

export default function FilterForm() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state.meals);
  const [formState, setFormState] = useState(
    new Array(state.meals.length).fill(false)
  );
  console.log("formstate", formState);
  function handleFilter(...args) {
    dispatch({ type: UPDATE_FILTER, filters: args });
  }
  const handleOnChange = (event) => {
    const updatedCheckedState = formState.map((item, index) =>
      index === event.target.id ? (item = !item) : item
    );

    console.log(event.target.id);
    console.log(updatedCheckedState);

    setFormState(updatedCheckedState);
    const filters = updatedCheckedState.reduce((acc, cur, index) => {
      if (cur === true) {
        return acc.push(state.meals[index].mealName);
      }
      return acc;
    }, []);
    console.log(filters);
    handleFilter(filters);
  };
  //   function handleFormChange(event) {
  //     const { name, value } = event.target;
  //     setFormState({
  //       ...formState,
  //       [name]: value,
  //     });
  //   }

  //   useEffect(() => {

  //     console.log(formState);
  //     handleFilter(formState);
  //   }, [formState, dispatch]);

  return (
    <div>
      <h2>this is to filter stuff</h2>
      <form>
        {state.meals.map((meal, index) => {
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
              <label for={meal.mealName}>{meal.mealName}</label>
            </div>
          );
        })}
      </form>
    </div>
  );
}
