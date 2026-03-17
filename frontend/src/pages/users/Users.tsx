import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useUsersAnalytics } from "../../api/useUsersAnalytics";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useUsersAnalytics();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users</p>;

  // transform backend data
  const rows = data.map((user: any) => {
    const names = user.fullname.split(" ");

    return {
      id: user._id,
      img: user.img,
      firstName: names[0],
      lastName: names[1],
      email: user.email,
      phone: user.phone,
      createdAt: new Date(user.createdAt).toLocaleDateString(),
      verified: user.status === "verified",
    };
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
      </div>
      <DataTable slug="users" columns={columns} rows={rows} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
