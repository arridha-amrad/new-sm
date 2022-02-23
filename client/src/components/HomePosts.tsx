import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostCard from "../features/post/PostCard";
import { getPostsAction, selectPostState } from "../features/post/postSlice";

const HomePosts = () => {
  const [isMounted, setIsMounted] = useState(true);
  const { posts } = useAppSelector(selectPostState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMounted) {
      dispatch(getPostsAction());
    }
    return () => setIsMounted(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={post._id} post={post} stateIndex={index} />
      ))}
    </>
  );
};

export default HomePosts;
