import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // X axis
  LinearScale, // y axis
  PointElement,
  Legend,
} from "chart.js";
import "@/styles/admin/dashboard.scss";
import ActiveUsers from "@/components/admin/dashboard/ActiveUsers";
import { useScreenAndSidebarWidth } from "@/hooks/admin/useScreenAndSidebarWidth";
import { useGetAnalyticsQuery } from "@/features/admin/analyticSlice";
import Loading from "@/components/admin/product/Loading";
import Orders from "@/components/admin/dashboard/Orders";
import AggregatedData from "@/components/admin/dashboard/AggregatedData";

const verticalLinePlugin = {
  id: "verticalLineOnHover",
  afterDraw: (chart) => {
    if (chart.tooltip?._active && chart.tooltip?._active?.length) {
      const ctx = chart.ctx;
      const x = chart.tooltip?._active[0]?.element.x;
      const topY = chart.scales.y?.top;
      const bottomY = chart.scales.y?.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"; // Customize the line color and width
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  verticalLinePlugin
);

function Dashboard() {
  const { screenWidth, sidebarWidth } = useScreenAndSidebarWidth();
  const { isFetching } = useGetAnalyticsQuery();

  // minus margin along x axis 2 x 16px and 16px gap
  const mainContainerWidth = screenWidth - sidebarWidth - 48;

  return (
    <>
      <main>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <h1>DashBoard</h1>
            {/* <div className="pd-16">
              The dashboard is slated for future updates, and the construction
              of this page will leverage the Chart.js library for enhanced
              graphical representations and data visualization.
            </div> */}
            <AggregatedData />
            <div className="charts">
              <div className="line-chart card">
                <ActiveUsers mainContainerWidth={mainContainerWidth} />
              </div>

              <div className="line-chart">
                <div className="card">
                  <Orders mainContainerWidth={mainContainerWidth} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
