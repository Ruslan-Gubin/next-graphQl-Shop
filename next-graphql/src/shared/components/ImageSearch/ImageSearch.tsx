import styles from "./ImageSearch.module.scss";

const ImageSearch = ({ active }: { active: boolean }) => {
  return <div className={active ? styles.active : styles.image}></div>;
};

export { ImageSearch };
