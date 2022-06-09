import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useHistory } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/phone-fill.svg";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";
import { setUser } from "../../redux/actions/authActions";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = (props) => {
  const history = useHistory();
  const { submitFailed } = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const authDetail = useSelector((state) => state?.userLogin);
  const dispatch = useDispatch();

  if (authDetail?.user?.tokens?.access?.token) {
    history.push("/");
  }

  console.log("authDetail", authDetail);

  const handleSubmit = async (evt) => {
    evt.preventDefault(evt.target.value);
    const response = await axios
      .post(`${SERVER_BASE_URL}/v1/auth/login`, { email, password })
      .catch((err) => {
        toast.error("Incorrect Email or Password!", {
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

    console.log(response?.data);
    dispatch(setUser(response?.data));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`needs-validation mt-4 ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row ">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <label>Email </label>
            </div>
            <div className="col-md-9">
              <input
                name="email"
                type="email"
                label="Email ID"
                onChange={(e) => setEmail(e.target.value)}
                component={renderFormGroupField}
                placeholder="Email ID"
                icon={IconPhoneFill}
                validate={[
                  required,
                  maxLengthMobileNo,
                  minLengthMobileNo,
                  digit,
                ]}
                required={true}
                className="mb-3"
              />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <label>Password </label>
            </div>
            <div className="col-md-9">
              <input
                name="password"
                type="password"
                label="Your password"
                onChange={(e) => setPassword(e.target.value)}
                component={renderFormGroupField}
                placeholder="******"
                icon={IconShieldLockFill}
                validate={[required, maxLength20, minLength8]}
                required={true}
                maxLength="20"
                minLength="8"
                className="mb-3"
              />
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

      <button type="submit" className="btn btn-primary btn-block mb-3">
        Log In
      </button>
      <Link className="float-left" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <div className="clearfix"></div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
