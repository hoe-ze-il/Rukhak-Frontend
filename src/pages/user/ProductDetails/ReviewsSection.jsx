import React from "react";
import SectionHeader from "@/components/user/SectionHeader";
import ReviewItem from "@/components/user/ReviewItem";

const ReviewsSection = ({ productId, reviews }) => {
  return (
    <>
      <SectionHeader
        title="reviews"
        link={reviews.length > 0 ? `reviews` : null}
      />
      {reviews?.slice(0, 5).map((review) => (
        <React.Fragment key={review._id}>
          <ReviewItem reviewItem={review} productId={productId} />
        </React.Fragment>
      ))}
    </>
  );
};

export default ReviewsSection;
