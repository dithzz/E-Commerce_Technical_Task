import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { authorReducer } from "./authorReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { categoriesReducer } from "./categoriesReducer";
import { wishlistReducer } from "./wishlistReducer";

const reducers = combineReducers({
  newArrivals: productReducer,
  trendingProducts: productReducer,
  bestSellers: productReducer,
  allProducts: productReducer,
  singleProduct: productReducer,
  addWishlist: wishlistReducer,
  allWishlist: wishlistReducer,
  allCategories: categoriesReducer,
  singleCategory: categoriesReducer,
  singleAuthor: authorReducer,
  allAuthors: authorReducer,
  userLogin: authReducer,
  logoutUser: authReducer,
  addUser: authReducer,
  forgotPassword: authReducer,
  addToCart: cartReducer,
  getCart: cartReducer,
});

export default reducers;
