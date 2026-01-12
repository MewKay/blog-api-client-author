import Button from "@/components/button/button";
import Input from "@/components/input/input";
import ranges from "@/lib/validation/ranges";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import { NotebookPen, PencilLine, Trash } from "lucide-react";
import styles from "./post-form.module.css";
import Editor from "@/components/editor/editor";

const PostForm = ({ postToEdit = null }) => {
  const editorRef = useRef(null);
  const checkBoxRef = useRef(null);
  const navigate = useNavigate();
  const initialPostTitle = postToEdit?.title || "";
  const initialPostText = postToEdit?.text || "";

  useEffect(() => {
    if (postToEdit) {
      checkBoxRef.current.checked = postToEdit.is_published;
    }
  }, [postToEdit]);

  const handleCancelClick = () => {
    return navigate(-1);
  };

  const confirmMessage =
    "Are you sure to delete this post and all of its comments ? This action is irreversible.";
  const handleConfirmDelete = (event) => {
    if (!window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  };

  return (
    <Form className={styles.form} method={postToEdit ? "PUT" : "POST"}>
      <Input
        className={styles.titleInput}
        type="text"
        name="title"
        value={initialPostTitle}
        minLength={ranges.postTitle.min}
        maxLength={ranges.postTitle.max}
        required
      >
        Title
      </Input>

      <div className={styles.textInput}>
        <label>Content</label>
        <Editor ref={editorRef} initialContent={initialPostText} />
      </div>

      <Input
        className={styles.publishInput}
        ref={checkBoxRef}
        type="checkbox"
        name="is_published"
        value="true"
        setValue={() => {}}
      >
        Publish the post ?
      </Input>

      <div className={styles.buttonContainer}>
        <Button type="reset" onClick={handleCancelClick}>
          Cancel
        </Button>
        {!postToEdit ? (
          <Button className={styles.submitButton} colorScheme={"dark"}>
            <PencilLine />
            Create Post
          </Button>
        ) : (
          <>
            <Button
              className={styles.submitButton}
              colorScheme={"dark"}
              name="intent"
              value="update"
            >
              <NotebookPen />
              Update Post
            </Button>
            <Button
              className={styles.deleteButton}
              colorScheme={"dark"}
              name="intent"
              value="delete"
              onClick={handleConfirmDelete}
            >
              <Trash />
              Delete Post
            </Button>
          </>
        )}
      </div>
    </Form>
  );
};

PostForm.propTypes = {
  postToEdit: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    is_published: PropTypes.bool,
  }),
};

export default PostForm;
