import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";
import {
  FetchProductsRequestAction,
  FetchProductsFailureAction,
  FetchProductsSuccessAction,
  ProductsActionTypes,
} from "../../../redux/actions/product-actions";
import { useDispatch } from "react-redux";
import Table from "../../shared/table";
import PageWrapper from "./page-wrapper";
import { ErrorAlert } from "../../shared/alerts";
import { useNavigate } from "react-router-dom";

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
const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch<FetchProductsRequestAction>({
        type: ProductsActionTypes.FETCH_PRODUCTS_REQUEST,
      });

      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8000/products`
        );
        const { data } = response.data;

        dispatch<FetchProductsSuccessAction>({
          type: ProductsActionTypes.FETCH_PRODUCTS_SUCCESS,
          payload: response.data,
        });
        setProducts(data);
      } catch (error: any) {
        dispatch<FetchProductsFailureAction>({
          type: ProductsActionTypes.FETCH_PRODUCTS_FAILURE,
          payload: error.message,
        });
      }
    };

    return () => {
      fetchProducts();
    };
  }, []);

  const handleCreateNewClick = () => {
    navigate("/home/create-products");
  };

  return (
    <PageWrapper title="Products" createNewOnclick={handleCreateNewClick}>
      {products && !products.length && (
        <ErrorAlert message="There are no products found !" />
      )}
      {products && <Table columns={columns} data={products} />}
    </PageWrapper>
  );
};

export default Products;
