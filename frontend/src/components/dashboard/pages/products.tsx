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
import Modal from "../../shared/modal";
import { useForm } from "react-hook-form";

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
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const quantity = watch("quantity");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = (product: IProduct) => {
    setProduct(product);
    setValue("quantity", product.quantity);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log(quantity);
    if (quantity && product && product.quantity > quantity) {
      setErrorMessage(null);
      const finalProduct = {
        batchNumber: product.batchNumber,
        currency: product.currency,
        id: product.id,
        imageUrl: product.imageUrl,
        price: product.price,
        productName: product.productName,
        quantity: quantity,
      };
      dispatch<AddToCartRequestAction>({
        type: CartActionTypes.ADD_TO_CART,
        payload: finalProduct,
      });
      setModalOpen(false);
    } else {
      setErrorMessage(
        "Quantity can only be less than available for this product"
      );
    }
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
      Header: "Price",
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
      Header: "Actions",
      Cell: (values: any) => (
        <div className="flex flex-row">
          <button
            className="bg-green-500 mr-4 text-white py-2 px-4 rounded hover:bg-green-600 "
            onClick={() => openModal(values.row.original)}
          >
            <RiShoppingCart2Fill />
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
            onClick={() => {
              navigate(`/home/create-products/${values.row.original.id}`);
            }}
          >
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
        setErrorMessage("An error occurred while fetching products");
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCancel={() => setModalOpen(false)}
      >
        {errorMessage && <ErrorAlert message={errorMessage} />}
        <div className="mb-4">
          <label className="block mb-2">
            Desired quantity of {product?.productName}{" "}
          </label>
          <input
            type="number"
            className="w-full border rounded py-2 px-3"
            {...register("quantity", { required: true, max: quantity })}
          />
          {errors.quantity && (
            <span className="text-red-800">This field is required</span>
          )}
        </div>
      </Modal>
    </PageWrapper>
  );
};

export default Products;
