import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const [addedCart, setAddedCart] = useState(false);
  const [cartClick, setCartClick] = useState("Add to Cart");

  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);
  const cart = useSelector((state) => state);

  console.log("CARTTT", cart);

  console.log(props?.id);

  useEffect(() => {
    if (
      cartItems?.items &&
      cartItems?.items?.find((d) => d?.id === props?.productId)
    ) {
      setCartClick("In Cart");
      setAddedCart(true);
    }
  }, [cartClick]);

  const cartItems = useSelector((state) => state?.getCart?.cart?.data?.payload);

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

  return (
    <div className="latest_section_book_col col-md-3 pt-3 pb-5">
      <div className="text-center">
        <img
          width={150}
          height={220}
          src={props?.image ? props?.image : "../../images/placeholder.webp"}
        ></img>
      </div>
      <div className="text-center mt-3">
        <div className="p">
          <Link className="text-dark" to={`/book/${props?.productId}`}>
            <b>{props?.title}</b>
          </Link>
        </div>
        <div className="p pb-3">
          <Link className="text-danger" to={`/author/${props?.author?.id}`}>
            {props?.author?.name}
          </Link>
        </div>
        <div className="h4 price">₹ {props?.price}</div>
        <button
          disabled={addedCart && true}
          onClick={handleCartClick}
          className="product_add_to_cart"
        >
          {cartClick}
        </button>
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

export default ProductCard;
