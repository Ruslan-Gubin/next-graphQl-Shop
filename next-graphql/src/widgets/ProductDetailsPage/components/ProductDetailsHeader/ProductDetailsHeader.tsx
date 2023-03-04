import { FC } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { catalogPageAction } from '../../../../features';
import { Array, findMaxOpinion, StarsList } from '../../../../shared';
import styles from './ProductDetailsHeader.module.scss';
import { useDetailsContext } from '../../libs/context/detailsContext';


const ProductDetailsHeader: FC = () => {
  const {product, department, subDepartment} = useDetailsContext()
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <section className={styles.root}>
      <nav>
        <ul className={styles.nav__container}>
          <Array onClick={() => router.back()} derection='left'/>
          <Link href={'/'}>
          <li className={styles.link}>Главная</li>
          </Link>
          <Link href={`${department.href}`}>
          <li className={styles.link}>{department.name}</li>
          </Link>
          <Link href={`${department.href}/${subDepartment.href}`}>
        <li 
        className={styles.link}
        onClick={() => dispatch(catalogPageAction.setCategoryValue({
          value: "Категория", label: "Категория", id: ""
        }))}
        >{subDepartment.name}</li>
          </Link>
          <Link href={`/brands/${product.brand._id}`}>
         <li className={styles.last__link}>{product.brand.name}</li>
          </Link>
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