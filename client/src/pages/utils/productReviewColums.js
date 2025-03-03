import React from "react";
// Importamos estilos o iconos que se usan en la definición de las columnas
import * as ProductReviewsStyles from "../../pages/Admin/Styles/ProductReviewsStyles";

// La función recibe el handler para eliminar la reseña y retorna el array de columnas
export const getProductReviewColumns = (deleteReviewHandler) => [
  {
    field: "id",
    headerName: "Review ID",
    minWidth: 230,
    flex: 0.5,
    headerClassName: "column-header",
  },
  {
    field: "user",
    headerName: "Usuario",
    flex: 0.8,
    magin: "0 auto",
    headerClassName: "column-header hide-on-mobile",
  },
  {
    field: "comment",
    headerName: "Comentario",
    minWidth: 350,
    flex: 0.8,
  },
  {
    field: "recommend",
    headerName: "Recomendado",
    minWidth: 100,
    flex: 1,
    headerClassName: "column-header hide-on-mobile",
    cellClassName: (params) =>
      params.row.recommend === "Yes" ? "greenColor" : "redColor", // Si la reseña es positiva, se usa color verde, de lo contrario rojo.
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    minWidth: 200,
    flex: 0.5,
    headerClassName: "column-header hide-on-mobile",
    cellClassName: (params) =>
      params.row.rating >= 3 ? "greenColor" : "redColor", // Dependiendo de la calificación.
  },
  {
    field: "actions",
    flex: 1,
    headerName: "Acciones",
    minWidth: 230,
    headerClassName: "column-header1",
    sortable: false,
    renderCell: (params) => {
      return (
        <div
          onClick={() => {
            deleteReviewHandler(params.row.id);
          }}
        >
          <ProductReviewsStyles.StyledDeleteIcon
            style={{ marginLeft: "1rem" }}
          />
        </div>
      );
    },
  },
];
