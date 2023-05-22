import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";

import { useDispatch } from "react-redux";
import Table from "../../shared/table";
import {
  FetchOrdersFailureAction,
  FetchOrdersRequestAction,
  FetchOrdersSuccessAction,
  OrdersActionTypes,
} from "../../../redux/actions/order-actions";
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
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<IOrder[] | null>(null);

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
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mx-4">
            Delete
          </button>
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
      dispatch<FetchOrdersRequestAction>({
        type: OrdersActionTypes.FETCH_ORDERS_REQUEST,
      });

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
        dispatch<FetchOrdersSuccessAction>({
          type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
          payload: response.data,
        });
        setOrders(data);
      } catch (error: any) {
        dispatch<FetchOrdersFailureAction>({
          type: OrdersActionTypes.FETCH_ORDERS_FAILURE,
          payload: error.message,
        });
      }
    };

    return () => {
      fetchOrders();
    };
  }, []);

  return (
    <PageWrapper
      title="Orders"
      createNewOnclick={() => {
        console.log("create new");
      }}
    >
      {orders && !orders.length && (
        <ErrorAlert message="There are no orders found!" />
      )}
      {orders && <Table columns={columns} data={orders} />}
    </PageWrapper>
  );
};

export default Orders;
