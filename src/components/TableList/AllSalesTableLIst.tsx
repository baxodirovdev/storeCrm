import { Form, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type salesType = {
  key?: string;
  clientName: string;
};

type TableProps = {
  sales: [] | salesType[];
};

type clientProps = {
  clientName: string;
};

export const AllSalesTableList = ({ sales }: TableProps) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<salesType[] | []>([]);

  let clientsFilter = sales.map((client: clientProps) => {
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

  const columns: object[] = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      width: "20%",
      filters: clientsFilter,
      onFilter: (value: any, record: any) =>
        record.clientName.indexOf(value) === 0,
    },
    {
      title: "Total ",
      dataIndex: "total",
      width: "10%",
      sorter: (a: any, b: any) => a.total - b.total,
    },
    {
      title: "Time",
      dataIndex: "time",
      width: "10%",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.created - b.created,
    },
    {
      title: "Show",
      dataIndex: "operation",
      fixed: "right",
      width: "10%",
      render: (_: any, record: { key: string }) =>
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
