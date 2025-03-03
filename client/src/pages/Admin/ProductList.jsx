import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProducts,
  deleteProduct,
  resetDeleteProduct,
} from "../../store/reducers/productSlice";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "./Styles/productList.css";
import { getProductListColums } from "../utils/productListColums"; // Importamos la función que genera las columnas

function ProductList() {
  //Estados globales y hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { error, products, loading } = useSelector((state) => state.product);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  // para manejar errores, éxito en eliminación y cargar productos
  useEffect(() => {
    // Manejar errores generales
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // Manejar errores de eliminación
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    // Manejar eliminación exitosa
    if (isDeleted) {
      toast.success("Producto eliminado correctamente");
      dispatch(resetDeleteProduct());
    }
    // Cargar la lista de productos
    dispatch(getProducts());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  // Maneja la apertura/cierre de la barra lateral
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // Handler para eliminar un producto
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // Configuración de columnas para el DataGrid
  const columns = getProductListColums(deleteProductHandler);

  // Preparación de datos para el DataGrid
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

  // para manejar el cierre automático del sidebar en pantallas grandes
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
          <MetaData title="Todos los productos - Admin" />

          <div className="product-list" style={{ marginTop: 0 }}>
            {/* Barra lateral de navegación */}
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>
            {/* Contenido principal */}
            <div className="list-table">
              {/* Barra de navegación superior */}
              <Navbar toggleHandler={toggleHandler} />
              {/* Contenedor de la tabla de productos */}
              <div className="productListContainer">
                <h4 id="productListHeading">TODOS LOS PRODUCTOS</h4>
                {/* Tabla de productos usando DataGrid */}
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
