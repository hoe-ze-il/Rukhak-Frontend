import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Button from "@mui/material/Button";
import { useChartOrderQuery } from "@/features/seller/getOrderSliceSeller";

const LineChart = () => {
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState("");
  const { data: orders, isLoading } = useChartOrderQuery();
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    if (!isLoading && orders && orders.data) {
      setChartType("weekly");
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const weeklyData = orders.data.monthly.filter((entry) => {
        const entryMonth = new Date(entry.startDate).getMonth() + 1;
        return entryMonth === currentMonth;
      });
      setWeekly(weeklyData);

      const yearlyData = orders.data.yearly.filter(
        (entry) => entry.year === currentYear
      );
      setMonthly(yearlyData);
    }
  }, [isLoading, orders]);

  useEffect(() => {
    let myChart;
    const updateChart = () => {
      let labels;
      let dataValues;

      if (chartType === "weekly") {
        labels = weekly.map((entry) => `Week ${entry.weekNumber}`);
        dataValues = weekly.map((entry) => entry.count || 0);
      } else {
        const monthlyData = monthly.map((entry) => entry.count || 0);

        labels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        dataValues = monthlyData;
      }

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Sales",
            data: dataValues,
            fill: false,
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

      if (myChart) {
        myChart.destroy();
      }

      myChart = new Chart(chartRef.current, {
        type: "line",
        data: data,
        options: options,
      });
    };

    updateChart();

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartType]);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2) ",
      }}
    >
      <canvas ref={chartRef} width="400" height="200" />
      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={() => setChartType("weekly")}
          style={{
            backgroundColor: chartType === "weekly" ? "#06D6A0" : "inherit",
          }}
        >
          Weekly
        </Button>
        <Button
          onClick={() => setChartType("monthly")}
          style={{
            backgroundColor: chartType === "monthly" ? "#06D6A0" : "inherit",
          }}
        >
          Monthly
        </Button>
      </div>
    </div>
  );
};

export default LineChart;
