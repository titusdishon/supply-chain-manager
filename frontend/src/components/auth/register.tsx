import { useForm } from "react-hook-form";
import { UserRole } from "../../redux/types";
import {
  CreateUserFailureAction,
  CreateUserRequestAction,
  CreateUserSuccessAction,
  UserActionTypes,
} from "../../redux/actions/user-actions";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

type RegistrationFormData = {
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  role: UserRole;
};

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();
  const dispatch = useDispatch();
  const onSubmit = async (data: RegistrationFormData) => {
    dispatch<CreateUserRequestAction>({
      type: UserActionTypes.CREATE_USER_REQUEST,
      payload: data,
    });

    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:8000/auth/register`,
        data
      );

      dispatch<CreateUserSuccessAction>({
        type: UserActionTypes.CREATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch<CreateUserFailureAction>({
        type: UserActionTypes.CREATE_USER_FAILURE,
        payload: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
