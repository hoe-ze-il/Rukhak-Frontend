import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useGetOrdersQuery } from "@/features/seller/getOrderSliceSeller";
const DonutChart = () => {
  const chartRef = useRef(null);
  const { data: orders } = useGetOrdersQuery();
  useEffect(() => {
    if (!orders) return;
    const labelCounts = {
      cancelled: 0,
      pending: 0,
      approved: 0,
      shipped: 0,
      delivered: 0,
    };
    orders.data.docs.forEach((order) => {
      const orderStatus = order.shipping.status; // Replace with the actual property name
      if (labelCounts.hasOwnProperty(orderStatus)) {
        labelCounts[orderStatus]++;
      }
    });
    const data = {
      labels: Object.keys(labelCounts),
      datasets: [
        {
          data: Object.values(labelCounts),
          backgroundColor: [
            "#EF476F",
            "#FFC43D",
            "#B191FF",
            "#118AB2",
            "#06D6A0",
          ],
          hoverBackgroundColor: [
            "#EF476F",
            "#FFC43D",
            "#B191FF",
            "#118AB2",
            "#06D6A0",
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      cutout: "70%", // Adjust the cutout percentage to control the size of the hole
    };
    const myChart = new Chart(chartRef.current, {
      type: "doughnut", // Change the chart type to "doughnut"
      data: data,
      options: options,
    });
    return () => {
      myChart.destroy();
    };
  }, [orders]);
  return (
    <div>
      <div style={{ margin: "16px" }}>
        <strong>Order Status</strong>
      </div>
      <canvas ref={chartRef} width="400" />
    </div>
  );
};
export default DonutChart;
