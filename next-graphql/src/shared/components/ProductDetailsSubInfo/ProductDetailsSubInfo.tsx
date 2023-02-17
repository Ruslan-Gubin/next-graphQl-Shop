import { useDetailsContext } from '@/pages/catalog/[id]';
import Link from 'next/link';
import styles from './ProductDetailsSubInfo.module.scss';

const ProductDetailsSubInfo = () => {
  const {product} = useDetailsContext()


  return (
    <section className={styles.root}>
      {product.colors_names !== 'Цвет не указан' &&
      <p><span className={styles.color}>Цвет:</span><small className={styles.color__name}>{product.colors_names}</small></p>
      }
      
        <ul className={styles.additional__info}>
          <h2 className={styles.additional__title}>Дополнительная информафия</h2>
          {product.options.map(option => (
            <li className={styles.additional__option_item}>
              <div className={styles.key__container}>
              <p className={styles.key__option}>{option.name}</p>
              </div>
              <p className={styles.value__option}>{option.value}</p>
            </li>
          ))}
          <a className={styles.all__additional} href="#all-additation">Все характеристики</a>
        </ul>

        <Link href={`/brands/${product.brand._id}`} className={styles.all__product_brand}>
        <p>Все товары {product.brand.name}</p>
<span className={styles.array}></span>
        </Link>

        <figure>
          <Link href={`/brands/${product.brand._id}`}>
          <img className={styles.brand__image} src={product.brand.image.url} alt="Brand imag" />
          </Link>
        </figure>
      
    </section>
  );
};

export { ProductDetailsSubInfo };