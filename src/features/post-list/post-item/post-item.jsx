import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPostDate } from "./post-item.util";
import sqids from "@/lib/sqids";

const PostItem = ({ post }) => {
  const { id, title, preview, created_at, edited_at, is_published, slug } =
    post;
  const encodedId = sqids.encode(id);

  const postDate = formatPostDate(created_at);
  const postUpdateDate = formatPostDate(edited_at);
  const wasPostUpdated = created_at !== edited_at;

  return (
    <li>
      <Link to={`/posts/${encodedId}/${slug}`}>
        <h3>{title}</h3>
        <div>
          <p>Created : {postDate}</p>
          {wasPostUpdated && <p>&middot; Last Update : {postUpdateDate}</p>}
        </div>
        <p>{preview}</p>
        {is_published ? <p>✅️ Published</p> : <p>❎️ Unpublished</p>}
      </Link>
    </li>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    is_published: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default PostItem;
