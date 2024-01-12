import { useGetAllReviewsQuery } from "@/features/review/reviewSlice";
import { useParams } from "react-router-dom";
import { useDeleteReviewMutation } from "@/features/review/reviewSlice";

import Box from "@mui/material/Box";

// Internal components
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import ReviewItem from "@/components/user/ReviewItem";
import ErrorModal from "@/components/user/ErrorModal";

const Reviews = () => {
  const { productId } = useParams();
  const { data: reviews } = useGetAllReviewsQuery(productId);
  const { isError: isErrorDeleteReview, error: errorDeleteReview } =
    useDeleteReviewMutation()[1];

  return (
    <>
      {isErrorDeleteReview && (
        <ErrorModal
          error={errorDeleteReview}
          errorTitle="Cannot delete review!"
        />
      )}
      <Box sx={{ minHeight: "100vh" }}>
        <SecondaryTopNavigationBar
          returnPrevLink={`/store/${productId}`}
          label="Reviews"
        />
        {reviews && (
          <Box component="main" className="page">
            {reviews.map((review) => (
              <Box sx={{ padding: "0 1rem" }} key={review._id}>
                <ReviewItem reviewItem={review} productId={productId} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Reviews;
