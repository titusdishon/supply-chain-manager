import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Column } from "react-table";
import dayjs from "dayjs";
import Table from "../../shared/table";
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
      Cell: (value: any) => (
        <div className="flex flex-row">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 "
            onClick={() =>
              navigate(`/users/create-or-update/${value.row.original.id}`)
            }
          >
            Edit
          </button>
        </div>
      ),
    },
  ];
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `http://localhost:8000/auth/users`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setUsers(response.data.users);
      } catch (error: any) {
        console.log("Error", error);
      }
    };

    return () => {
      fetchUsers();
    };
  }, []);

  const handleCreateNewClick = () => {
    navigate("/users/create-or-update");
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
