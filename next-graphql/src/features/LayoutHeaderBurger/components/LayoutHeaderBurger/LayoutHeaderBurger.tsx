import { useDispatch } from "react-redux";
import { burgerLayoutAction } from "../../models/burgerLayoutShop";
import { LayoutBurgerButton } from "../LayoutBurgerButton";


const LayoutHeaderBurger = () => {
  const dispatch = useDispatch()

  const handleBurgerClick = () => {
    dispatch(burgerLayoutAction.setActiveToggle())
  }

  return (
    <div>
      <LayoutBurgerButton onClick={handleBurgerClick}/>
    </div>
  );
};

export  { LayoutHeaderBurger };