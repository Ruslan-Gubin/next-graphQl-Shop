import { ALL_MOVIES } from "@/apps/apollo";
import styles from "@/apps/styles/pages/Home.module.scss";
import { ShopLayout } from "@/widgets/ShopLayout";
import { useQuery } from "@apollo/client";

export default function Home() {

  return (
    <ShopLayout title="OnlineShop" keywords="Start project in home page">
      <div data-testid="test-root-home" className={styles.root}>
       Index page
      </div>
    </ShopLayout>
  );
}


