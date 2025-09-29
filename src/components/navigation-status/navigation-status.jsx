import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import styles from "./navigation-status.module.css";

const NavigationStatus = () => {
  const { state } = useNavigation();
  const [lastShownMessage, setLastShowMessage] = useState("Idle");
  const [alertClass, setAlertClass] = useState(styles.hidden);

  useEffect(() => {
    switch (state) {
      case "idle":
        setAlertClass(styles.hidden);
        break;
      case "loading":
        setAlertClass(styles.visible);
        setLastShowMessage("Loading");
        break;
      case "submitting":
        setAlertClass(styles.visible);
        setLastShowMessage("Submitting");
        break;
    }
  }, [state]);

  return (
    <div className={alertClass}>
      <p>{lastShownMessage}</p>
      <LoaderPinwheel />
    </div>
  );
};

export default NavigationStatus;
