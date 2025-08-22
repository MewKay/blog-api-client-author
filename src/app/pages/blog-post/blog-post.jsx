import ROUTES_PATH from "@/app/routes/path";
import { Link } from "react-router-dom";

const BlogPost = () => {
  return (
    <main>
      <Link to={ROUTES_PATH.home}>{"<--"} Back to post list</Link>This is blog
      post page
    </main>
  );
};

export default BlogPost;
