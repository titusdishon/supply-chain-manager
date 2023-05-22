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
  AddToCartRequestAction,
  CartActionTypes,
  ResetCartErrorRequestAction,
  ResetCartRequestAction,
} from "../../../redux/actions/cart-actions";
import { RiShoppingCart2Fill } from "react-icons/ri";
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
const Products = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, error } = useSelector((state: RootState) => state.cart);

  const addProduct = (product: IProduct) => {
    const finalProduct = {
      batchNumber: product.batchNumber,
      currency: product.currency,
      id: product.id,
      imageUrl: product.imageUrl,
      price: product.price,
      productName: product.productName,
      quantity: 1,
    };
    dispatch<AddToCartRequestAction>({
      type: CartActionTypes.ADD_TO_CART,
      payload: finalProduct,
    });
  };

  const removeItemsFromCart = () => {
    dispatch<ResetCartRequestAction>({
      type: CartActionTypes.RESET_CART,
    });
  };

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
      Cell: (values: any) => (
        <div className="flex flex-row">
          <button
            className="bg-green-500 mr-4 text-white py-2 px-4 rounded hover:bg-green-600 "
            onClick={() => addProduct(values.row.original)}
          >
            <RiShoppingCart2Fill />
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
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8000/products`
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
    <PageWrapper title="Products" createNewOnclick={handleCreateNewClick}>
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
        <div className="mt-5">
          <button
            onClick={removeItemsFromCart}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Reset items
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
