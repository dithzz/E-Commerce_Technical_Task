import React, { Suspense, lazy } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import "./App.css";
import StockManagement from "./views/stock-management/StockManagement";
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));

function App() {
  return (
    <>
      {/* <div class="mul8">
        <div class="mul8circ1"></div>
        <div class="mul8circ2"></div>
      </div> */}
      <div className="container-xxl">
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Suspense
              fallback={
                <div className="text-white text-center mt-3">Lo ading...</div>
              }
            >
              <Switch>
                <Route exact path="/account/signin" component={SignInView} />
                <Route exact path="/account/signup" component={SignUpView} />

                <Route exact path="/shop" component={ProductListView} />
                <Route exact path="/book/:id" component={ProductDetailView} />
                <Route exact path="/cart" component={CartView} />
                <Route exact path="/checkout" component={CheckoutView} />
                <Route
                  exact
                  path="/stock-management"
                  component={StockManagement}
                />
                <Route exact path="/500" component={InternalServerErrorView} />
                <Route exact path="/">
                  <Redirect to="/shop" />
                </Route>
                <Route component={NotFoundView} />
              </Switch>
            </Suspense>
            <Footer />
          </React.Fragment>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
