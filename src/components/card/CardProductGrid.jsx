import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardProductGrid = (props) => {
  const product = props.data;
  return (
    <div className="card text-center shop_card">
      <div>
        <img
          height={250}
          style={{ width: "170px" }}
          src={
            product?.image ? product?.image : "../../images/placeholder.webp"
          }
          className="card-img-top"
          alt="..."
        />
      </div>
      {product.isNew && (
        <span className="badge bg-success position-absolute mt-2 ml-2">
          New
        </span>
      )}
      {product.isHot && (
        <span className="badge bg-danger position-absolute r-0 mt-2 mr-2">
          Hot
        </span>
      )}
      {(product.discountPercentage > 0 || product.discountPrice > 0) && (
        <span
          className={`rounded position-absolute p-2 bg-warning  ml-2 small ${
            product.isNew ? "mt-5" : "mt-2"
          }`}
        >
          -
          {product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "$" + product.discountPrice}
        </span>
      )}
      <div className="mt-4 ml-2 ">
        <div className="card-subtitle mb-2">
          <div className="p">
            <Link className="text-dark" to={`/book/${product?.id}`}>
              <b>{product?.title}</b>
            </Link>
          </div>
        </div>
        <p style={{ fontSize: "12px" }} className="card-subtitle mb-2">
          <Link to={product.link} className="text-decoration-none">
            {product?.author?.name ? product?.author?.name : "Unnamed Author"}
          </Link>
        </p>
        <div className="my-2">
          <span className="font-weight-bold h5">₹ {product.price}</span>
          {product.originPrice > 0 && (
            <del className="small text-muted ml-2">${product.originPrice}</del>
          )}
          <span className="ml-2">
            {Array.from({ length: product.review }, (_, key) => (
              <IconStarFill className="text-warning mr-1" key={key} />
            ))}
          </span>
        </div>
        <div className="btn-group btn-block" role="group">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
