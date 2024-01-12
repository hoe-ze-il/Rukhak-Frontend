import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { useSelector } from "react-redux";

function AggregatedData() {
  const iconSize = { fontSize: 48 };
  const aggregatedData = useSelector(
    (state) =>
      state.api.queries["getAnalytics(undefined)"]?.data?.aggregatedData
  );

  return (
    <div className="meta-data">
      <div className="data-cards card">
        <div className="descriptions">
          <h2>{aggregatedData?.totalAccounts}</h2>
          <h3>Accounts</h3>
        </div>
        <div className="icons">
          <PeopleAltOutlinedIcon sx={iconSize} />
        </div>
      </div>
      <div className="data-cards card">
        <div className="descriptions">
          <h2>{aggregatedData?.totalProducts}</h2>
          <h3>Products</h3>
        </div>
        <div className="icons">
          <YardOutlinedIcon sx={iconSize} />
        </div>
      </div>
      <div className="data-cards card">
        <div className="descriptions">
          <h2>{`$ ${parseInt(aggregatedData?.totalRevenue)}`}</h2>
          <h3>Revenue</h3>
        </div>
        <div className="icons">
          <PaidOutlinedIcon sx={iconSize} />
        </div>
      </div>
    </div>
  );
}

export default AggregatedData;
