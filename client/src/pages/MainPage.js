import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UPDATE_MEALS } from "../utils/GlobalState/actions";
import { useQuery } from "@apollo/client";
import { QUERY_MEALS } from "../utils/queries";

export default function MainPage() {
  const dispatch = useDispatch();
  const { data } = useQuery(QUERY_MEALS);
  const [mealArr, setMealArr] = useState([]);

  useEffect(() => {
    if (data) {
      const meals = data.meals;
      dispatch({ type: UPDATE_MEALS, meals });
      setMealArr(data?.meals.slice(0, 4));
    }
  }, [data, dispatch]);
  return (
    <div className="App">
      <div className="mainBanner">
        <div className="mainBannerInfo">
          <h1>EasyMeal, Easy Life</h1>
          <p>
            EasyMeal is a food delivery service for the truely lazy. A wonderful
            selection of healthy meals available for low cost with a quality
            guarantee. Lorem Ipsum amazing food served straight to your door
          </p>
          <Link to="/ourRange">
            <button className="mainBannerBtn">Order Now!</button>
          </Link>
        </div>
        <div className="mainImgContainer">
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
        </div>
      </div>
      <div className="firstSales videoSales">
        <div className="preVid">
          <div>
            <h3>Meals Freshly Made Delivered To You</h3>
          </div>
          <div>
            <p>
              From the kitchen of Lorem Ipsum, we deliver anywhere that is
              profitable. Each of our meals mostly made the day of delivery.
              Beautifully packaged, nothing like what is shown in this video.
            </p>
          </div>
        </div>
        <div className="videoHalf">
          <video className="myVideo" loop="loop" autoPlay="autoplay" muted>
            <source src="/img/meal-prep-loop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="firstSales firstLinkSales">
        <h2>Try our Amazing Range of Products!</h2>
        <p>
          Amazing range of lorem ipsum healthy food which our chefs have lorem
          ipsum amazing!
        </p>
        <div className="firstSalesLinks">
          {mealArr.map((meal) => {
            return (
              <div key={meal.id} className="frontPageMealArr">
                <Link to={`/ourRange/${meal.id}`}>
                  <img src={meal.img} alt={meal.mealName} />
                </Link>
                <p>{meal.mealName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
