import { Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AllSalesTableList } from "../components/TableList/AllSalesTableLIst";
import { NEW_SALE } from "../navigation/CONSTANTS";
import { getSales } from "../redux/actions/SalesAction";
import {
  ContentBody,
  ContentHeader,
  ContentPageTitle,
} from "../styledComponents/Content";

export const Sales = () => {
  const sales = useSelector((state) => state.sales.sales);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSales(user.uid));
    // eslint-disable-next-line
  }, []);

  const newSales = sales.map((sale) => {
    const timeStamp = new Date(sale.created);
    const total = sale.cart.reduce((a, b) => a + b.cost * b.cart, 0);
    return {
      ...sale,
      clientName: sale.client.clientName,
      clientUid: sale.client.key,
      time:
        timeStamp.getDate() +
        "/" +
        timeStamp.getMonth() +
        "/" +
        timeStamp.getFullYear(),
      total,
    };
  });

  return (
    <div className="sales">
      <ContentHeader className="sales__header">
        <ContentPageTitle>Sales</ContentPageTitle>
        <Button type="primary">
          <Link to={NEW_SALE}> + New Sale</Link>
        </Button>
      </ContentHeader>
      <ContentBody className="sales__body"></ContentBody>
      <AllSalesTableList sales={newSales} userUid={user.uid} />
    </div>
  );
};
