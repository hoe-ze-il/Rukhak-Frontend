import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useGetAllFollowingQuery } from "@/features/api/follow.api";
import { useState, useEffect, useMemo } from "react";
import FollowBtn from "./FollowBtn";
import { useSelector } from "react-redux";
import {
  selectCurrentUserId,
  selectCurrentUserRole,
} from "@/features/auth/authSlice";
import { Box } from "@mui/material";
import { useDeletePostMutation } from "@/features/api/post.api";
import { useNavigate } from "react-router-dom";

const UserCard = ({ author, postId }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => selectCurrentUserId(state));
  const [deletePost] = useDeletePostMutation();
  const userRole = useSelector(selectCurrentUserRole);
  const [isFollowed, setIsFollowed] = useState(true);
  const { data: following, isLoading: isLoadingFollowingList } =
    useGetAllFollowingQuery({
      userId,
    });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    setAnchorEl(false);
    Swal.fire({
      title: "Delete Post",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#BF3131",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.value) {
        deletePost(postId);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Task has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  useEffect(() => {
    if (!isLoadingFollowingList && userId !== author._id) {
      const isFollowing = following.data?.find(
        (net) => net.targetId._id === author._id
      );

      setIsFollowed(isFollowing);
    }
  }, [isLoadingFollowingList, following, userId, author._id]);

  const memoizedAuthor = useMemo(
    () => `${author.firstName} ${author.lastName}`,
    [author]
  );
  if (author?.imageURL) console.log(author.imageURL);
  return (
    <CardHeader
      sx={{ width: "100%" }}
      avatar={
        <Button onClick={() => navigate(`/forum/profile`, { state: author })}>
          {author.imageURL ? (
            <Avatar src={author.imageURL} aria-label="author" />
          ) : (
            <Avatar aria-label="author">{memoizedAuthor[0]}</Avatar>
          )}
        </Button>
      }
      action={
        <Box>
          <IconButton
            aria-label="settings"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          {userRole == "admin" || userId === author._id ? (
            <Menu
              id="basic-menu"
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
            </Menu>
          ) : (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
          )}
        </Box>
      }
      title={`${memoizedAuthor}`}
      subheader={
        !isFollowed ? <FollowBtn userId={userId} targetId={author._id} /> : null
      }
    />
  );
};
export default UserCard;
