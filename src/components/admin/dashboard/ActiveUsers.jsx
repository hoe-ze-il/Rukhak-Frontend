import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // X axis
  LinearScale, // y axis
  PointElement,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import "chart.js/auto";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const titleFont = { size: 16, weight: "bold" };

function ActiveUsers({ mainContainerWidth }) {
  const analyticData = useSelector(
    (state) => state.api.queries["getAnalytics(undefined)"]?.data?.activeUsers
  );

  function changeDateFormat(data) {
    if (data) {
      return data.map((item) => dayjs(item.date).format("MMM DD"));
    }
    return [];
  }

  const data = {
    labels: changeDateFormat(analyticData),
    datasets: [
      {
        label: "Active viewers",
        data: analyticData?.map((item) => item.count),
        backgroundColor: "transparent",
        borderColor: "#f26c6d",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        // tension: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    tooltips: {
      enabled: true,
      mode: "x",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || "";
          if (label) {
            label += ": ";
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Active Viewers in the Last 30days",
        font: titleFont,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 3,
          callback: (value) => value,
        },
        border: {
          display: false,
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };

  return (
    <>
      <div
        className="line-chart"
        style={{ width: `${mainContainerWidth / 2 - 64}px` }}
      >
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
}

export default ActiveUsers;
