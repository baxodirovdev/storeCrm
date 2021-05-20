import { Descriptions, Form, PageHeader, Row, Statistic, Table } from "antd";
import React from "react";
import { ContentBody, ContentHeader } from "../styledComponents/Content";

interface SaleProps {
  location: {
    state: {
      cart: {
        clientName: string;
        total: number;
        time: string;
        created: number;
        cart: { cost: number; cart: number }[];
      };
    };
  };
}

export const Sale = ({ location }: SaleProps) => {
  let { clientName, total, time, created, cart } = location.state.cart;

  let timeStamp = new Date(created);
  let createdTime = timeStamp.getHours() + ":" + timeStamp.getMinutes();

  const [form] = Form.useForm();

  cart = cart.map((item: { cost: number; cart: number }) => {
    return {
      ...item,
      total: item.cost * item.cart + " $",
    };
  });

  type columnsType = {
    title: string;
    dataIndex: any;
    width: string;
    fixed?: "right";

  };

  const columns: columnsType[] = [
    {
      title: "Client Name",
      dataIndex: "productName",
      width: "10%",
    },
    {
      title: "Number",
      dataIndex: "cart",
      width: "5%",
    },
    {
      title: "Price",
      dataIndex: "cost",
      width: "5%",
    },
    {
      title: "Total",
      dataIndex: "total",
      width: "5%",
      fixed: "right",
    },
  ];

  return (
    <div className="sale">
      <ContentHeader className="sale__header">
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Sales"
          subTitle="Get Back to sales"
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Client Name">
              {clientName}
            </Descriptions.Item>
            <Descriptions.Item label="Created day">{time}</Descriptions.Item>
            <Descriptions.Item label="Created time">
              {createdTime}
            </Descriptions.Item>
          </Descriptions>
          <Row>
            <Statistic title="Price" prefix="$" value={total} />
          </Row>
        </PageHeader>
      </ContentHeader>
      <ContentBody className="sale__body">
        <Form form={form} component={false}>
          <Table
            bordered
            dataSource={cart}
            scroll={{ x: 1300, y: 700 }}
            columns={columns}
            rowClassName="editable-row"
          />
        </Form>
      </ContentBody>
    </div>
  );
};
