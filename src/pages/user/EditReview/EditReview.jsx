import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import LoadingButton from "@mui/lab/LoadingButton";

// Internal components
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import { useEditReviewMutation } from "@/features/review/reviewSlice";
import ErrorModal from "@/components/user/ErrorModal";
import { ReviewContext } from "@/contexts/user/ReviewContext";

const mb2 = { marginBottom: "1rem" };
const mb1 = { marginBottom: "0.5rem" };

const EditReview = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { reviewData } = useContext(ReviewContext);
  const [rating, setRating] = useState(reviewData?.rating);
  const [review, setReview] = useState(reviewData?.review);
  const [editReview, { isError, error, isLoading }] = useEditReviewMutation();

  useEffect(() => {
    if (!reviewData) navigate(`/store/${productId}`);
  }, []);

  const headerSettings = {
    variant: "subtitle1",
    fontWeight: "medium",
    textTransform: "capitalize",
  };

  const handleEdit = async () => {
    try {
      await editReview({
        rating,
        review,
        productId,
        reviewId: reviewData.id,
      }).unwrap();
      navigate(`/store/${productId}`);
      setTimeout(() => {
        const sectionElement = document.getElementById("user-review");
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <SecondaryTopNavigationBar
        returnPrevLink={`/store/${productId}`}
        label="Edit Review"
      />
      <Box component="main" sx={{ padding: "0.5rem" }}>
        <Box component="form">
          <Box sx={mb2}>
            <Typography {...headerSettings} sx={mb1}>
              rating
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Rating
                defaultValue={3}
                size="large"
                name="simple-controlled"
                value={rating || 1}
                onChange={(event, newValue) => {
                  setRating(newValue || 1);
                }}
              />
              <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
                {rating}
              </Typography>
            </Box>
          </Box>

          <Box sx={mb2}>
            <Typography {...headerSettings} sx={mb1}>
              review
            </Typography>
            <TextField
              required={true}
              placeholder="Say something..."
              variant="outlined"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
              multiline
              rows={8}
              focused={false}
            />
          </Box>

          <LoadingButton
            loading={isLoading}
            startIcon
            loadingPosition="start"
            size="large"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              ":hover": {
                backgroundColor: "secondary.main",
                color: "text.primary",
              },
            }}
            onClick={handleEdit}
            disabled={review ? false : true}
          >
            save
          </LoadingButton>
        </Box>
      </Box>
      {isError && (
        <ErrorModal
          isError={isError}
          error={error}
          errorTitle="Cannot update the review!"
        />
      )}
    </Box>
  );
};

export default EditReview;
