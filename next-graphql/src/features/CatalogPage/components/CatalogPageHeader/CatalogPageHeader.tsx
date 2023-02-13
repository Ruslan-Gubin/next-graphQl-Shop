import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Ioption } from '@/apps/constants/optionsMenu';
import { DropDownCategory } from '@/shared/components';
import styles from './CatalogPageHeader.module.scss';

interface ICatalogPageHeader {
  value: string;
  href: string;
  countProduct: number;
  optionDepartment: Ioption[]
  label: string
}

const sortProductOption = [
  {value: 'По популярности', label: 'popular', property: {views: 1}},
  {value: 'По рейтингу', label: 'rating', property: {views: -1}},
  {value: 'По возростанию цены', label: 'min-price', property: {price: -1}},
  {value: 'По убыванию цены', label: 'max-price', property: {price: 1}},
  {value: 'По новинкам', label: 'new-product', property: {createdAt: -1}},
  {value: 'Сначало выгодные', label: 'discount', property: {discount: 1}},
]

const CatalogPageHeader: FC<ICatalogPageHeader> = ({value, href, countProduct, optionDepartment, label}) => {
  const [subDepartmentValue, setSubDepartmentValue] = useState({value: value, label: label})
  const [sortProduct, setSortProduct] = useState({value: sortProductOption[0].value, label: sortProductOption[0].label})
  // const [value]
  const router = useRouter()


  const handleLinkCategory = (value: {value: string, label: string}) => {
    setSubDepartmentValue(prev => ({value: value.value, label: value.label}))
    router.push(`/catalog/${href}/${value.label}`)
  }

  return (
    <section className={styles.root}>
    <nav>
      <ul className={styles.nav__container}>
        <li><Link href={'/'} className={styles.nav__item} >Главная</Link></li>
        <li><Link href={`/catalog/${href}`} className={styles.nav__item}>Канцтовары</Link></li>
        <li><p>{value}</p></li>
      </ul>
      <div className={styles.title__container}>
      <h1 className={styles.title}>{value}</h1>
      <small>{countProduct} товаров</small>
      </div>
    </nav>

<div className={styles.filter__container}>
    <DropDownCategory
    onChange={(value) => handleLinkCategory(value)}
    options={optionDepartment}
    value={subDepartmentValue}
    />
    <DropDownCategory
    onChange={(value) => setSortProduct({value: value.value, label: value.label} )}
    options={sortProductOption}
    value={sortProduct}
    />
    <DropDownCategory
    onChange={(value) => setSortProduct({value: value.value, label: value.label} )}
    options={sortProductOption}
    value={{value:'Категория', label: 'category'}}
    />
    <DropDownCategory
    onChange={(value) => setSortProduct({value: value.value, label: value.label} )}
    options={sortProductOption}
    value={{value:'Бренд', label: 'brand'}}
    />
   
    </div>
    </section>
  );
};

export { CatalogPageHeader };