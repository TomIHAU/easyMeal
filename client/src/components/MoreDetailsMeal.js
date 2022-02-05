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
    <div>
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
              <p>{enhance.mealDes}</p>
              <div>
                <p>Fat: {enhance.fat}</p>
                <p>protein:{enhance.protein}</p>
                <p>Carbs:{enhance.carbs}</p>
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
