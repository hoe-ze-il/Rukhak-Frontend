import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectCurrentUserId,
  selectCurrentUserRole,
} from "@/features/auth/authSlice";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreHoriz";

const minHeight5 = { minHeight: "2.5rem" };

const CommentItemMenu = ({
  comment,
  anchorEl,
  setAnchorEl,
  handleClickDeleteComment,
  setIsEditing,
}) => {
  const userId = useSelector(selectCurrentUserId);
  const userRole = useSelector(selectCurrentUserRole);

  const { commentId } = useParams();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    handleClose();
    if (comment?.parent && !commentId) {
      navigate(comment?.parent);
      return;
    }
    setIsEditing(true);
  };

  return (
    <Box>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0 }}
      >
        <MoreIcon />
      </IconButton>
      {userId === comment?.author?._id || userRole === "Admin" ? (
        <Menu
          id="positioned-menu"
          aria-labelledby="positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClickEdit} sx={minHeight5}>
            <Typography variant="caption">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleClickDeleteComment} sx={minHeight5}>
            <Typography variant="caption">Delete</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={minHeight5} disabled>
            <Typography variant="caption">Report</Typography>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="positioned-menu"
          aria-labelledby="positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose} sx={minHeight5}>
            <Typography variant="caption">Report</Typography>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default CommentItemMenu;
