/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  editProducts,
  removeProducts,
} from "../../redux/actions/ProductsAction";

type EditableCellProps = {
  editing: boolean;
  dataIndex: any;
  title: string;
  inputType: string;
  record: any;
  index: number;
  children: any;
  restProps: any;
};

type payloadType = {
  key: string;
  number: number;
  newData: {};
  products: [];
};

type ProductsTableList = {
  products: [] | payloadType[];
  userId: string;
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps) => {
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

export const ProductsTableList = ({ products, userId }: ProductsTableList) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<payloadType[] | []>([]);
  const [editingKey, setEditingKey] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setData(products);
  }, [products]);

  const isEditing = (record: { key: string }) => record.key === editingKey;

  const edit = (record: { key: string }) => {
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

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const index = data.findIndex((item: { key: string }) => key === item.key);
      if (index > -1) {
        const item = data[index];
        dispatch(editProducts(userId, key, row, item));
        setEditingKey("");
      } else {
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  type columnsType = {
    title: string;
    dataIndex: any;
    width: string;
    editable?: boolean;
    fixed?: string;
    render?: (_: any, record: { key: string }) => JSX.Element | null;
  };

  type mergedColumnsType = {
    title: string;
    dataIndex: any;
    width: string;
    editable?: boolean;
    render?: (_: any, record: { key: string }) => JSX.Element | null;
    onCell?: (record: { key: string }) => {
      record: any;
      inputType: string;
      dataIndex: any;
      title: string;
      editing: boolean;
    };
  };

  const columns: columnsType[] = [
    {
      title: "Product Name",
      dataIndex: "productName",
      width: "30%",
      editable: true,
    },
    {
      title: "Number",
      dataIndex: "number",
      width: "10%",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "cost",
      width: "10%",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "20%",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      fixed: "right",
      render: (_: any, record: { key: string }) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Link
              to="#"
              onClick={() => save(record.key)}
              style={{
                marginRight: 4,
              }}
            >
              Save
            </Link>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Link to="#">Cancel</Link>
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
      render: (_: any, record: { key: string }) =>
        data.length >= 1 ? (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => dispatch(removeProducts(userId, record.key))}
          >
            Delete
          </Typography.Link>
        ) : null,
    },
  ];
  const mergedColumns: mergedColumnsType[] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: { key: string }) => ({
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
