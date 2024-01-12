import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const DashboardChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data or use dummy data for the chart
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Initialize the chart
    const myChart = new Chart(chartRef.current, {
      type: "bar",
      data: data,
      options: options,
    });

    // Clean up on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} width="400" height="200" />;
};

export default DashboardChart;
