import React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="App">
      <div className="mainBanner">
        <div className="mainBannerInfo">
          <h1>This is great</h1>
          <p>
            lorem ipsum asldkjfgasdlfhlksdj aflaskjdf lskadfjh alsdkf
            jasdlfkjhasd flkasjdfh laskdfj h
          </p>
          <Link to="/plan">
            <button>Order Now</button>
          </Link>
        </div>
        <div className="mainImgContainer">
          <img src="./img/foodTable.jpg" alt="food pic to make you hungry" />
        </div>
      </div>

      <div className="firstSales">
        <h2>head for selling the product</h2>
        <p>
          some sales stuff lorem ipsum asldkfjahslkdfjhsadlkfhalssd dsfa fdas
          fasf asf
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
