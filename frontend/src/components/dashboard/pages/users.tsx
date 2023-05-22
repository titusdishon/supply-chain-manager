import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";

import { useDispatch } from "react-redux";
import Table from "../../shared/table";
import {
  FetchUsersFailureAction,
  FetchUsersRequestAction,
  FetchUsersSuccessAction,
  UserActionTypes,
} from "../../../redux/actions/user-actions";
import PageWrapper from "./page-wrapper";
import { ErrorAlert } from "../../shared/alerts";
import { useNavigate } from "react-router-dom";
interface IUser {
  status: boolean;
  username: string;
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[] | null>(null);

  const columns: Column<IUser>[] = [
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Role",
      accessor: "role",
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
          <div className="flex flex-row">
            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mx-4">
              Delete
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ">
              Edit
            </button>
          </div>
        </div>
      ),
    },
  ];
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch<FetchUsersRequestAction>({
        type: UserActionTypes.FETCH_USERS_REQUEST,
      });

      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8000/auth/users`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        dispatch<FetchUsersSuccessAction>({
          type: UserActionTypes.FETCH_USERS_SUCCESS,
          payload: response.data.users,
        });
        setUsers(response.data.users);
      } catch (error: any) {
        dispatch<FetchUsersFailureAction>({
          type: UserActionTypes.FETCH_USERS_FAILURE,
          payload: error.message,
        });
      }
    };

    return () => {
      fetchUsers();
    };
  }, []);

  const handleCreateNewClick = () => {
    navigate("/users/register");
  };

  return (
    <PageWrapper title="Users" createNewOnclick={handleCreateNewClick}>
      {users && !users.length && (
        <ErrorAlert message="There are no registered users" />
      )}
      {users && <Table columns={columns} data={users} />}
    </PageWrapper>
  );
};

export default Users;
