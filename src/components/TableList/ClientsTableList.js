import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editClients, removeClients } from "../../redux/actions/ClientAction";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const ClientsTableList = ({ clients, userUid }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setData(clients);
  }, [clients]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      productName: "",
      cost: 0,
      number: 0,
      category: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const index = data.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = data[index];
        dispatch(editClients(userUid, key, row, item));
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      width: "30%",
      editable: true,
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      width: "15%",
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "10%",
      editable: false,
    },
    {
      title: "Store Name",
      dataIndex: "storeName",
      width: "20%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Link
              href="#"
              onClick={() => save(record.key)}
              style={{
                marginRight: 4,
              }}
            >
              Save
            </Link>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Link>Cancel</Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },

    {
      title: "Delete",
      dataIndex: "operation",
      fixed: "right",
      width: "10%",
      render: (_, record) =>
        data.length >= 1 ? (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => dispatch(removeClients(userUid, record.key))}
          >
            Delete
          </Typography.Link>
        ) : null,
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
          col.dataIndex === "number" || col.dataIndex === "cost"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        scroll={{ x: 1300, y: 700 }}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
