import { useGetAllCommentsQuery } from "@/features/api/comment.api";
import List from "@mui/material";
import CommentCard from "@/components/user/forum/CommentCard";

const CommentList = () => {
  const [data, isLoading, isError] = useGetAllCommentsQuery();
  const handleOnClick = () => {};
  if (data) {
    return (
      <List>
        {data.map((comment) => {
          return <CommentCard key={comment._id} data={comment} />;
        })}
      </List>
    );
  }
  if (isLoading) {
    return <h1>Data Loading...</h1>;
  }
  if (isError) {
    return <h1>Something went wrong</h1>;
  }
};

export default CommentList;
