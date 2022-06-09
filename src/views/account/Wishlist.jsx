import React, { Component, lazy, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { data } from "../../data";
import { getWishList } from "../../redux/actions/wishlistActions";
const CardProductList2 = lazy(() =>
  import("../../components/card/CardProductList2")
);

const WishlistView = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state?.allWishlist?.wishlistItems?.payload
  );

  console.log(wishlistItems);
  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);

  useEffect(() => {
    Promise.all([
      (async () => {
        dispatch(getWishList(authTokens?.access?.token));
      })(),
    ]).then((values) => {
      console.log(values);
    });
  }, []);

  // const getAllWishlistItems = async () => {
  //   const response = await axios
  //     .get(`${SERVER_BASE_URL}/v1/app/book/${id}`)
  //     .catch((err) => {
  //       console.log("Err", err);
  //     });

  //   console.log(response?.data);
  //   dispatch(selectedProduct(response?.data));
  // };

  console.log(wishlistItems);

  return (
    <div className="container mb-3">
      <div
        className="p-5 bg-primary bs-cover mb-5"
        style={
          {
            // backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }
        }
      >
        <div className="container text-center">
          <span className="display-5 px-3 bg-white rounded shadow">
            Wishlist
          </span>
        </div>
      </div>
      <div className="row g-3 mb-5">
        {wishlistItems?.map((items, idx) => {
          return (
            <div key={idx} className="col-md-6">
              <CardProductList2 data={items} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistView;
