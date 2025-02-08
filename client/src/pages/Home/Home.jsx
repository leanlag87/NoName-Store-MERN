//Componente padre de la página de inicio, que contiene el slider principal y los productos destacados y en tendencia.
import React, { useEffect } from "react";
import "./Styles/Home.css";
import ProductCard from "./ProductCard";
import HeroSlider from "./HeroSlider";
import FeaturedSlider from "./FeatureSlider";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import { clearErrors, getProducts } from "../../store/reducers/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch(); // sirve para llamar a las acciones

  const { loading, error, products } = useSelector((state) => state.product); //despues de error sigue products

  useEffect(() => {
    dispatch(getProducts()); // llamamos a la acción
  }, [dispatch]); // dependencias

  useEffect(() => {
    if (error) {
      toast.error(error); // mostramos el error
      dispatch(clearErrors()); // limpiamos los errores
    }
  }, [dispatch, error]); // dependencias

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <>
            <MetaData title="NoName-Store" />
            <div className="Home_Page">
              <div className="heroSlider_Home">
                <HeroSlider />
              </div>

              <div className="feature" style={{ marginTop: "2.7rem" }}>
                <h2
                  style={{
                    textAlign: "center",
                    fontFamily: `"Archivo", sans-serif`,
                    fontWeight: "800",
                  }}
                >
                  Productos destacados
                </h2>
                {products && <FeaturedSlider products={products} />}
              </div>

              <h2 className="trending_heading">Productos en Tendencia</h2>

              <div className="trending-products">
                {products &&
                  products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default Home;
