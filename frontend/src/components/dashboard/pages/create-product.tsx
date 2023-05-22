import { useForm } from "react-hook-form";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { SuccessAlert, ErrorAlert } from "../../shared/alerts";
import PageWrapper from "./page-wrapper";
import { CURRENCIES } from "../../../redux/types";

interface IProductFormData {
  price: number;
  quantity: number;
  batchNumber: string;
  currency: CURRENCIES;
  imageUrl: string;
  productName: string;
}

const CreateProduct = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductFormData>();
  const onSubmit = async (data: IProductFormData) => {
    const userToken = localStorage.getItem("token");

    try {
      await axios.post(`http://localhost:8000/products`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setSuccessMessage("Success! Your have created a new product.");
      setTimeout(() => {
        navigate("/home/products");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(
        "Failed! We could not complete your request, try again later."
      );
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {successMessage && <SuccessAlert message={successMessage} />}
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <h2 className="text-2xl font-bold mb-4">Create Product</h2>
          <div className="mb-4">
            <label className="block mb-2">Product Name </label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity </label>
            <input
              type="number"
              className="w-full border rounded py-2 px-3"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Batch Number </label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("batchNumber", { required: true })}
            />
            {errors.batchNumber && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price </label>
            <input
              type="number"
              className="w-full border rounded py-2 px-3"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Currency</label>
            <select
              className="w-full border rounded py-2 px-3"
              {...register("currency", { required: true })}
            >
              <option value={CURRENCIES.USD}>USD</option>
              <option value={CURRENCIES.EURO}>EURO</option>
            </select>
            {errors.currency && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image Url </label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("imageUrl", { required: true })}
            />
            {errors.imageUrl && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CreateProduct;
