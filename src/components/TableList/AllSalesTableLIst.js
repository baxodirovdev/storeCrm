import { Form, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AllSalesTableList = ({ sales, userId }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  let clientsFilter = sales.map((client) => {
    return {
      text: client.clientName,
      value: client.clientName,
    };
  });

  clientsFilter = clientsFilter.filter(
    (thing, index, self) =>
      index ===
      self.findIndex((t) => t.text === thing.text && t.value === thing.value)
  );

  useEffect(() => {
    setData(sales);
  }, [sales]);

  const columns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      width: "20%",
      filters: clientsFilter,
      onFilter: (value, record) => record.clientName.indexOf(value) === 0,
    },
    {
      title: "Total ",
      dataIndex: "total",
      width: "10%",
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Time",
      dataIndex: "time",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.created - b.created,
    },
    {
      title: "Show",
      dataIndex: "operation",
      fixed: "right",
      width: "10%",
      render: (_, record) =>
        data.length >= 1 ? (
          <Link
            to={{
              pathname: `/sales/${record.key}`,
              state: {
                cart: record,
              },
            }}
          >
            Show
          </Link>
        ) : null,
    },
  ];
  return (
    <Form form={form} component={false}>
      <Table
        bordered
        dataSource={data}
        scroll={{ x: 1300, y: 700 }}
        columns={columns}
        rowClassName="editable-row"
      />
    </Form>
  );
};
