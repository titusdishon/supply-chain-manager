import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";
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
const Inventory = () => {
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

  const handleCreateNewClick = () => {
    navigate("/home/create-products");
  };

  return (
    <PageWrapper title="Inventory" createNewOnclick={handleCreateNewClick}>
      {products && !products.length && (
        <ErrorAlert message="There are no products found !" />
      )}
      {products && <Table columns={columns} data={products} />}
    </PageWrapper>
  );
};

export default Inventory;
