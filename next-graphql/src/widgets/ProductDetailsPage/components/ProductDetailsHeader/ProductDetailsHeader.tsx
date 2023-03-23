import { FC } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { catalogPageAction } from '../../../../features';
import { Array, findMaxOpinion, StarsList } from '../../../../shared';
import { useDetailsContext } from '../../libs/context/detailsContext';

import styles from './ProductDetailsHeader.module.scss';


const ProductDetailsHeader: FC = () => {
  const {product, department, subDepartment} = useDetailsContext()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLink = (href: string) => {
    router.push(href)
  }

  return (
    <section className={styles.root}>
      <nav>
        <ul className={styles.nav__container}>
          <Array onClick={() => router.back()} derection='left'/>
          <li onClick={() => handleLink('/')} className={styles.link}>Главная</li>
          <li onClick={() => handleLink(`${department.href}`)} className={styles.link}>{department.name}</li>
        <li 
        className={styles.link}
        onClick={() => {
          dispatch(catalogPageAction.setCategoryValue({ value: "Категория", label: "Категория", id: "" }))
          handleLink(`${department.href}/${subDepartment.href}`)
        }}
        >{subDepartment.name}</li>
         <li onClick={() => handleLink(`/brands/${product.brand._id}`)} className={styles.last__link}>{product.brand.name}</li>
        </ul>
      </nav>
      <h1 className={styles.title}>{product.brand.name} / {product.name}</h1>

        <div className={styles.info__container}>
          <StarsList count={findMaxOpinion(product.feedbacks)}/>
          <a href='#feedback-header' className={styles.reviews}>{product.feedbacks.length} отзыва</a>
          <p className={styles.index}>Индекс: <span>{product._id}</span></p>
          <p className={styles.index}>Купили более {5900}  раз</p>
        </div>
    </section>
  );
};

export { ProductDetailsHeader };