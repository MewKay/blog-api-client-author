import { NotepadText } from "lucide-react";
import styles from "./no-post.module.css";

const NoPost = () => {
  return (
    <div className={styles.container}>
      <NotepadText className={styles.icon} />
      <p className={styles.noPostMessage}>
        There is no post yet. Let&apos;s write some !
      </p>
    </div>
  );
};

export default NoPost;
