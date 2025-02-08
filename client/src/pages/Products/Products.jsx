import React, { useEffect, useState } from "react";
import "./Styles/products.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../store/reducers/productSlice";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InventoryIcon from "@mui/icons-material/Inventory";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { categories } from "../utils/categories";

function Products() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    productsCount,
    error,
    resultPerPage,
    // filterdProductCount,
  } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]); // initial limit from min=0 to max=100000
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, keyword, currentPage, price, ratings, category]);

  const setCurrentPageNoHandler = (e) => {
    setCurrentPage(e); // e es el valor de la página en la que se hizo clic
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleCategoryChange = (category) => {
    setCategory(category);
    setSelectedCategory(category);
    // Realiza cualquier acción adicional o filtrado según la categoría seleccionada
  };

  const [selectedRating, setSelectedRating] = useState("all");

  const handleRatingChange = (event) => {
    setRatings(event.target.value);
    setSelectedRating(event.target.value);
    //Activar filtrado con el valor de calificación seleccionado o realizar cualquier otra acción
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS --Ecart" />
          {products === undefined || products.length === 0 ? (
            <>
              <div
                className="emptyCartContainer "
                style={{ marginTop: "5rem", background: "white" }}
              >
                <InventoryIcon className="cartIcon" />

                <Typography variant="h5" component="h1" className="cartHeading">
                  Producto no encontrado
                </Typography>
                <Typography variant="body" className="cartText">
                  No hay nada que ver aquí.
                </Typography>
                <Typography variant="body" className="cartText">
                  No existe ningún producto con este nombre
                </Typography>

                <Button
                  className="shopNowButton"
                  onClick={() => window.location.reload()}
                  style={{ width: "7rem" }}
                >
                  Refrescar
                </Button>
              </div>
            </>
          ) : (
            <div className="productPage">
              <div className="prodcutPageTop">
                <div className="filterBox">
                  {/* Price */}
                  <div className="priceFilter">
                    <Typography
                      style={{
                        fontSize: "18px",
                        padding: "5px",
                        fontWeight: 700,
                        color: "#414141",
                      }}
                    >
                      Precio
                    </Typography>
                    <div className="priceSlider">
                      <Slider
                        value={price}
                        onChange={priceHandler}
                        min={0}
                        max={100000}
                        step={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                      />
                    </div>
                    <div className="priceSelectors">
                      <div className="priceSelector">
                        <Select
                          value={price[0]}
                          onChange={(e) =>
                            setPrice([+e.target.value, price[1]])
                          }
                          className="priceOption"
                          IconComponent={ArrowDropDownIcon}
                          renderValue={(selected) =>
                            selected !== "" ? selected : "min"
                          } // Display "min" as default label
                        >
                          <MenuItem value={5000} className="menu_item">
                            5000
                          </MenuItem>
                          <MenuItem value={10000} className="menu_item">
                            10000
                          </MenuItem>
                          {/* Add more options as per your requirement */}
                        </Select>
                        <span className="toText">a</span>
                        <Select
                          value={price[1]}
                          onChange={(e) =>
                            setPrice([price[0], +e.target.value])
                          }
                          className="priceOption"
                          IconComponent={ArrowDropDownIcon}
                          renderValue={(selected) =>
                            selected !== "" ? selected : "max"
                          }
                        >
                          <MenuItem value={50000} className="menu_item">
                            50000
                          </MenuItem>
                          <MenuItem value={20000} className="menu_item">
                            20000
                          </MenuItem>
                          {/* Add more options as per your requirement */}
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="filter_divider"></div>

                  {/* Categories */}
                  <div className="categoriesFilter">
                    <Typography
                      style={{
                        fontSize: "18px",
                        padding: "10px",
                        fontWeight: 700,
                        color: "#414141",
                      }}
                    >
                      Categorias
                    </Typography>
                    <ul className="categoryBox">
                      {categories.map((category, index) => (
                        <li className="category-link" key={index}>
                          <label
                            htmlFor={`category-${index}`}
                            className="category-label"
                          >
                            <input
                              type="checkbox"
                              id={`category-${index}`}
                              className="category-checkbox"
                              value={category}
                              checked={category === selectedCategory}
                              onChange={() => handleCategoryChange(category)}
                            />
                            {category}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="filter_divider"></div>
                  {/* Ratings */}
                  <div className="ratingsFilter">
                    <Typography
                      style={{
                        fontSize: "18px",
                        padding: "10px",
                        fontWeight: 700,
                        color: "#414141",
                      }}
                    >
                      Calificaciones anteriores
                    </Typography>
                    <RadioGroup
                      value={selectedRating}
                      onChange={handleRatingChange}
                      row
                      className="ratingsBox"
                    >
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4★ & arriba"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3★ & arriba"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2★ & arriba"
                      />
                    </RadioGroup>
                  </div>
                  <div className="filter_divider"></div>
                  {/* Clear Filters */}
                </div>

                <div className={products.length < 2 ? "products1" : "products"}>
                  {products &&
                    products?.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              </div>

              {/* Pagination */}

              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNoHandler}
                  nextPageText="Sig."
                  prevPageText="Ant."
                  firstPageText="Princ."
                  lastPageText="Fin."
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Products;
