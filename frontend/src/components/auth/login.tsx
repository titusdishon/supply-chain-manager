import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import {
  LoginRequestAction,
  AuthActionTypes,
  LoginSuccessAction,
  LoginFailureAction,
} from "../../redux/actions/auth-actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    dispatch<LoginRequestAction>({
      type: AuthActionTypes.LOGIN_REQUEST,
    });

    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:8000/auth/login`,
        {
          username: data.username,
          password: data.password,
        }
      );

      localStorage.setItem("token", response.data.token);

      dispatch<LoginSuccessAction>({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: response.data.token,
      });
    } catch (error: any) {
      dispatch<LoginFailureAction>({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
