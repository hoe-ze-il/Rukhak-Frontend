import Box from "@mui/material/Box";

const CommentItemMedia = ({ comment }) => {
  return (
    <>
      {comment.signedMedia && (
        <Box
          sx={{
            margin: "0.5rem 0",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          <img className="image" src={comment.signedMedia} alt="image" />
        </Box>
      )}
    </>
  );
};

export default CommentItemMedia;
