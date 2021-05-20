import { Button, Form, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsTableList } from "../components/TableList/ProductsTableList";
import { addProduct, getProducts } from "../redux/actions/ProductsAction";
import { RootState } from "../redux/reducers";
import {
  ContentBody,
  ContentHeader,
  ContentPageTitle,
} from "../styledComponents/Content";
import { FormBlock, FormInput, FormSelect } from "../styledComponents/Form";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const Products = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    items: [
      "Tv",
      "Fridge",
      "Gas Stove",
      "Air Conditioning",
      "Washing Machine",
      "microwave",
      "Small household appliances",
    ],
    productName: "",
    cost: 0,
    number: 0,
    category: "Tv",
  });

  useEffect(() => {
    dispatch(getProducts(user.uid));
    // eslint-disable-next-line
  }, []);

  const onChangeHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target) {
      setState({
        ...state,
        [target.name]: target.value,
      });
    }
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
      <ContentHeader className="products__header">
        <ContentPageTitle>Products</ContentPageTitle>
        <Button type="primary" onClick={showModal}>
          + Add Product
        </Button>
      </ContentHeader>
      <ContentBody className="products__body">
        <ProductsTableList products={products} userId={user.uid} />
      </ContentBody>
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
            <FormBlock>
              <FormInput
                name="productName"
                type="text"
                value={state.productName}
                onChange={onChangeHandler}
              />
            </FormBlock>
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
            <FormBlock>
              <FormInput
                type="number"
                name="cost"
                value={state.cost}
                onChange={onChangeHandler}
              />
            </FormBlock>
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
            <FormBlock>
              <FormInput
                type="number"
                name="number"
                value={state.number}
                onChange={onChangeHandler}
              />
            </FormBlock>
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
            <FormSelect
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
            </FormSelect>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
