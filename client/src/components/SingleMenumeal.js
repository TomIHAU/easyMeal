import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
} from "../utils/GlobalState/actions";

export default function SingleMenuMeal({ meal }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem.id === meal.id);
    console.log(cart);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        id: meal.id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      // idbPromise("cart", "put", {
      //   ...itemInCart,
      //   purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      // });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...meal, purchaseQuantity: 1 },
      });
      // idbPromise("cart", "put", { ...meal, purchaseQuantity: 1 });
    }
  };
  return (
    <div>
      <div className="planMealTop">
        <img src={meal.img} alt={meal.mealName}></img>
      </div>
      <div className="planMealBot">
        <div className="planMealBotHeader">
          <h3>{meal.mealName}</h3>
        </div>
        <div className="planMealPrice">
          <p>${meal.price}</p>
        </div>
        <div className="planMealStats">
          <p>C:{meal.carbs}</p>
          <p>F:{meal.fat}</p>
          <p>P:{meal.protein}</p>
        </div>
        <button onClick={addToCart}></button>
      </div>
    </div>
  );
}
