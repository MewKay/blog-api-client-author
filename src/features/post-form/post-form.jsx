import Button from "@/components/button/button";
import Input from "@/components/input/input";
import ranges from "@/lib/validation/ranges";
import postSchema from "@/lib/validation/schema/post-schema";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { NotebookPen, PencilLine, Trash } from "lucide-react";
import styles from "./post-form.module.css";

const PostForm = ({ postToEdit = null }) => {
  const checkBoxRef = useRef();
  const navigate = useNavigate();

  const [titleValue, setTitleValue] = useState(postToEdit?.title || "");
  const [postTextValue, setPostTextValue] = useState(postToEdit?.text || "");

  useEffect(() => {
    if (postToEdit) {
      checkBoxRef.current.checked = postToEdit.is_published;
    }
  }, [postToEdit]);

  const handleCancelClick = () => {
    return navigate(-1);
  };

  const { errors, isFormValid } = postSchema.validateInputs({
    title: titleValue,
    text: postTextValue,
  });

  const isPostTextNotEmpty = postTextValue !== "";

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
        value={titleValue}
        setValue={setTitleValue}
        minLength={ranges.postTitle.min}
        maxLength={ranges.postTitle.max}
        errorMessage={errors.title}
        required
      >
        Title
      </Input>

      <div className={styles.textInput}>
        <label>
          Content
          <textarea
            name="text"
            placeholder="Write your post here..."
            value={postTextValue}
            onChange={(event) => setPostTextValue(event.target.value)}
            minLength={ranges.postText.min}
            maxLength={ranges.postText.max}
            required
          />
        </label>
        <p>{isPostTextNotEmpty && errors.text}</p>
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
          <Button
            className={styles.submitButton}
            colorScheme={"dark"}
            disabled={!isFormValid}
          >
            <PencilLine />
            Create Post
          </Button>
        ) : (
          <>
            <Button
              className={styles.submitButton}
              colorScheme={"dark"}
              disabled={!isFormValid}
              name="intent"
              value="update"
            >
              <NotebookPen />
              Update Post
            </Button>
            <Button
              className={styles.submitButton}
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
