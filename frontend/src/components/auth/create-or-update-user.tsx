import { useForm } from "react-hook-form";
import { UserRole } from "../../redux/types";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorAlert, SuccessAlert } from "../shared/alerts";
import PageWrapper from "../dashboard/pages/page-wrapper";

interface IRegistrationFormData {
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  role: UserRole;
}

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegistrationFormData>();
  const onSubmit = async (data: IRegistrationFormData) => {
    const userToken = localStorage.getItem("token");

    try {
      await axios.post(`http://localhost:8000/auth/register`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setSuccessMessage("Success! Your have created an account.");

      setTimeout(() => {
        navigate("/home/users");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(
        "Failed! We could not complete your request, try again later."
      );
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (id) {
      const fetchProduct = async () => {
        try {
          const response: AxiosResponse = await axios.get(
            `http://localhost:8000/auth/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          const data = response.data.user;
          setValue("email", data.email);
          setValue("isActive", data.isActive);
          setValue("role", data.role);
          setValue("username", data.username);
        } catch (error: any) {
          console.log("Error", error);
        }
      };

      return () => {
        fetchProduct();
      };
    }
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {successMessage && <SuccessAlert message={successMessage} />}
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <h2 className="text-2xl font-bold mb-4">
            {id ? "Update" : "Create"} User
          </h2>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("username", { required: true })}
            />
            {errors.username && <span>This field is required</span>}
          </div>
          {!id && (
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                className="w-full border rounded py-2 px-3"
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded py-2 px-3"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Is Active</label>
            <input
              type="checkbox"
              className="border rounded py-2 px-3"
              {...register("isActive")}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Role</label>
            <select
              className="w-full border rounded py-2 px-3"
              {...register("role", { required: true })}
            >
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.USER}>User</option>
            </select>
            {errors.role && <span>This field is required</span>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {id ? "Update User" : "Create"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Registration;
