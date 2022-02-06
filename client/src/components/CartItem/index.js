import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "../../utils/GlobalState/actions";
import { idbPromise } from "../../utils/helpers";
import { BsTrash } from "react-icons/bs";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: item.id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        id: item.id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        id: item.id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div className="cartItem">
        <img src={`${item.img}`} alt="" />
      </div>
      <div>
        <div>
          {item.mealName} ${item.price}
        </div>
        <div className="cartQty">
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            <BsTrash className="cartTrash" style={{ cursor: "pointer" }} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
