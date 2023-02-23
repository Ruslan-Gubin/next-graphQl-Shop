import { UserFavorites } from "@/features";
import { LKHeader } from "@/shared";
import { ShopLayout } from "@/widgets";


const Favorites = () => {
  return (
    <ShopLayout title='Избранное' keywords='Избранное'>
      <LKHeader />
      <UserFavorites />
    </ShopLayout>
  );
};

export default Favorites;