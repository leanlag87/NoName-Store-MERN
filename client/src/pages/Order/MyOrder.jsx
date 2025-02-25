import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../store/reducers/orderSlice";
import MetaData from "../../components/ui/MetaData/MetaData";
import Loader from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import OrderCard from "./OrderCard";
import * as MyOrderStyles from "./Styles/MyOrderStyles";

const MyOrder = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const { orders, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // Despacha myOrders solo si no se ha cargado antes
    if (!ordersLoaded) {
      dispatch(myOrders());
      setOrdersLoaded(true); // Marca como cargado
    }
  }, [dispatch, error, ordersLoaded]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="My Orders" />
          <MyOrderStyles.OrderPageContainer>
            <MyOrderStyles.OrderPageTitle variant="h6">
              Sus Pedidos
            </MyOrderStyles.OrderPageTitle>
            <MyOrderStyles.OrderPageText variant="body1">
              {orders.length} pedidos realizados en {currentYear}
            </MyOrderStyles.OrderPageText>
          </MyOrderStyles.OrderPageContainer>

          {orders.map((item) => (
            <MyOrderStyles.OrderCardContainer key={item._id}>
              <OrderCard item={item} user={user} />
            </MyOrderStyles.OrderCardContainer>
          ))}
        </div>
      )}
    </>
  );
};

export default MyOrder;
