import React from "react";

import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export default function MoreDetailsMeal({ mealId, setMoreDetails, addToCart }) {
  const state = useSelector((state) => state);

  let enhance = state.meals[mealId - 1];

  function handleOnChange() {
    setMoreDetails({
      show: false,
    });
  }

  return (
    <div className="mealEnhanceCont">
      <div className="mealEnhance">
        <div className="mealEnhanceInner">
          <div className="enhanceHead">
            <h1>{enhance.mealName}</h1>
            <AiOutlineClose
              onClick={handleOnChange}
              className="enhanceClose "
            ></AiOutlineClose>
          </div>
          <div className="enhanceMain">
            <div className="enhanceImgCont">
              <img src={`${enhance.img}`} alt={`${enhance.mealName}`} />
            </div>

            <div className="enhanceDes">
              <p>{enhance.mealDes}</p>{" "}
              <div>
                <p className="ingList">
                  <strong>Ingredients: </strong>Globe Artichoke, Pearl Couscous
                  [Durum Wheat Semolina], Pumpkin, Zucchini, Sun-Dried Tomatoes
                  [Sundried Tomatoes, Canola Oil, Salt, Food Acid (330), Sugar,
                  Herbs, Garlic, Vinegar, Water], Raisins, Olive Oil, Mixed
                  Spices, Salt, Black Pepper
                </p>
              </div>
              <div>
                <table>
                  <tr>
                    <td>Fat, Total</td>
                    <td>{enhance.fat}g</td>
                  </tr>
                  <tr>
                    <td>Fat, Saturated</td>
                    <td>{enhance.fat - 2}g</td>
                  </tr>
                  <tr>
                    <td>Carbs</td>
                    <td>{enhance.carbs}g</td>
                  </tr>
                  <tr>
                    <td>Sugars</td>
                    <td>{enhance.carbs - 1}g</td>
                  </tr>
                  <tr>
                    <td>Protein</td>
                    <td>{enhance.protein}g</td>
                  </tr>
                  <tr>
                    <td>Sodium</td>
                    <td>{Math.floor(Math.random() * 1000 + 1)}mg</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="enhanceBtn">
            <button
              className="mainBannerBtn"
              onClick={() => {
                addToCart(enhance);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
