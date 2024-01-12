import { useNavigate } from "react-router-dom";

import SectionHeader from "@/components/user/SectionHeader";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ReviewItem from "@/components/user/ReviewItem";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const bgGrey = { backgroundColor: "grey.300" };

const CurrentUserReview = ({ reviews, userId, productId }) => {
  const navigate = useNavigate();

  const currentUserReview = reviews.filter(
    (review) => review.userId.id === userId
  );

  return (
    <>
      {currentUserReview.length > 0 ? (
        <>
          <SectionHeader title="your review" />
          <ReviewItem reviewItem={currentUserReview[0]} productId={productId} />
        </>
      ) : (
        <>
          <Button
            size="small"
            variant="filled"
            endIcon={<ArrowForwardIosIcon />}
            fullWidth
            sx={{
              ...bgGrey,
              marginBottom: "1rem",
              ":hover": bgGrey,
            }}
            onClick={() => navigate(`create-review`)}
          >
            leave a review
          </Button>
          <Divider sx={{ marginBottom: "1rem" }} />
        </>
      )}
    </>
  );
};
export default CurrentUserReview;
