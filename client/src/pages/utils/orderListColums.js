import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const getOrderListColumns = (deleteOrderHandler) => [
  {
    field: "id",
    headerName: "ID del Pedido",
    minWidth: 120,
    flex: 0.7,
    headerClassName: "column-header",
  },
  {
    field: "status",
    headerName: "Estado",
    minWidth: 100,
    flex: 0.8,
    headerClassName: "column-header hide-on-mobile",
    renderCell: (params) => {
      const color = params.value === "Delivered" ? "green" : "red";
      return <div style={{ color, fontWeight: 600 }}>{params.value}</div>;
    },
  },
  {
    field: "itemsQty",
    headerName: "Cantidad de Productos",
    type: "number",
    minWidth: 120,
    flex: 0.8,
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "amount",
    headerName: "Monto",
    type: "number",
    minWidth: 120,
    flex: 0.8,
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "actions",
    headerName: "Acciones",
    flex: 1.5,
    sortable: false,
    minWidth: 150,
    headerClassName: "column-header1",
    renderCell: (params) => {
      return (
        <>
          <EditIcon
            component={Link}
            to={`/admin/order/${params.getValue(params.id, "id")}`}
            className="icon-"
          />

          {/* <Link
            onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}
          >
            <DeleteIcon className="iconbtn" />
          </Link> */}
          <IconButton
            onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}
          >
            <DeleteIcon className="iconbtn" />
          </IconButton>
        </>
      );
    },
  },
];
