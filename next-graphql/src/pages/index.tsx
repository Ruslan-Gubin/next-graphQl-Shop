import styles from "@/app/styles/pages/Home.module.scss";
import { ShopLayout } from "@/widgets/ShopLayout";

export default function Home() {
  return (
    <ShopLayout title="Home page" keywords="Start project in home page">
      <div data-testid="test-root-home" className={styles.root}>
       
       
     
      </div>
    </ShopLayout>
  );
}


