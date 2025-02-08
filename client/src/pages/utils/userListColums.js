import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export const getUserListColums = (deleteUserHandler) => [
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    flex: 0.5,
    headerClassName: "column-header hide-on-mobile",
  },

  {
    field: "email",
    headerName: "Email",
    minWidth: 150,
    flex: 0.7,
    headerClassName: "column-header hide-on-mobile",
  },

  {
    field: "role",
    headerName: "Role",
    type: "number",
    minWidth: 150,
    flex: 0.3,
    headerClassName: "column-header hide-on-mobile",
    cellClassName: (params) => {
      return params.getValue(params.id, "role") === "admin"
        ? "greenColor"
        : "redColor";
    },
  },
  {
    field: "actions",
    flex: 0.3,
    headerName: "Actions",
    minWidth: 150,
    type: "number",

    headerClassName: "column-header hide-on-mobile",
    renderCell: (params) => {
      return (
        <>
          <EditIcon
            component={Link}
            to={`/admin/user/${params.getValue(params.id, "id")}`}
            className="icon-"
          />

          <Button
            onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}
          >
            <DeleteIcon className="iconbtn" />
          </Button>
        </>
      );
    },
  },
  {
    field: "id",
    headerName: "User ID",
    minWidth: 180,
    flex: 0.8,
    sortable: false,
    headerClassName: "column-header hide-on-mobile",
  },
];
