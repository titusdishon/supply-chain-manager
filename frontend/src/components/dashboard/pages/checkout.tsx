import { useForm } from "react-hook-form";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { SuccessAlert, ErrorAlert } from "../../shared/alerts";
import PageWrapper from "./page-wrapper";
import { OrderStatus, Product } from "../../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Column } from "react-table";
import Table from "../../shared/table";
import {
  ResetCartErrorRequestAction,
  CartActionTypes,
} from "../../../redux/actions/cart-actions";

interface IOrderFormData {
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  address: string;
}

const Checkout = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);

  const columns: Column<Product>[] = [
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
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderFormData>();
  const dispatch = useDispatch();

  const restCart = () => {
    dispatch<ResetCartErrorRequestAction>({
      type: CartActionTypes.RESET_CART_ERROR,
    });
  };
  const onSubmit = async (data: IOrderFormData) => {
    const userToken = localStorage.getItem("token");
    const product = {
      status: OrderStatus.PENDING,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      address: data.address,
      orderedProducts: cart,
    };
    if (cart.length) {
      try {
        await axios.post(`http://localhost:8000/orders`, product, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setSuccessMessage("Success! Your have created a new order.");
        restCart();
        setTimeout(() => {
          navigate("/home/orders");
        }, 1000);
      } catch (error: any) {
        setErrorMessage(
          "Failed! We could not complete your request, try again later."
        );
      }
    } else {
      setSuccessMessage("Your cart is empty");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-10">
          <h2 className="text-2xl font-bold mb-4">Ordered Products</h2>
          <Table data={cart} columns={columns} />
        </div>
        <form
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {successMessage && <SuccessAlert message={successMessage} />}
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="mb-4">
            <label className="block mb-2">Customer Name </label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("customerName", { required: true })}
            />
            {errors.customerName && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Customer Email </label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("customerEmail", { required: true })}
            />
            {errors.customerEmail && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address </label>
            <input
              type="text-area"
              className="w-full border rounded py-2 px-3"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
