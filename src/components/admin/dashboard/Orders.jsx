import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function Orders({ mainContainerWidth }) {
  const chartRef = useRef(null);
  const titleFont = { size: 16, weight: "bold" };
  const aggregatedOrders = useSelector(
    (state) =>
      state.api.queries["getAnalytics(undefined)"]?.data?.aggregatedOrders
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const xLabels = aggregatedOrders?.map((item) => {
    return `${months[item._id?.month - 1]} ${item._id?.day}`;
  });

  useEffect(() => {
    const ctx = document.getElementById("mixedChart").getContext("2d");

    // check if the chart instance already exists
    if (chartRef.current) {
      // if it does, destroy the existing instance before creating a new one
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "10 Jan",
          "11 Jan",
          "12 Jan",
          "13 Jan",
          "14 Jan",
          "15 Jan",
          "16 Jan",
        ],
        // labels: xLabels,
        datasets: [
          {
            label: "Products Sold",
            type: "bar",
            data: [12, 19, 3, 5, 2, 3, 7],
            // There is insufficient data
            // data: aggregatedOrders?.map((item) => item.productsSold),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            yAxisID: "y1",
          },
          {
            label: "Total Revenue",
            type: "line",
            data: [52, 108, 30, 50, 20, 24, 38],
            // data: aggregatedOrders?.map((item) => item.totalRevenue),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            yAxisID: "y2",
          },
        ],
      },
      options: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            font: titleFont,
            text: "Products sold and Revenue",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.dataset.yAxisID === "y1") {
                  // formatting for 'Products Sold'
                  label += context.parsed.y + " units";
                } else if (context.dataset.yAxisID === "y2") {
                  // formatting for 'Total Revenue'
                  label += "$ " + context.parsed.y.toFixed(2);
                }

                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y1: {
            position: "left",
            ticks: {
              maxTicksLimit: 10,
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          y2: {
            position: "right",
            ticks: {
              maxTicksLimit: 10,
              callback: function (value) {
                return "$ " + value;
              },
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="line-chart"
      style={{ width: `${mainContainerWidth / 2 - 64}px` }}
    >
      <canvas id="mixedChart"></canvas>
    </div>
  );
}

export default Orders;
