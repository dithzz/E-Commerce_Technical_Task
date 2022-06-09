import React, { lazy, Component, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setNewArrivals,
  setTrendingNow,
  setBestSellers,
} from "../redux/actions/productActions";
// import { link45, file, check2all } from "../npm/icon";
import { connect } from "react-redux";
import { data } from "../data";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import { Button } from "bootstrap/dist/js/bootstrap.bundle";
import FeaturedCard from "../components/featuredCard/FeaturedCard";
import ProductCard from "../components/product/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { SERVER_BASE_URL } from "../config/config";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);

const HomeView = () => {
  const dispatch = useDispatch();
  let components = {
    IconLaptop: IconLaptop,
    IconHeadset: IconHeadset,
    IconPhone: IconPhone,
    IconTv: IconTv,
    IconDisplay: IconDisplay,
    IconHdd: IconHdd,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };

  const newProducts = useSelector(
    (state) => state?.newArrivals?.newArrivals?.payload
  );

  const trendingProducts = useSelector(
    (state) => state?.trendingProducts?.trendingNow?.payload
  );

  const bestSellers = useSelector(
    (state) => state?.bestSellers?.bestSellers?.payload
  );

  console.log(trendingProducts);

  const fetchNewArrivals = async () => {
    const response = await axios
      .get(`${SERVER_BASE_URL}/v1/app/latest-books`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setNewArrivals(response?.data));
  };

  const fetchTrendingProducts = async () => {
    const response = await axios
      .get(`${SERVER_BASE_URL}/v1/app/trending`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setTrendingNow(response?.data));
  };

  const fetchBestSellers = async () => {
    const response = await axios
      .get(`${SERVER_BASE_URL}/v1/app/best-sellers`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setBestSellers(response?.data));
  };

  useEffect(() => {
    Promise.all([
      fetchBestSellers(),
      fetchNewArrivals(),
      fetchTrendingProducts(),
    ]).then((values) => {
      console.log(values);
    });
  }, []);

  // useEffect(() => {
  //   Promise.all([
  //     fetchBestSellers(),
  //     fetchNewArrivals(),
  //     fetchTrendingProducts(),
  //   ]).then((values) => {
  //     console.log(values);
  //   });
  // }, []);

  // useEffect(() => fetchBestSellers(), []);

  // useEffect(() => fetchNewArrivals(), []);

  // useEffect(() => fetchTrendingProducts(), []);

  console.log("PRODUCTS: ", newProducts);

  const iconProducts = data.iconProducts;
  const rows = [...Array(Math.ceil(iconProducts.length / 4))];
  // chunk the products into the array of rows
  const productRows = rows.map((row, idx) =>
    iconProducts.slice(idx * 4, idx * 4 + 4)
  );
  // map the rows as div.row
  const carouselContent = productRows.map((row, idx) => (
    <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
      <div className="row g-3">
        {row.map((product, idx) => {
          const ProductImage = components[product.img];
          return (
            <div key={idx} className="col-md-3">
              <CardIcon
                title={product.title}
                text={product.text}
                tips={product.tips}
                to={product.to}
              >
                <ProductImage className={product.cssClass} />
              </CardIcon>
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      {/* <div class="banner">
          <div class="row banner_inner ">
            <div class="col-md-6 text-center">
              <img class="banner_book_img" src="../../images/book.png"></img>
            </div>
            <div class="col-md-6">
              <div class="h1 text-center text-white banner_text">
                என் ார்வையில் <br></br> இந்திய அரசியல
              </div>

              <div className="text-center">
                <button className="buy_now">BUY NOW</button>
              </div>
            </div>
          </div>
        </div> */}
      <Banner className="" id="carouselHomeBanner" data={data.banner} />

      <div className="container-fluid featured_section text-center">
        <div className="pt-5 pb-5 h3 animate__animated animate__backInLeft">
          <FontAwesomeIcon icon={faStar} className="text-light star_icon" />
          &nbsp; <b>NEW ARRIVALS</b>
          &nbsp;
          <FontAwesomeIcon icon={faStar} className="text-light star_icon" />
        </div>

        <div className="row featured_row">
          {newProducts &&
            newProducts?.results?.map((d) => (
              <FeaturedCard
                productId={d.id}
                image={d.image}
                title={d.title}
                author={d.author}
                price={d.price}
              />
            ))}
        </div>
      </div>

      {/* CATALOGUE SECTION*/}

      <div className="container-fluid bg-light ">
        <div className="row g-3 catalogue">
          <div className=" catalogue_right col-md-6 text-center pt-5 pb-5">
            <div className="row text-center">
              <div className="col-md-2"></div>
              <div className="col-md-2 mb-4">
                <img width={"80px"} src="../../images/icons/youtube.png"></img>
              </div>
              <div className="col-md-6 h3 mt-2 catalogue_text ">
                {" "}
                <b>கா=ணொளி</b>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div className="catalogue_left col-md-6 text-center pt-5 pb-5">
            <div className="row ">
              <div className="col-md-2"></div>
              <div className="col-md-2 mb-4">
                <img width={"80px"} src="../../images/icons/download.png"></img>
              </div>
              <div className="col-md-6 h3 mt-2 ">
                {" "}
                <b>
                  CLICK TO DOWNLOAD<br></br> OUR NEW CATALOGUE
                </b>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid text-center latest_section">
        <div className="pt-5 pb-3 h3 animate__animated animate__backInRight">
          <FontAwesomeIcon icon={faStar} className="text-light star_icon" />
          &nbsp; <b>TRENDING NOW</b>
          &nbsp;
          <FontAwesomeIcon icon={faStar} className="text-light star_icon" />
        </div>
        {/* <div className="latest_dropdown_section row">
            <div className="col-md-5"></div>
            <div className="col-md-4"></div>
            <div className="col-md-3">
              {" "}
              <select
                class="form-select categories_dropdown"
                aria-label="Default select example"
              >
                <option selected>CATEGORIES</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div> */}

        <div className="row featured_row">
          {" "}
          <div className="row latest_section_book_row pt-5 pb-5">
            {trendingProducts &&
              trendingProducts?.results?.map((d) => (
                <ProductCard
                  productId={d.id}
                  image={d.image}
                  title={d.title}
                  author={d.author}
                  price={d.price}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="container-fluid best_sellers text-center">
        <div className="pt-5 pb-5 h3 animate__animated animate__backInLeft">
          <FontAwesomeIcon icon={faStar} className="text-light star_icon" />
          &nbsp; <b>BEST SELLERS</b>
          &nbsp;
          <FontAwesomeIcon icon={faStar} className="text-light star_icon" />
        </div>

        <div className="row featured_row">
          {bestSellers &&
            bestSellers?.results?.map((d) => (
              <FeaturedCard
                productId={d.id}
                image={d.image}
                title={d.title}
                author={d.author}
                price={d.price}
              />
            ))}
        </div>
      </div>

      {/* <div className="container-fluid bg-light mb-3">
          <div className="row g-3">
            <div className="col-md-9">
              <Carousel id="elect-product-category" className="mb-3">
                {carouselContent}
              </Carousel>
              <Support />
            </div>
            <div className="col-md-3">
              <CardLogin className="mb-3" />
              <CardImage src="../../images/banner/Watches.webp" to="promo" />
            </div>
          </div>
        </div> */}
      {/* <div className="container-fluid bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <CardDealsOfTheDay
                endDate={Date.now() + 1000 * 60 * 60 * 14}
                title="Deals of the Day"
                to="/"
              >
                <Carousel id="elect-product-category1">
                  {carouselContent}
                </Carousel>
              </CardDealsOfTheDay>
            </div>
          </div>
        </div> */}

      {/* <div className="bg-info bg-gradient p-3 text-center mb-3">
          <h4 className="m-0">Explore Fashion Collection</h4>
        </div> */}
      {/* <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/male.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Men's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/female.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Women's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/smartwatch.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Smartwatch</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/footwear.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Footwear</div>
              </Link>
            </div>
          </div>
        </div> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps)(HomeView);
