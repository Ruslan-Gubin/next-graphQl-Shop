import { ImageSearch } from '../ImageSearch';
import Image from 'next/image';
import { ISearchProduct } from '../../../apps/types';

import styles from './SearchItemAutocomplete.module.scss';

interface ISearchItemAutocomplete {
  text: string
  productImg: string
  id: string
}

const SearchItemAutocomplete = ({text, productImg, id}: ISearchItemAutocomplete) => {

  return (
    <div onClick={() => console.log(id)} className={styles.root}>
      <div className={styles.imag}>
      <ImageSearch active={true}/>
      </div>
      <p>{text}</p>
      <Image width={30} height={30} src={productImg} alt="Product img" />
    </div>
  );
};

export { SearchItemAutocomplete };