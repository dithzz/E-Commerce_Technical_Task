import React, { lazy, Component, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../redux/actions/authActions";
import { SERVER_BASE_URL } from "../config/config";
import { getCart } from "../redux/actions/cartActions";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);
  const profile = useSelector((state) => state?.userLogin?.user?.user);
  const cartItems = useSelector((state) => state?.getCart?.cart);
  const accessToken = authTokens?.access?.token;
  const refreshToken = authTokens?.refresh?.token;
  console.log("ddddddddddddddddddddddddddddddddddddd", cartItems);
  console.log(authTokens);
  console.log(profile);

  useEffect(() => {
    if (authTokens) {
      (async () => {
        dispatch(getCart(authTokens.access.token));
      })();
    }
  }, [authTokens]);

  const logout = async (evt) => {
    evt.preventDefault(evt.target.value);
    const response = await axios
      .post(`${SERVER_BASE_URL}/v1/auth/logout`, { refreshToken })
      .catch((err) => {
        console.log("Err", err);
      });

    console.log(response);
    dispatch(logoutUser(response));
    history.push("/account/signin");
  };

  return (
    <React.Fragment>
      <header className="p-3 border-bottom">
        <div className="container-fluid">
          <div className="row g-3">
            <h1 className="col-md-3 text-left">
              <Link to="/">E-COMMERCE </Link>
            </h1>

            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="position-relative d-inline mr-3">
                <Link to="/shop" className="btn btn-primary">
                  STORE
                </Link>
              </div>
              {profile?.role === "admin" && (
                <div className="position-relative d-inline mr-3">
                  <Link to="/stock-management" className="btn btn-primary">
                    Stock Management
                    <div className="position-absolute top-0 left-100 translate-middle badge bg-dark rounded-circle"></div>
                  </Link>
                </div>
              )}

              <div className="position-relative d-inline mr-3">
                <Link to="/cart" className="btn btn-primary">
                  <IconCart3 className="i-va" />
                  <div className="position-absolute top-0 left-100 translate-middle badge bg-dark rounded-circle">
                    {cartItems?.items?.length}
                  </div>
                </Link>
              </div>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-primary  border mr-3 dropdown-toggle1"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                >
                  <FontAwesomeIcon icon={faUser} className="text-light" />
                  {"  "}
                  {authTokens && authTokens?.refresh?.token
                    ? profile?.name
                    : "Log In/ Register"}
                </button>
                <ul className="dropdown-menu">
                  {authTokens && authTokens?.refresh?.token ? (
                    <>
                      <li>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={logout}
                          className="dropdown-item"
                        >
                          <IconDoorClosedFill className="text-danger" /> Logout
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/account/signin">
                          <IconPersonBadgeFill /> Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/account/signup">
                          <IconPersonBadgeFill /> Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link> */}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
export default Header;
