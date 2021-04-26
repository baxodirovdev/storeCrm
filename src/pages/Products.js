import { Button, Form, Input, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditableTable } from "../components/layout/EditableTable";
import { addProduct, getProducts } from "../redux/actions/ProductsAction";
import "../styles/Products.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const Products = () => {
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    items: ["Tv", "Fridge"],
    productName: "",
    cost: 0,
    number: 0,
    category: "Tv",
  });

  useEffect(() => {
    dispatch(getProducts(user.uid));
    // eslint-disable-next-line
  }, []);

  console.log(products);

  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const { productName, cost, number, category } = state;

    if (productName && cost && cost > 0 && number && category) {
      dispatch(addProduct(productName, cost, number, category, user.uid));
      handleCancel();
    } else {
      message.warning("Fill all inputs");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setState({
      ...state,
      productName: "",
      cost: 0,
      number: 0,
      category: "Tv",
    });
  };

  return (
    <div className="products">
      <div className="products__header">
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <div className="products__body">

        <EditableTable />
      </div>
      <Modal
        title="Add Products"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={handleOk}
          preserve={false}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              name="productName"
              value={state.productName}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item
            label="Cost"
            name="cost"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <div className="ant__block">
              <input
                className="ant__block_input"
                type="number"
                name="cost"
                value={state.cost}
                onChange={onChangeHandler}
              />
            </div>
          </Form.Item>

          <Form.Item
            label="Number"
            name="number"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <div className="ant__block">
              <input
                className="ant__block_input"
                type="number"
                name="number"
                value={state.number}
                onChange={onChangeHandler}
              />
            </div>
          </Form.Item>

          <Form.Item
            label="Select Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <select
              className="ant__select"
              style={{ width: 120 }}
              name="category"
              value={state.category}
              onChange={onChangeHandler}
            >
              {state.items.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
