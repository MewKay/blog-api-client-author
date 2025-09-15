import { useNavigate } from "react-router-dom";
import Button from "@/components/button/button";
import paths from "@/app/routes/paths";
import styles from "@/styles/components/error-page.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.errorMain}>
      <h3 className={styles.errorTitle}>Page not found</h3>
      <p className={styles.errorText}>
        The page you are looking for does not exist.
      </p>
      <div className={styles.buttonContainer}>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button onClick={() => navigate(paths.home.path)}>Go Home</Button>
      </div>
    </main>
  );
};

export default NotFound;
