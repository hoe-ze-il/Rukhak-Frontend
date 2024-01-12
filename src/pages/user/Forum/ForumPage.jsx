import PostList from "./posts/PostList";
import { Route, Routes } from "react-router-dom";
import Profile from "./profile/Profile";
import PostEditor from "./posts/PostEditor";

const ForumPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new-post" element={<PostEditor />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default ForumPage;
