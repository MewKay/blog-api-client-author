import paths from "@/app/routes/paths";
import PostList from "@/features/post-list/post-list";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { Pencil } from "lucide-react";
import styles from "./home.module.css";
import ScrollButton from "@/components/scroll-button/scroll-button";
import useScrollButtonVisibility from "@/hooks/useScrollButtonVisibility";

const Home = () => {
  const { posts } = useLoaderData();
  const outletContext = useOutletContext();
  const scrollButtonVisibility = useScrollButtonVisibility();
  const { isLimitReached } = outletContext.limitStatus;

  const handleNewPostLink = (event) => {
    if (isLimitReached) {
      event.preventDefault();
    }
  };

  return (
    <main>
      <div className={styles.newPostContainer}>
        {isLimitReached && (
          <p className={styles.limitMessage}>
            You’ve reached the 5-post limit for guest accounts. Sign up to
            create more posts or delete an existing post to continue.
          </p>
        )}
        <Link
          to={paths.newBlogPost.path}
          className={styles.newPostLink}
          onClick={handleNewPostLink}
          aria-disabled={isLimitReached}
        >
          <Pencil />
          <p>CREATE NEW POST</p>
        </Link>
      </div>
      <PostList posts={posts} />
      <ScrollButton isVisible={scrollButtonVisibility} />
    </main>
  );
};

export default Home;
