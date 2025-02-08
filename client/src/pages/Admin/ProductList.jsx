import React, { useState, useEffect } from "react";
import "./Styles/productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
// import {
//     clearErrors,
//     getAdminProducts,
//     deleteProduct,
//   } from "../../actions/productAction";
import {
  clearErrors,
  getProducts,
  deleteProduct,
  resetDeleteProduct,
} from "../../store/reducers/productSlice"; //Averiguar si estan bien todas las importaciones que hice
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getProductListColums } from "../utils/productListColums"; // Importamos la función que genera las columnas
//import { DELETE_PRODUCT_RESET } from "../../constants/productsConstatns";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateProduct
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Producto eliminado exitosamente");

      dispatch({ type: resetDeleteProduct });
    }
    dispatch(getProducts());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  // Handler para controlar el toggle
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // Handler para eliminar un producto
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = getProductListColums(deleteProductHandler);

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL PRODUCTS - Admin`} />

          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">TODOS LOS PRODUCTOS</h4>

                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="productListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductList;
