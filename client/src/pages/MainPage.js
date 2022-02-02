import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
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

      <div className="firstSales">
        <h2>head for selling the product</h2>
        <p>
          Amazing range of lorem ipsum healthy food which our chefs have lorem
          ipsum amazing!
        </p>
        <div className="firstSalesLinks">
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
        </div>
      </div>
    </div>
  );
}
