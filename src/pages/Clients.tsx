import { Button, Form, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientsTableList } from "../components/TableList/ClientsTableList";
import { addClient, getClients } from "../redux/actions/ClientAction";
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

export const Clients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    gender: "Male",
    storeName: "",
    phoneNumber: "",
  });

  const user = useSelector(
    (state: RootState) => state.user.user
  );
  const clients = useSelector((state: RootState) => state.clients.clients);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getClients(user.uid));
    // eslint-disable-next-line
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onChangeHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    if (target) {
      if (target.name === "phoneNumber") {
        setClientInfo({
          ...clientInfo,
          phoneNumber: "+" + target.value.replace(/[^\d]/g, ""),
        });
      } else {
        setClientInfo({
          ...clientInfo,
          [target.name]: target.value,
        });
      }
    }
  };

  const handleOk = () => {
    const { clientName, gender, phoneNumber, storeName } = clientInfo;

    if (clientName && gender && phoneNumber && storeName) {
      dispatch(addClient(clientName, gender, phoneNumber, storeName, user.uid));
      handleCancel();
    } else {
      message.warning("Fill all inputs");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setClientInfo({
      ...clientInfo,
      clientName: "",
      gender: "Male",
      storeName: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="clients">
      <ContentHeader className="clients__header">
        <ContentPageTitle>Clients</ContentPageTitle>
        <Button type="primary" onClick={showModal}>
          + Add Client
        </Button>
      </ContentHeader>
      <ContentBody className="clients__body">
        <ClientsTableList clients={clients} userUid={user.uid} />
      </ContentBody>

      <Modal
        title="Add Client"
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
            label="Client Name"
            name="clientName"
            rules={[
              {
                required: true,
                message: "Please input clientName!",
              },
            ]}
          >
            <FormBlock>
              <FormInput
                name="clientName"
                type="text"
                value={clientInfo.clientName}
                onChange={onChangeHandler}
              />
            </FormBlock>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input phoneNumber!",
              },
            ]}
          >
            <FormBlock>
              <FormInput
                type="text"
                name="phoneNumber"
                value={clientInfo.phoneNumber}
                onChange={onChangeHandler}
              />
            </FormBlock>
          </Form.Item>

          <Form.Item
            label="Store Name"
            name="storeName"
            rules={[
              {
                required: true,
                message: "Please input storeName!",
              },
            ]}
          >
            <FormBlock>
              <FormInput
                name="storeName"
                type="text"
                value={clientInfo.storeName}
                onChange={onChangeHandler}
              />
            </FormBlock>
          </Form.Item>

          <Form.Item
            label="Select gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input gender!",
              },
            ]}
          >
            <FormSelect
              name="gender"
              value={clientInfo.gender}
              onChange={onChangeHandler}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </FormSelect>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
