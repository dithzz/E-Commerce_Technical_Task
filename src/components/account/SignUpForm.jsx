import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useHistory } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/phone-fill.svg";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";
import { addUser } from "../../redux/actions/authActions";
import { SERVER_BASE_URL } from "../../config/config";

const SignUpForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { submitting, onSubmit, submitFailed } = props;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const authDetail = useSelector((state) => state?.userLogin);

  if (authDetail?.user?.tokens?.access?.token) {
    history.push("/");
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault(evt.target.value);
    const response = await axios
      .post(`${SERVER_BASE_URL}/v1/auth/register`, {
        name: firstName + " " + lastName,
        email,
        password,
      })
      .catch((err) => {
        console.log("Err", err);
      });

    console.log(response?.data);
    dispatch(addUser(response?.data));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`needs-validation mt-4 ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row mb-3">
        <div className="col-md-3">
          <label>First Name</label>
        </div>
        <div className="col-md-9">
          <input
            name="firstName"
            type="text"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            component={renderFormField}
            placeholder="First Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>{" "}
      <div className="row mb-3">
        {" "}
        <div className="col-md-3">
          <label>Last Name</label>
        </div>{" "}
        <div className="col-md-9">
          <input
            name="lastName"
            type="text"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            component={renderFormField}
            placeholder="Last Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>
      <div className="row mb-3">
        {" "}
        <div className="col-md-3">
          <label>Email ID</label>
        </div>{" "}
        <div className="col-md-9">
          <input
            name="email"
            type="email"
            label="Email ID"
            onChange={(e) => setEmail(e.target.value)}
            component={renderFormField}
            placeholder="Email ID"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>
      <div className="row mb-3">
        {" "}
        <div className="col-md-3">
          <label>Password</label>
        </div>{" "}
        <div className="col-md-9">
          <input
            name="password"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            component={renderFormField}
            placeholder="*******"
            validate={[required, name]}
            required={true}
            maxLength="20"
            minLength="8"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block mb-3"
        disabled={submitting}
      >
        Create
      </button>
      <Link className="float-left" to="/account/signin" title="Sign In">
        Sign In
      </Link>
      <div className="clearfix"></div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
