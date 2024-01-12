import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useGetAllFollowingQuery } from "@/features/api/follow.api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import UserCard from "@/components/user/forum/UserCard";
import NoContentPage from "../NoContentPage";

export default function Following({ userId }) {
  const { data, isLoading } = useGetAllFollowingQuery(
    { userId },
    {
      skip: userId ? false : true,
    }
  );

  console.log(data?.data, userId);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (data.data.length === 0) {
    return <NoContentPage context={"following"} />;
  }
  return (
    <List
      dense
      sx={{ width: "100%", bgcolor: "background.paper", borderRadius: "8px" }}
    >
      {data?.data.map((user) => {
        return (
          <ListItem key={user._id} disablePadding>
            <UserCard author={user.targetId} />
          </ListItem>
        );
      })}
    </List>
  );
}
