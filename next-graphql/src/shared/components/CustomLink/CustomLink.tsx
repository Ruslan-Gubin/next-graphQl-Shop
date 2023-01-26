import Link from "next/link";
import { FC } from "react";

import styles from './CustomLink.module.scss';

interface ICustomLink {
  href: string;
  name: string;
}

const CustomLink: FC<ICustomLink> = ({ href, name }) => {
  return (
    <Link href={href} >
      <span className={styles.linkName}>{name}</span> 
    </Link>
  );
};

export { CustomLink };
