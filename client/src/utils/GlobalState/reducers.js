import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_MEALS,
  UPDATE_FILTER,
  UPDATE_SORT,
  TOGGLE_SHOW_DAY,
  UPDATE_DAY_PLAN,
  REMOVE_DAY_PLAN,
  RANDOM_DAY_PLAN,
} from "./actions";

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
  meals: [],
  filters: [],
  sort: "",
  plan: [
    { day: 1, isOpen: true, meals: [4, null, null, null, null] },
    { day: 2, isOpen: true, meals: [null, null, null, null, null] },
    { day: 3, isOpen: true, meals: [null, null, null, null, null] },
    { day: 4, isOpen: true, meals: [null, null, null, null, null] },
    { day: 5, isOpen: true, meals: [null, null, null, null, null] },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action.id === product.id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product.id !== action.id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    case UPDATE_MEALS:
      return {
        ...state,
        meals: [...action.meals],
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: [...action.filters],
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.sort,
      };
    case TOGGLE_SHOW_DAY:
      return {
        ...state,
        plan: state.plan.map((ele, index) => {
          if (action.index === index) {
            ele.isOpen = !ele.isOpen;
          }
          return ele;
        }),
      };
    case UPDATE_DAY_PLAN:
      return {
        ...state,
        plan: state.plan.map((day, index) => {
          if (parseInt(action.dayIndex) - 1 === index) {
            day.meals = day.meals.map((meal, index) => {
              if (parseInt(action.mealIndex) === index) {
                meal = parseInt(action.mealId - 1);
              }
              return meal;
            });
          }
          return day;
        }),
      };
    case REMOVE_DAY_PLAN:
      return {
        ...state,
        plan: state.plan.map((day, index) => {
          if (parseInt(action.dayIndex) - 1 === index) {
            day.meals = day.meals.map((meal, index) => {
              if (parseInt(action.mealIndex) === index) {
                meal = null;
              }
              return meal;
            });
          }
          return day;
        }),
      };
    case RANDOM_DAY_PLAN:
      return {
        ...state,
        plan: state.plan.map((day, index) => {
          if (parseInt(action.dayIndex) - 1 === index) {
            day.meals = day.meals.map((meal, index) => {
              if (parseInt(action.mealIndex) === index) {
                meal = Math.floor(Math.random() * state.meals.length);
              }
              return meal;
            });
          }
          return day;
        }),
      };
    default:
      return state;
  }
}
