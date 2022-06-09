import React, { lazy, Component, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { Link, useHistory, useParams } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { selectedProduct } from "../../redux/actions/productActions";
const Details = lazy(() => import("../../components/others/Details"));
const ProductDetailView = () => {
  const dispatch = useDispatch();

  let { id } = useParams();

  const [addedCart, setAddedCart] = useState(false);
  const [cartClick, setCartClick] = useState("Add to Cart");
  const [stock, setStock] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (cartItems?.items && cartItems?.items?.find((d) => d?.id === id)) {
      setCartClick("In Cart");
      setAddedCart(true);
    }
  }, [cartClick]);

  const cartItems = useSelector((state) => state?.getCart?.cart?.data?.payload);

  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);

  const singleProduct = useSelector(
    (state) => state?.singleProduct?.product?.payload
  );

  console.log(singleProduct);

  useEffect(() => {
    Promise.all([getSingleProduct()]).then((values) => {
      console.log(values);
    });
  }, []);

  const getSingleProduct = async () => {
    const response = await axios
      .get(`${SERVER_BASE_URL}/v1/app/book/${id}`)
      .catch((err) => {
        console.log("Err", err);
      });

    console.log(response?.data);
    dispatch(selectedProduct(response?.data));
  };

  const handleCartClick = () => {
    const config = {
      headers: { Authorization: `Bearer ${authTokens?.access?.token}` },
    };

    setCartClick("Added");
    setAddedCart(true);
    const response = axios
      .post(
        `${SERVER_BASE_URL}/v1/app/add-to-cart`,
        { item: id, stock },
        config
      )
      .catch((err) => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Err", err);
      });
    dispatch(addToCart(response?.data));
  };

  const handleMinusClick = () => {
    setStock(stock - 1);
    if (stock <= 1) {
      setStock(1);
    }
  };

  const handlePlusClick = () => {
    setStock(stock + 1);
  };

  console.log(id);

  return (
    <div className="container-fluid mt-5">
      {console.log("NIWDQNWDIOWQNDIOWQNDNWIQONDIWQ")}
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                height={350}
                style={{ width: "200px" }}
                src={
                  singleProduct?.image
                    ? singleProduct?.image
                    : "../../images/placeholder.webp"
                }
                className="img mb-3"
                alt=""
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline mr-2">{singleProduct?.title}</h1>
              <div className="mb-3"></div>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                <dd className="col-sm-9">
                  {singleProduct?.stock ? "In Stock" : "Out of Stock"}
                </dd>
                <dt className="col-sm-3">Title</dt>
                <dd className="col-sm-9">{singleProduct?.title}</dd>
                <dt className="col-sm-3">Brand</dt>
                <dd className="col-sm-9">{singleProduct?.brand}</dd>
              </dl>

              <div className="mb-3">
                <span className="font-weight-bold h5 mr-2">
                  ₹ {singleProduct?.price}
                </span>
                {/* <del className="small text-muted mr-2">$2000</del>
                  <span className="rounded p-1 bg-warning  mr-2 small">
                    -$100
                  </span> */}
              </div>
              <div className="mb-3">
                <div className="d-inline float-left mr-2">
                  {singleProduct?.stock ? (
                    <div className="input-group input-group-sm mw-140">
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={handleMinusClick}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="1"
                        value={stock}
                        onChange={(e) =>
                          setStock(e.target.value && parseInt(e.target.value))
                        }
                      />
                      <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={handlePlusClick}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary mr-2"
                  title="Add to cart"
                  onClick={handleCartClick}
                  disabled={!singleProduct?.stock || (addedCart && true)}
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                  {" " + cartClick}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active"
                    id="nav-details-tab"
                    data-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Description
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  <Details description={singleProduct?.description} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetailView;
