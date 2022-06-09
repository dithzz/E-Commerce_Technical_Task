import React, { lazy, Component, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { SERVER_BASE_URL } from "../../config/config";

const StockManagement = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editProduct, setEditProduct] = useState("");
  const [description, setDescription] = useState("");
  const [newBook, setNewBook] = useState(false);
  const [editBook, setEditBook] = useState(false);

  const authTokens = useSelector((state) => state?.userLogin?.user?.tokens);

  const [data, setData] = useState([]);

  const products = useSelector(
    (state) => state?.allProducts?.products?.payload
  );

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

  useEffect(() => {
    Promise.all([getAllProducts()]).then((values) => {
      console.log(values);
    });
  }, [newBook, editBook]);

  const onAddBookClick = () => {
    setNewBook(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    axios
      .post(`${SERVER_BASE_URL}/v1/app/add-book`, {
        title,
        brand,
        price,
        stock,
        description,
      })
      .then((res) => setNewBook(false))
      .catch((err) => console.log(err));
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();

    await axios
      .patch(`${SERVER_BASE_URL}/v1/app/book/${id}`, {
        title,
        brand,
        price,
        stock,
        description,
      })
      .then((res) => {
        setEditBook(false);
      })
      .catch((err) => console.log(err));
  };

  const onEditClick = (id) => {
    setEditProduct(id);
    setEditBook(true);
  };

  return (
    <React.Fragment>
      <div className="p-5 bg-primary bs-cover">
        <div className="container text-center">
          <span className="display-5 px-3 bg-white rounded shadow">
            Stock Management
          </span>
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
            <div className="position-relative d-inline mr-3">
              <button
                onClick={onAddBookClick}
                disabled={newBook && true}
                className="btn btn-primary mb-4"
              >
                Add New Book
                <div className="position-absolute top-0 left-100 translate-middle badge bg-dark rounded-circle"></div>
              </button>
            </div>
            {editBook && (
              <form onSubmit={(e) => handleEditSubmit(e, editProduct)}>
                <div className="row ">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Title </label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="title"
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          required={true}
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Brand Name </label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="brand"
                          type="text"
                          onChange={(e) => setBrand(e.target.value)}
                          required={true}
                          maxLength="20"
                          minLength="8"
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Price</label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="price"
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          required={true}
                          maxLength="20"
                          minLength="8"
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Total Stock</label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="stock"
                          type="number"
                          label="Total Stock"
                          onChange={(e) => setStock(e.target.value)}
                          required={true}
                          maxLength="20"
                          minLength="8"
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Description</label>
                      </div>
                      <div className="col-md-9">
                        <textarea
                          name="description"
                          type="textarea"
                          onChange={(e) => setDescription(e.target.value)}
                          required={true}
                          className="mb-3"
                          rows="4"
                          cols="115"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                  >
                    Edit Book
                  </button>
                </div>
              </form>
            )}
            {newBook && (
              <form onSubmit={handleSubmit}>
                <div className="row ">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Title </label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="title"
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          required={true}
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Brand Name </label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="brand"
                          type="text"
                          onChange={(e) => setBrand(e.target.value)}
                          required={true}
                          maxLength="20"
                          minLength="8"
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Price</label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="price"
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          required={true}
                          maxLength="20"
                          minLength="8"
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Total Stock</label>
                      </div>
                      <div className="col-md-9">
                        <input
                          name="stock"
                          type="number"
                          label="Total Stock"
                          onChange={(e) => setStock(e.target.value)}
                          required={true}
                          maxLength="20"
                          minLength="8"
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <label>Description</label>
                      </div>
                      <div className="col-md-9">
                        <textarea
                          name="description"
                          type="textarea"
                          onChange={(e) => setDescription(e.target.value)}
                          required={true}
                          className="mb-3"
                          rows="4"
                          cols="115"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3"
                  >
                    Create Book
                  </button>
                </div>
              </form>
            )}
            <hr />
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Book Name</th>
                  <th scope="col">Book ID</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Stock Left</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((d, idx) => (
                  <tr>
                    <td>{d?.title}</td>
                    <td>{d?.id}</td>
                    <td>Rs. {d?.price}</td>
                    <td>{d?.brand}</td>
                    <td>{d?.stock}</td>
                    <td>
                      <div
                        onClick={() => onEditClick(d?.id)}
                        style={{ cursor: "pointer", color: "blue" }}
                      >
                        Edit
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StockManagement;
