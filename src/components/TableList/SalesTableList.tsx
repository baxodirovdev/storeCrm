import { Button, Form, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/CartAction";
import { RootState } from "../../redux/reducers";

type TableProps = {
  products: [] | payloadType[];
};

type payloadType = {
  key: string;
  number: number;
  newData: {};
  products: [];
};

export const SalesTableList = ({ products }: TableProps) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<payloadType[] | []>([]);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(products);
  }, [products]);

  type columnsType = {
    title: string;
    dataIndex: any;
    width: string;
    editable?: boolean;
    fixed?: string;
    render?: (
      _: any,
      record: { key: string; number: number }
    ) => number | JSX.Element;
  };

  const columns: columnsType[] = [
    {
      title: "Product Name",
      dataIndex: "productName",
      width: "30%",
    },
    {
      title: "Number",
      dataIndex: "number",
      width: "10%",
      render: (_: any, record: { key: string; number: number }) => {
        let cartNumber = record.number;
        cart.forEach((item: { key: string; number: number; cart: number }) => {
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
      render: (_: any, record: { key: string; number: number }) => {
        let cartNumber = 0;

        cart.forEach((item: { key: string; cart: number }) => {
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

  type mergedColumnsType = {
    title: string;
    dataIndex: any;
    width: string;
    editable?: boolean;
    onCell?: (record: { key: string }) => {
      record: any;
      inputType: string;
      dataIndex: any;
      title: string;
    };
  };

  const mergedColumns: mergedColumnsType[] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: { key: string }) => ({
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
