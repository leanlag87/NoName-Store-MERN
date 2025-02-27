import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
  resetDelete,
} from "../../store/reducers/orderSlice";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "./Styles/productList.css";
import { getOrderListColumns } from "../utils/orderListColums"; // Importamos la función que genera las columnas para el DataGrid

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, orders } = useSelector((state) => state.order);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const [toggle, setToggle] = useState(false);

  // Handler para controlar el toggle
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  // Handler para eliminar una orden
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  // Calculamos las columnas usando la función importada y pasando el handler
  const columns = getOrderListColumns(deleteOrderHandler);

  // Preparamos los rows para el DataGrid
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  //Se ejecuta cuando carga el componente y cada vez que cambia el estado de toggle
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

  // Se ejecuta cuando cambia el estado de error, isDeleted, deleteError y orders
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
      toast.success("Orden eliminada exitosamente");
      navigate("/admin/orders");
      dispatch(resetDelete());
    }
    dispatch(getAllOrders());
  }, [dispatch, error, isDeleted, deleteError, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Orders - Admin`} />
          <div className="product-list" style={{ marginTop: 0 }}>
            <div className={!toggle ? "listSidebar" : "toggleBox"}>
              <Sidebar />
            </div>

            <div className="list-table">
              <Navbar toggleHandler={toggleHandler} />
              <div className="productListContainer">
                <h4 id="productListHeading">TODOS LOS PEDIDOS</h4>

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

export default OrderList;
