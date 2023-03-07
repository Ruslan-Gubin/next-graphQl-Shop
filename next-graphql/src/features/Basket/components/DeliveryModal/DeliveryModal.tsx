import { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { basketAction } from "../../store/basketSlice";
import { useBasketContext } from "../../libs/context/BasketContext";
import { ModalInput } from "../../../../shared";

import styles from "./DeliveryModal.module.scss";

const DeliveryModal = () => {
  const {  setModalActive } = useBasketContext();
  const dispatch = useDispatch()
  const [formValue, setFormValue] = useState({
    street: "",
    flat: "",
    privateHome: false,
    entrance: "",
    intercom: "",
    floor: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(basketAction.setAddressBuyer({value: formValue}))
    setFormValue(() => ({
    street: "",
    flat: "",
    privateHome: false,
    entrance: "",
    intercom: "",
    floor: "",
    }))
    setModalActive(false)
  };

  const checkFormValid = () => {
    if (formValue.street !== '' && formValue.flat !== '' && formValue.privateHome) {
      return true;
    }
    if (formValue.street !== '' && formValue.flat !== '' && formValue.entrance && formValue.intercom && formValue.floor) {
      return true;
    }
    return false
  };

  return (
    <section className={styles.root}>
      <button className={styles.header__button}>Курьером</button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ModalInput
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, street: value }))
          }
          label="Улица"
          value={formValue.street}
          placeholder={"ул."}
        />
        <section className={styles.street__container}>
          <ModalInput
            onChange={(value) =>
              setFormValue((prev) => ({ ...prev, flat: value }))
            }
            width={200}
            label="Квартира / офис"
            value={formValue.flat}
            placeholder={"Номер"}
          />
          <div
            onClick={() =>
              setFormValue((prev) => ({
                ...prev,
                privateHome: !prev.privateHome,
              }))
            }
            className={
              formValue.privateHome ? styles.shecked__active : styles.shecked
            }
          >
            <div className={styles.checked__bird}></div>
            <p>Частный дом</p>
          </div>
        </section>
        <section className={styles.sub__info}>
          <h3>Доп. информация для курьера</h3>
          <div className={styles.sub__info_container}>
            <ModalInput
              width={120}
              label="Подъезд"
              placeholder="Номер"
              value={formValue.entrance}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, entrance: value }))
              }
            />
            <ModalInput
              width={120}
              label="Домофон"
              placeholder="Номер"
              value={formValue.intercom}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, intercom: value }))
              }
            />
            <ModalInput
              width={120}
              label="Этаж"
              placeholder="Номер"
              value={formValue.floor}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, floor: value }))
              }
            />
          </div>
        </section>

        {checkFormValid() ? (
          <button type="submit" className={styles.footer__button_active}>
            Подтвердить адрес доставки
          </button>
        ) : (
          <button type="button" className={styles.footer__button}>
            Подтвердить адрес доставки
          </button>
        )}
      </form>
    </section>
  );
};

export { DeliveryModal };
