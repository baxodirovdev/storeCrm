import { Button, Form, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/CartAction";

export const SalesTableList = ({ products }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();


  useEffect(() => {
    setData(products);
  }, [products]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      width: "30%",
    },
    {
      title: "Number",
      dataIndex: "number",
      width: "10%",
      render: (_, record) => {
        let cartNumber = record.number;
        cart.forEach((item) => {
          if (item.key === record.key) {
            cartNumber = record.number - item.cart;
          }
        });
        return cartNumber;
      },
    },
    {
      title: "Price",
      dataIndex: "cost",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "20%",
    },
    {
      title: "Cart",
      dataIndex: "cart",
      width: "15%",
      fixed: "right",
      render: (_, record) => {
        let cartNumber = 0;

        cart.forEach((item) => {
          if (item.key === record.key) {
            cartNumber = item.cart;
          }
        });
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              disabled={record.number === cartNumber}
              onClick={() => dispatch(addToCart(record))}
            >
              +
            </Button>
            <p>{cartNumber}</p>
            <Button
              disabled={cartNumber === 0}
              onClick={() => dispatch(removeFromCart(record))}
            >
              -
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "number" || col.dataIndex === "cart"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        bordered
        dataSource={data}
        scroll={{ x: 1300, y: 700 }}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
  );
};
