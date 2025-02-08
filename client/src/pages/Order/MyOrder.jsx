import React, { useEffect } from "react";
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
  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="My Orders" />
          <MyOrderStyles.OrderPageContainer>
            <MyOrderStyles.OrderPageTitle variant="h6">
              Su Pedido
            </MyOrderStyles.OrderPageTitle>
            <MyOrderStyles.OrderPageText variant="body1">
              {orders.length}pedido realizado en{currentYear}
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
