import React, { lazy, Component, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SERVER_BASE_URL } from "../../config/config";
import { getCart } from "../../redux/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartView = (props) => {
  const dispatch = useDispatch();
  const [stock, setStock] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [cartCount, setCartCount] = useState();
  const [cartItemClear, setCartItemClear] = useState(false);
  const [total, setTotal] = useState(0);

  const cart = useSelector((state) => state?.getCart?.cart);
  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);

  useEffect(() => {
    if (authTokens) {
      setCartItemClear(false);
      (async () => {
        dispatch(getCart(authTokens.access.token));
      })();
    } else {
      toast.error("Login/ Register to access cart!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [authTokens, cartItemClear]);

  useEffect(() => {
    console.log(cart);
    if (cart) {
      let cartTotal = 0;
      setCartCount(
        cart?.items?.reduce((acc, curr) => {
          console.log(curr);
          if (Object.keys(acc).includes(curr.id)) {
            acc[curr.id].count += 1;
            acc[curr.id].price += curr.price;
          } else {
            console.log(curr.price);
            acc[curr.id] = { count: 1, price: curr.price, item: curr };
          }
          cartTotal += curr.price;
          return acc;
        }, {})
      );
      setTotal(cartTotal);
    }
  }, [cart]);
  console.log(cartCount);

  const handleMinusClick = (id, item) => {
    const count = {
      ...cartCount,
      [id]: {
        count: cartCount[id].count - 1,
        price: cartCount[id].price - item.price,
        item,
      },
    };
    setCartCount(count);
    setTotal(total - item.price);
  };

  const handlePlusClick = (id, item) => {
    const count = {
      ...cartCount,
      [id]: {
        count: cartCount[id].count + 1,
        price: cartCount[id].price + item.price,
        item,
      },
    };
    setCartCount(count);
    setTotal(total + item.price);
  };

  const handleRemoveItem = (id) => {
    axios
      .post(
        `${SERVER_BASE_URL}/v1/app/remove-from-cart`,
        { item: id },
        {
          headers: { Authorization: `Bearer ${authTokens?.access?.token}` },
        }
      )
      .then((res) => {
        setCartItemClear(true);
      });
    // const count = {
    //   ...cartCount,
    // };
    // delete count[id];
    // setCartCount(count);
  };

  const onMakePurchase = (item) => {
    const data = Object.keys(item).map((d) => {
      return { item: d, count: item[d].count };
    });
    console.log(data);
    axios
      .post(
        `${SERVER_BASE_URL}/v1/app/checkout-cart`,
        {
          items: data,
          totalAmount: total.toFixed(2),
          books: Object.keys(item),
        },
        {
          headers: { Authorization: `Bearer ${authTokens?.access?.token}` },
        }
      )
      .then((res) => {
        toast.success("Purchase Made!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .err((err) => {
        toast.error("Purchase Not Successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <React.Fragment>
      <div className="shopping_cart_breadcrumb bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-right" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartCount &&
                      Object.keys(cartCount)?.map((d, i) => (
                        <tr key={i}>
                          {console.log(i)}
                          <td>
                            <div className="row">
                              <div className="col-3 d-none d-md-block">
                                <img
                                  // width={150}
                                  height={90}
                                  src={
                                    cartCount[d]?.item?.image
                                      ? cartCount[d]?.item?.image
                                      : "../../images/placeholder.webp"
                                  }
                                  width="80"
                                  alt="..."
                                />
                              </div>
                              <div className="col">
                                <Link
                                  to={`/book/${cartCount[d]?.item?.id}`}
                                  className="text-decoration-none"
                                >
                                  {cartCount[d]?.item?.title}
                                </Link>
                                <p className="small text-muted">
                                  {/* Size: XL, Color: blue, Brand: XYZ */}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="input-group input-group-sm mw-140">
                              <button
                                className="btn btn-primary text-white"
                                type="button"
                                onClick={() =>
                                  handleMinusClick(d, cartCount[d].item)
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="1"
                                value={cartCount?.[d]?.count}
                              />
                              <button
                                className="btn btn-primary text-white"
                                type="button"
                                onClick={() =>
                                  handlePlusClick(d, cartCount[d].item)
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <var className="price">
                              ??? {cartCount?.[d]?.price?.toFixed(2)}
                            </var>
                            <small className="d-block text-muted">
                              {/* ??? {d?.price} each */}
                            </small>
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleRemoveItem(cartCount[d]?.item?.id)
                              }
                            >
                              <IconTrash className="i-va" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => onMakePurchase(cartCount)}
                  className="btn btn-primary float-right"
                >
                  Make Purchase <IconChevronRight className="i-va" />
                </button>
                <Link to="/" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom"></dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-right  h5">
                    <strong>??? {total.toFixed(2)}</strong>
                  </dd>
                </dl>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </React.Fragment>
  );
};

export default CartView;
