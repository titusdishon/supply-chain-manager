import { useForm } from "react-hook-form";
import { UserRole } from "../../redux/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const {
    register,
    handleSubmit,
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

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {successMessage && <SuccessAlert message={successMessage} />}
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <h2 className="text-2xl font-bold mb-4">Registration</h2>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full border rounded py-2 px-3"
              {...register("username", { required: true })}
            />
            {errors.username && <span>This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded py-2 px-3"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
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
        </form>
      </div>
    </PageWrapper>
  );
};

export default Registration;
