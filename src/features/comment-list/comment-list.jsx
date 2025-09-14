import PropTypes from "prop-types";
import CommentItem from "./comment-item/comment-item";
import styles from "./comment-list.module.css";
import itemStyles from "./comment-item/comment-item.module.css";
import { useEffect, useRef, useState } from "react";

const createCommentActiveList = (comments) => {
  const list = [];

  for (let index = 0; index < comments.length; index++) {
    list.push(false);
  }

  return list;
};

const CommentList = ({ comments }) => {
  const [commentActiveList, setCommentActiveList] = useState(
    createCommentActiveList(comments),
  );
  const listRef = useRef();

  useEffect(() => {
    const { current } = listRef;
    const activeClass = itemStyles.active;
    const commentItems = current.querySelectorAll("li");

    commentItems.forEach((commentItem, index) => {
      const isCommentActive = commentActiveList[index];

      if (isCommentActive) {
        commentItem.classList.add(activeClass);
      } else {
        commentItem.classList.remove(activeClass);
      }
    });
  }, [commentActiveList]);

  const handleActiveComment = (activeCommentIndex) => {
    const newCommentActiveList = commentActiveList.map(
      (isCommentActive, commentIndex) =>
        activeCommentIndex === commentIndex ? !isCommentActive : false,
    );

    setCommentActiveList(newCommentActiveList);
  };

  return (
    <ul ref={listRef} className={styles.commentList}>
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onClick={() => handleActiveComment(index)}
        />
      ))}
    </ul>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
