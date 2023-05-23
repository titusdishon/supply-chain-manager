import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";
import Table from "../../shared/table";
import PageWrapper from "./page-wrapper";
import { ErrorAlert } from "../../shared/alerts";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CartActionTypes,
  ResetCartErrorRequestAction,
} from "../../../redux/actions/cart-actions";
import { RootState } from "../../../redux/store/store";

interface IProduct {
  batchNumber: string;
  createdAt: string;
  currency: string;
  id: number;
  imageUrl: string;
  price: number;
  productName: string;
  quantity: number;
  updatedAt: string;
}
const Inventory = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, error } = useSelector((state: RootState) => state.cart);

  const columns: Column<IProduct>[] = [
    {
      Header: "Batch Number",
      accessor: "batchNumber",
    },
    {
      Header: "Image",
      accessor: "imageUrl",
    },
    {
      Header: "Product Name",
      accessor: "productName",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },

    {
      Header: "Price per unit",
      accessor: "price",
    },
    {
      Header: "Currency",
      accessor: "currency",
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
      Header: "Total Price",
      Cell: (value: any) => (
        <span>{`${value.row.original.currency}: ${
          value.row.original.quantity * value.row.original.price
        }`}</span>
      ),
    },
  ];

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    const fetchProducts = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8000/products/inventory`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const { data } = response.data;

        setProducts(data);
      } catch (error: any) {
        console.log("Error", error);
      }
    };

    return () => {
      fetchProducts();
    };
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch<ResetCartErrorRequestAction>({
          type: CartActionTypes.RESET_CART_ERROR,
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleCreateNewClick = () => {
    navigate("/home/create-products");
  };

  return (
    <PageWrapper title="Inventory" createNewOnclick={handleCreateNewClick}>
      {products && !products.length && (
        <ErrorAlert message="There are no products found !" />
      )}
      {error && <ErrorAlert message={error} />}
      {products && <Table columns={columns} data={products} />}

      <div className={`mt-10 float-right ${cart.length === 0 ? "hidden" : ""}`}>
        <div className="mb-2">{`${cart.length} Item${
          cart.length === 1 ? "" : "s"
        } already selected.`}</div>
        <div className="mt-5">
          <Link
            to="/order/checkout"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Inventory;
