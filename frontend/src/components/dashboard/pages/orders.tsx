import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";
import Table from "../../shared/table";
import PageWrapper from "./page-wrapper";
import { ErrorAlert } from "../../shared/alerts";

interface IProduct {
  batchNumber: string;
  currency: string;
  id: number;
  imageUrl: string;
  price: number;
  productName: string;
  quantity: number;
}
interface IOrder {
  status: string;
  customerName: string;
  id: number;
  customerEmail: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  products: IProduct[];
}
const Orders = () => {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const columns: Column<IOrder>[] = [
    {
      Header: "Number",
      accessor: "id",
    },
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
    {
      Header: "Customer Email",
      accessor: "customerEmail",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <span
          className={`rounded p-1 ${
            (value === "pending" && "bg-slate-400 text-black ") ||
            (value === "fulfilled" && "bg-green-400 text-white")
          }`}
        >
          {value}
        </span>
      ),
    },

    {
      Header: "updated At",
      accessor: "updatedAt",
      Cell: ({ value }) => <span>{dayjs(value).format("MM-DD-YYYY")}</span>,
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: ({ value }) => <span>{dayjs(value).format("MM-DD-YYYY")}</span>,
    },
    {
      Header: "Actions",
      Cell: () => (
        <div className="flex flex-row">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ">
            Edit
          </button>
        </div>
      ),
    },
  ];
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8000/orders`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const { data } = response;
        setOrders(data);
      } catch (error: any) {
        setErrorMessage("An error occurred while fetching orders");
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
      }
    };

    return () => {
      fetchOrders();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper title="Orders">
      {orders && !orders.length && (
        <ErrorAlert message="There are no orders found!" />
      )}
      {errorMessage && <ErrorAlert message={errorMessage} />}
      {orders && <Table columns={columns} data={orders} />}
    </PageWrapper>
  );
};

export default Orders;
