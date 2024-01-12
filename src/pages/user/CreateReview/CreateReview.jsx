import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import LoadingButton from "@mui/lab/LoadingButton";

// Internal components
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import { useCreateReviewMutation } from "@/features/review/reviewSlice";
import ErrorModal from "@/components/user/ErrorModal";

const mb2 = { marginBottom: "1rem" };
const mb1 = { marginBottom: "0.5rem" };

const CreateReview = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const { productId } = useParams();
  const [createReview, { isError, error, isLoading }] =
    useCreateReviewMutation();

  const navigate = useNavigate();

  const headerSettings = {
    variant: "subtitle1",
    fontWeight: "medium",
    textTransform: "capitalize",
  };

  const handleSubmit = async () => {
    try {
      await createReview({ rating, review, productId }).unwrap();

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
        label="Create Review"
      />
      <Box component="main" sx={{ padding: "1rem" }}>
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
            startIcon
            loading={isLoading}
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
            onClick={handleSubmit}
            disabled={review ? false : true}
          >
            create review
          </LoadingButton>
        </Box>
      </Box>
      {isError && (
        <ErrorModal
          isError={isError}
          error={error}
          errorTitle="Could not create a review!"
        />
      )}
    </Box>
  );
};

export default CreateReview;
