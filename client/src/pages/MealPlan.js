import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";
import { UPDATE_MEALS } from "../utils/GlobalState/actions";
import { plans, planBanner } from "../utils/plans";

import AddMealBtn from "../components/AddMealBtn";
import SinglePlanMeal from "../components/SinglePlanMeal";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { TOGGLE_SHOW_DAY, NEW_DAY_PLAN } from "../utils/GlobalState/actions";
import PlanTotalBar from "../components/PlanTotalBar";
import { useParams } from "react-router-dom";

function calculateDayTotal(arr, key, meals) {
  if (meals) {
    return arr.reduce((acc, cur) => {
      if (cur !== null) {
        acc += meals[cur][key];
      }
      return acc;
    }, 0);
  }
}

export default function MealPlan() {
  const { loading, data } = useQuery(QUERY_MEALS);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { planId } = useParams();
  const [showBanner, setShowBanner] = useState(true);

  function resetPlan() {
    console.log("planReset????", plans[0]);
    dispatch({ type: NEW_DAY_PLAN, plan: plans[0] });
  }
  useEffect(() => {
    if (planId) {
      dispatch({ type: NEW_DAY_PLAN, plan: plans[planId] });
    }
  }, [dispatch, planId]);

  useEffect(() => {
    if (data) {
      const meals = data.meals;
      dispatch({ type: UPDATE_MEALS, meals });
    }
  }, [data, dispatch]);

  const daysOpen = state.plan;

  const handleShowDay = (index) => {
    dispatch({ type: TOGGLE_SHOW_DAY, index });
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="mealPlan">
      {showBanner && (
        <div
          className="mealPlanIntro"
          style={
            planId
              ? { backgroundImage: `url(${planBanner[planId - 1].background})` }
              : { backgroundImage: `url("/img/bannerCustom.jpg")` }
          }
        >
          <h1 className="mealPlanBannerText">
            {planId ? planBanner[planId - 1].title : "Custom Plan"}
          </h1>
          <p className="mealPlanBannerText">
            {planId
              ? planBanner[planId - 1].desc
              : "You can use this space to plan out your weeks meals."}
          </p>
        </div>
      )}
      <p
        className="mealPlanBannerText hidePlanBanner"
        style={!showBanner ? { top: "60px" } : { top: "305px" }}
        onClick={() => {
          setShowBanner(!showBanner);
        }}
      >
        {showBanner ? "hide" : "show"}
      </p>
      {!planId && (
        <div className="startOverBtnCont">
          <button onClick={resetPlan} className="mainBannerBtn startOverBtn">
            Start again
          </button>
        </div>
      )}
      {daysOpen.map((day, index) => (
        <div key={day.day} className="day">
          <div className="dayHeader">
            <h2>Day {day.day}</h2>
            <div className="dayInfo">
              <p>Carbs: {calculateDayTotal(day.meals, "carbs", data?.meals)}</p>
              <p>Fat: {calculateDayTotal(day.meals, "fat", data?.meals)}</p>
              <p>Pro: {calculateDayTotal(day.meals, "protein", data?.meals)}</p>
            </div>
            {day.isOpen ? (
              <BsChevronUp
                id={index}
                onClick={() => handleShowDay(index)}
                className="mealPlanShowBtn"
              />
            ) : (
              <BsChevronDown
                id={index}
                onClick={() => handleShowDay(index)}
                className="mealPlanShowBtn"
              />
            )}
          </div>
          {day.isOpen && data.meals && (
            <div className="dayMeals" style={{ transition: "0.5s" }}>
              {day.meals.map((meal, index) =>
                meal === null ? (
                  <AddMealBtn dayIndex={day.day} mealIndex={index} />
                ) : (
                  <SinglePlanMeal
                    key={index + day.day}
                    meal={data?.meals[meal]}
                    mealIndex={index}
                    dayIndex={day.day}
                  />
                )
              )}
            </div>
          )}
        </div>
      ))}
      <PlanTotalBar daysOpen={daysOpen} meals={data?.meals} />
    </div>
  );
}
