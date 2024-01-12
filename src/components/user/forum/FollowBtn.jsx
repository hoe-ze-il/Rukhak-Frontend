import { useFollowMutation } from "@/features/api/follow.api";
import Button from "@mui/material/Button";

const FollowBtn = ({ userId, targetId }) => {
  const [follow] = useFollowMutation();
  const handleFollow = (e) => {
    e.preventDefault();
    follow({ userId, targetId });
  };
  return (
    <Button
      variant="text"
      size="small"
      sx={{
        padding: "0",
        fontSize: "11px",
        justifyContent: "flex-start",
      }}
      onClick={handleFollow}
    >
      Follow
    </Button>
  );
};
export default FollowBtn;
