import { FC } from 'react';
import { Ioption } from '@/apps/constants/optionsMenu';
import { CatalogPageFooter } from '../CatalogPageFooter';
import { CatalogPageHeader } from '../CatalogPageHeader';
import { CatalogProductList } from '../CatalogProductList/CatalogProductList';

import styles from './CatalogPage.module.scss';

interface ICatalogPage {
href: string;
value: string;
countProduct: number;
optionDepartment: Ioption[]
label: string;
}

const CatalogPage: FC<ICatalogPage> = ({href, value, countProduct, optionDepartment, label}) => {


  return (
    <div className={styles.root}>
    <CatalogPageHeader label={label}  value={value} href={href} countProduct={countProduct} optionDepartment={optionDepartment}/>
    <CatalogProductList />
    <CatalogPageFooter />
    </div>
  );
};

export { CatalogPage };