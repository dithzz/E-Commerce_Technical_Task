import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "animate.css";
import { addToCart } from "../../redux/actions/cartActions";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeaturedCard = (props) => {
  const dispatch = useDispatch();
  const [addedCart, setAddedCart] = useState(false);
  const [cartClick, setCartClick] = useState("Add to Cart");
  const [cart, setCart] = useState("Add to Cart");
  const [inCart, setinCart] = useState("Add to Cart");

  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);

  const cartItems = useSelector((state) => state?.getCart?.cart);

  const handleCartClick = () => {
    const config = {
      headers: { Authorization: `Bearer ${authTokens?.access?.token}` },
    };

    setCartClick("Added");
    setAddedCart(true);
    const response = axios
      .post(
        `${SERVER_BASE_URL}/v1/app/add-to-cart`,
        { item: props?.productId },
        config
      )
      .then((res) => {
        setinCart(res.data);
      })
      .catch((err) => {
        toast.error("Signup/Login to Add to Cart!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCartClick("Add to Cart");
        setAddedCart(false);
        console.log("Err", err);
      });
    setCart(response.data);
    dispatch(addToCart(response.data));
  };

  useEffect(() => {
    if (
      cartItems?.items &&
      cartItems?.items?.find((d) => d?.id === props?.productId)
    ) {
      setCartClick("In Cart");
      setAddedCart(true);
    }
  }, [cart, inCart]);

  return (
    <div className="col-md-4 animate__animated animate__zoomInUp">
      <div className="row featured_card">
        <div className="row">
          <div className="col-md-4">
            <img
              width={150}
              height={220}
              src={
                props?.image ? props?.image : "../../images/placeholder.webp"
              }
            ></img>
          </div>
          <div className="col-md-8 text-left featured_book_detail pt-2">
            <div className="pl-5 pb-4">
              <div className="p">
                <Link className="text-dark" to={`/book/${props?.productId}`}>
                  <b>{props?.title}</b>
                </Link>
              </div>
              <div style={{ fontSize: "14px" }} className="p">
                {props?.brand ? props?.brand : "Unnamed Brand"}
              </div>
              <div style={{ color: "red", fontSize: "13px" }} className="p">
                {props?.stock ? props?.stock + " Stocks Left" : "0 Stocks Left"}
              </div>
            </div>
            <div className="pl-5 pt-1">
              <div className="h4 price">₹ {props?.price}</div>
              <button
                onClick={handleCartClick}
                className="add_to_cart"
                disabled={!props?.stock || (addedCart && true)}
              >
                {cartClick}
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
