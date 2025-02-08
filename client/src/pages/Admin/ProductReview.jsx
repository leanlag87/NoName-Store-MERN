import React, { useEffect, useState } from "react";
import "./Styles/productList.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductReviews,
  clearErrors,
  deleteReview,
  resetDeleteReview,
} from "../../store/reducers/productSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import { Typography, InputAdornment } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import * as ProductReviewsStyles from "./Styles/ProductReviewsStyles";
import { getProductReviewColumns } from "../utils/productReviewColums"; // Importamos la función que genera la configuración de columnas para el DataGrid

function ProductReviews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const [productId, setProductId] = useState("");

  // togle handler =>
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getProductReviews(productId)); // when in input box string lenght goes ===24 then automatically search occures
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Revisión eliminada exitosamente");
      navigate("/admin/reviews");
      dispatch(resetDeleteReview());
    }
  }, [dispatch, error, deleteError, isDeleted, productId, navigate]);

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  // Handler para eliminar la reseña
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId)); // get this product reviews
  };

  // Calculamos las columnas usando la función importada y pasando el handler
  const columns = getProductReviewColumns(deleteReviewHandler);
  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.ratings,
        recommend: item.recommend ? "Yes" : "No",
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Reviews" />
          <ProductReviewsStyles.UpdateUserContainer>
            <ProductReviewsStyles.FirstBox
              className={!toggle ? "" : "toggle-box"}
            >
              <Sidebar />
            </ProductReviewsStyles.FirstBox>

            <ProductReviewsStyles.SecondBox>
              <ProductReviewsStyles.NavBarContainer>
                <Navbar toggleHandler={toggleHandler} />
              </ProductReviewsStyles.NavBarContainer>
              <ProductReviewsStyles.FormSection>
                <ProductReviewsStyles.Form
                  onSubmit={productReviewsSubmitHandler}
                >
                  <ProductReviewsStyles.StyledAvatar>
                    <ProductReviewsStyles.StyledStarRateIcon />
                  </ProductReviewsStyles.StyledAvatar>
                  <ProductReviewsStyles.Heading variant="h5" component="h1">
                    Todas las reseñas
                  </ProductReviewsStyles.Heading>
                  <ProductReviewsStyles.NameInput>
                    <ProductReviewsStyles.StyledTextField
                      variant="outlined"
                      fullWidth
                      label="Product Id"
                      required
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ProductReviewsStyles.StyledStarIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ProductReviewsStyles.NameInput>

                  <ProductReviewsStyles.LoginButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || productId === ""}
                  >
                    Buscar
                  </ProductReviewsStyles.LoginButton>
                </ProductReviewsStyles.Form>

                {reviews && reviews.length > 0 ? (
                  <ProductReviewsStyles.ProductListContainer>
                    <Typography variant="h4" id="productListHeading">
                      TODOS LOS PRODUCTOS
                    </Typography>
                    <ProductReviewsStyles.ProductListTable
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      autoHeight
                      disableSelectionOnClick
                    />
                  </ProductReviewsStyles.ProductListContainer>
                ) : (
                  <ProductReviewsStyles.Heading2>
                    No se encontraron opiniones
                  </ProductReviewsStyles.Heading2>
                )}
              </ProductReviewsStyles.FormSection>
            </ProductReviewsStyles.SecondBox>
          </ProductReviewsStyles.UpdateUserContainer>
        </>
      )}
    </>
  );
}

export default ProductReviews;
