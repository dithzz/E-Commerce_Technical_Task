import React, { lazy, Component, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import {
  getCategories,
  getCategory,
} from "../../redux/actions/categoriesActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import { SERVER_BASE_URL } from "../../config/config";
import FeaturedCard from "../../components/featuredCard/FeaturedCard";

const ProductListView = () => {
  const dispatch = useDispatch();
  const [addedCart, setAddedCart] = useState(false);
  const [cartClick, setCartClick] = useState("Add to Cart");
  const [cart, setCart] = useState("Add to Cart");

  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);

  console.log("CARTTT", cart);

  const cartItems = useSelector((state) => state?.getCart?.cart);

  const [view, setView] = useState("grid");
  const [data, setData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  const products = useSelector(
    (state) => state?.allProducts?.products?.payload
  );

  const allCategories = useSelector(
    (state) => state?.allCategories?.categories?.payload
  );

  const singleCategory = useSelector(
    (state) => state?.allCategories?.category?.payload?.books
  );

  console.log("single", singleCategory);

  console.log(products);

  const getAllProducts = async () => {
    const response = await axios
      .get(`${SERVER_BASE_URL}/v1/app/shirts`)
      .catch((err) => {
        console.log("Err", err);
      });

    console.log(response?.data);
    dispatch(getProducts(response?.data));
    setData(response?.data?.payload?.results);
  };

  console.log("BEFORE", data);

  console.log(allCategories);

  useEffect(() => {
    Promise.all([getAllProducts()]).then((values) => {
      console.log(values);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="p-5 bg-primary bs-cover">
        <div className="container text-center">
          <span className="display-5 px-3 bg-white rounded shadow">Store</span>
        </div>
      </div>
      <div className="container-fluid mt-3 mb-3">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <span className="align-middle font-weight-bold">
                  <span className="text-warning"></span>
                </span>
              </div>
            </div>
            <hr />
            <div className="row featured_row">
              {view === "grid" &&
                data?.map((d, idx) => (
                  <FeaturedCard
                    key={idx}
                    productId={d.id}
                    image={d.image}
                    title={d.title}
                    author={d.author}
                    price={d.price}
                    brand={d.brand}
                    stock={d.stock}
                    type={"products"}
                  />
                ))}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductListView;
