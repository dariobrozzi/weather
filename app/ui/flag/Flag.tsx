import styles from "./Flag.module.css";

const Flag = ({ code }: { code: string }) => {
  if (!code) throw new Error("Flag code is required");

  return (
    <span
      style={{ backgroundImage: `url(./flags/${code.toLowerCase()}.svg)` }}
      className={`${styles.flag} `}
    ></span>
  );
};

export default Flag;
