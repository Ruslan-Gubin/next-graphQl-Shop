import { useDispatch  } from "react-redux";
import { burgerLayoutAction } from "../../lib/store/burgerLayoutSlice";
import { LayoutBurgerButton } from "../LayoutBurgerButton";


const LayoutHeaderBurger = () => {
  const dispatch = useDispatch()

  const handleBurgerClick = () => {
    dispatch(burgerLayoutAction.asideLayoutToggle())
  }

  return (
    <div>
      <LayoutBurgerButton onClick={handleBurgerClick}/>
    </div>
  );
};

export  { LayoutHeaderBurger };