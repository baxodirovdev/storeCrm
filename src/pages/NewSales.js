import { Button, Drawer, Form, message, Select } from "antd";
import React, { useState } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SalesTableList } from "../components/TableList/SalesTableList";
import { clearCart } from "../redux/actions/CartAction";
import { updateProducts } from "../redux/actions/ProductsAction";
import { addSales } from "../redux/actions/SalesAction";
import {
  ContentBody,
  ContentHeader,
  ContentPageTitle,
} from "../styledComponents/Content";

import "../styles/Sales.css";

export const NewSales = () => {
  const clients = useSelector((state) => state.clients.clients);
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState("");

  let totalItems = 0;
  let totalCost = 0;

  cart.forEach((item) => {
    totalItems += item.cart;
    totalCost += item.cart * item.cost;
  });

  const addSaleHandler = () => {
    if (cart.length > 0 && client) {
      let clientInfo = {};
      clients.forEach((item) => {
        if (item.key === client) {
          clientInfo = item;
        }
      });

      let store = [...products];

      for (let i = 0; i < store.length; i++) {
        for (let j = 0; j < cart.length; j++) {
          if (store[i].key === cart[j].key) {
            store[i].number -= cart[j].cart;
          }
        }
      }

      dispatch(addSales(cart, clientInfo, user.uid));
      dispatch(updateProducts(user.uid, store));
      dispatch(clearCart());
    } else {
      message.warning("Please select Client and products");
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <Fragment>
      <ContentPageTitle>New Sale</ContentPageTitle>

      <ContentHeader className="newSales__header">
        <Form.Item
          name="client"
          label="Client"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a client" onChange={(e) => setClient(e)}>
            {clients.map((client) => {
              return (
                <Select.Option key={client.key} value={client.key}>
                  {" "}
                  {client.clientName}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <div className="newSales__checkout">
          <p className="newSales__checkout-title">
            Items : <span>{totalItems}</span>
          </p>
          <p className="newSales__checkout-title">
            Total : <span>{totalCost} $</span>
          </p>
          <div className="newSales__checkout-footer">
            <Button type="primary" onClick={addSaleHandler}>
              Add Sale
            </Button>
            <Button type="primary" onClick={showDrawer}>
              Checkout
            </Button>
          </div>
        </div>
      </ContentHeader>

      <ContentBody>
        <SalesTableList products={products} />
      </ContentBody>
      <Drawer
        title="Cart"
        placement="right"
        mask={false}
        onClose={onClose}
        visible={visible}
      >
        {cart.map((item, index) => {
          return (
            <div className="checkout__item" key={index}>
              <p className="checkout__title">
                Product Name :{" "}
                <span className="checkout__data">{item.productName}</span>
              </p>
              <p className="checkout__title">
                Price : <span className="checkout__data">{item.cost} $</span>
              </p>
              <p className="checkout__title">
                Number : <span className="checkout__data">{item.cart}</span>
              </p>
              <p className="checkout__title">
                Total :{" "}
                <span className="checkout__data">
                  {item.cart * item.cost} $
                </span>
              </p>
            </div>
          );
        })}
      </Drawer>
    </Fragment>
  );
};
