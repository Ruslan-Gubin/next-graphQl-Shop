import { memo } from "react";
import styles from "./ImageSearch.module.scss";

const ImageSearchF = ({ active }: { active: boolean }) => {
  return <div className={active ? styles.active : styles.image}></div>;
};

export const  ImageSearch = memo(ImageSearchF);
