import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
// import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import {
  TOGGLE_CART,
  ADD_MULTIPLE_TO_CART,
} from "../../utils/GlobalState/actions";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.css";

// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // useEffect(() => {
  //   if (data) {
  //     stripePromise.then((res) => {
  //       res.redirectToCheckout({ sessionId: data.checkout.session });
  //     });
  //   }
  // }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item.id);
      }
    });

    // getCheckout({
    //   variables: { products: productIds },
    // });
  }

  if (!state.cartOpen) {
    return <div style={{ display: "none" }}></div>;
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        <AiOutlineClose style={{ cursor: "pointer" }} />
      </div>
      <h2>Your Cart</h2>
      {state.cart.length ? (
        <div>
          {console.log(state.cart)}
          {state.cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="flex-row checkoutBtnCont">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button
                className="mainBannerBtn checkoutBtn"
                onClick={submitCheckout}
              >
                Checkout
              </button>
            ) : (
              <Link to="/login"> log in to check out!</Link>
            )}
          </div>
        </div>
      ) : (
        <h3>Nothing in your cart yet!</h3>
      )}
    </div>
  );
};

export default Cart;
