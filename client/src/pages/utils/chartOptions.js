// Funciones para generar las opciones de Highcharts
export function getLineOptions(totalAmount) {
  //Recibe los valores como parametros y retornan el objeto de configuracion conrrespondiente
  return {
    chart: {
      type: "line",
      style: {
        fontFamily: "Roboto",
        fontWeight: "900",
      },
    },
    xAxis: {
      categories: ["Initial Amount", "Amount Earned"],
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          fontWeight: "900",
        },
      },
    },
    series: [
      {
        name: "TOTAL AMOUNT",
        data: [0, totalAmount],
      },
    ],
    plotOptions: {
      line: {
        lineWidth: 4,
        marker: {
          enabled: true,
        },
        color: "black",
      },
    },
  };
}

export function getDoughnutOptions(product, outOfStock) {
  //Recibe los valores como parametros y retornan el objeto de configuracion conrrespondiente
  return {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "Product Stock Status",
      align: "center",
      style: {
        color: "black",
        fontWeight: "900",
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            fontWeight: "500",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Share",
        data: [
          ["Out of Stock", product.length - outOfStock],
          {
            name: "Out of Stock",
            y: outOfStock,
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
  };
}
