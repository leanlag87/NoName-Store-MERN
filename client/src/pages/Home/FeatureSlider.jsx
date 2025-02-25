import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Styles/FeatureSlider.css";
import { Link } from "react-router-dom";
import {
  displayMoney,
  generateDiscountedPrice,
} from "../../utils/DisplayMoney";

const FeaturedSlider = ({ products = [] }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No hay productos destacados disponibles</div>;
  }

  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
      loop={products.length >= 6}
      speed={500}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      effect={"coverflow"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 10,
        depth: 50,
        modifier: 3,
        slideShadows: false,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        576: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 200,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
      className="featured_swiper"
    >
      {products.map((product) => {
        if (!product || !product.images || !product.images[0]) {
          return null;
        }

        const { _id, images, name, price } = product;
        const imageUrl = images[0]?.url || "/placeholder-image.jpg";
        let newPrice = generateDiscountedPrice(price);
        newPrice = displayMoney(newPrice);
        const oldPrice = displayMoney(price);

        return (
          <SwiperSlide key={_id} className="featured_slides">
            <Link
              to={`/product/${_id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="featured_title">{name}</div>
              <figure className="featured_img">
                <img src={imageUrl} alt={name || "Producto"} />
              </figure>
              <h2 className="products_price">
                <span className="final_price">{newPrice}</span> &nbsp;
                <small>
                  <del className="old_price">{oldPrice}</del>
                </small>
              </h2>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FeaturedSlider;
