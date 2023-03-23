import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../../../features";
import { Heart, QueckMessage, useQuickMessage } from "../../../../shared";
import { useDetailsContext } from "../../../../widgets/ProductDetailsPage/libs/context/detailsContext";
import { checkFavorite } from "../../lib/helpers/checkFavorite";

import styles from './ProductCardMobileHeards.module.scss';


const ProductCardMobileHeardsF: FC = () => {
  const { handleChangeState, status, text } = useQuickMessage()
  const { handleAddFavorites, handleRemoveFavorites, product } = useDetailsContext()
  const { favorites } = useSelector(selectFavorites)

  const addFavorites = () => {
    handleAddFavorites()
    handleChangeState('Товар добавлен в избранное')
  }

  const removeFavorites = () => {
    handleRemoveFavorites()
    handleChangeState('Товар удален из избранного')
  }

  return (
    <div className={styles.heards}>
      <QueckMessage active={status} message={text} />
      <Heart active={checkFavorite(favorites, product)} removeFavorites={removeFavorites} handleAddFavorite={addFavorites} />
    </div>
  );
};

export const ProductCardMobileHeards  = memo(ProductCardMobileHeardsF);