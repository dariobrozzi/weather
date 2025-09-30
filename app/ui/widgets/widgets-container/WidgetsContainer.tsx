import styles from "./WidgetsContainer.module.css";

const WidgetsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.widgets}>{children}</div>
    </div>
  );
};

export default WidgetsContainer;
