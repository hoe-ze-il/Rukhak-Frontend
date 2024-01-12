import { createContext, useState } from "react";

const ReviewContext = createContext();

function ReviewContextProvider({ children }) {
  const [reviewData, setReviewData] = useState();

  return (
    <ReviewContext.Provider value={{ setReviewData, reviewData }}>
      {children}
    </ReviewContext.Provider>
  );
}

export { ReviewContext, ReviewContextProvider };
