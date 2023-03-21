import { ShopLayout } from "../widgets";
import { HomePage } from "../widgets";

import styles from "../apps/styles/pages/Home.module.scss";

export default function Home() {
  return (
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <section data-testid="test-root-home" className={styles.root}>
        <HomePage />
      </section>
    </ShopLayout>
  );
}
