import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as HeroSliderStyles from "./Styles/HeroSliderStyles";

// Datos de ejemplo para los slides
const slides = [
  {
    quote: "Descubre nuestra nueva colección",
    saleText: "Hasta 50% de descuento",
    productText: "Ver Productos",
    image: require("../../assets/heroSlider/ejemplo3.jpg"),
  },
  {
    quote: "Calidad y estilo",
    saleText: "Nuevos productos",
    productText: "Comprar Ahora",
    image: require("../../assets/heroSlider/ejemplo4.jpg"),
  },
  {
    quote: "¡No te pierdas nuestras ofertas!",
    saleText: "Hasta 40% de descuento",
    productText: "Ver Ofertas",
    image: require("../../assets/heroSlider/ejemplo10.jpg"),
  },
  {
    quote: "¡Descubre nuestra nueva colección!",
    saleText: "Hasta 30% de descuento",
    productText: "Ver Productos",
    image: require("../../assets/heroSlider/ejemplo6.jpg"),
  },
];

const HeroSlider = () => {
  return (
    <>
      <HeroSliderStyles.StyledCarousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        showArrows={true}
        showIndicators={true}
      >
        {slides.map((slide, index) => (
          <div key={index}>
            {slide.image && (
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <HeroSliderStyles.SlideContent>
              <HeroSliderStyles.Quote>{slide.quote}</HeroSliderStyles.Quote>
              <HeroSliderStyles.SaleText>
                {slide.saleText}
              </HeroSliderStyles.SaleText>
              <HeroSliderStyles.StyledLink to="/products">
                <HeroSliderStyles.ProductButton>
                  {slide.productText}
                </HeroSliderStyles.ProductButton>
              </HeroSliderStyles.StyledLink>
            </HeroSliderStyles.SlideContent>
          </div>
        ))}
      </HeroSliderStyles.StyledCarousel>
    </>
  );
};

export default HeroSlider;
