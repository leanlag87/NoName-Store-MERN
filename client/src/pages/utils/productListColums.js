import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const getProductListColums = (deleteProductHandler) => [
  {
    field: "id",
    headerName: "Producto ID",
    minWidth: 230,
    flex: 0.5,
    headerClassName: "column-header",
  },
  {
    field: "name",
    headerName: "Nombre",
    minWidth: 150,
    flex: 0.5,
    magin: "0 auto",
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    minWidth: 100,
    flex: 0.5,
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "price",
    headerName: "Precio",
    type: "number",
    minWidth: 200,
    flex: 0.5,
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "actions",
    headerName: "Acciones",
    flex: 1,
    sortable: false,
    minWidth: 230,
    headerClassName: "column-header1",
    renderCell: (params) => {
      return (
        <>
          <Link
            to={`/admin/product/${params.row.id}`}
            style={{ marginLeft: "1rem" }}
          >
            <EditIcon className="icon-" />
          </Link>

          <div onClick={() => deleteProductHandler(params.row.id)}>
            <DeleteIcon className="iconbtn" />
          </div>
        </>
      );
    },
  },
];
