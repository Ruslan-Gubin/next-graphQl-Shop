import { ShopLayout } from "@/widgets/ShopLayout";
import styles from "@/apps/styles/pages/Home.module.scss";


export default function Home() {

  return (
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <div data-testid="test-root-home" className={styles.root}>
       Index page
      </div>
    </ShopLayout>
  );
}


