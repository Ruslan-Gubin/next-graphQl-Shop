import { ImageSearch } from '../ImageSearch';

import styles from './SearchItemAutocomplete.module.scss';

interface ISearchItemAutocomplete {
  text: string
  productImg: string
  id: string
}

const SearchItemAutocomplete = ({text, productImg, id}: ISearchItemAutocomplete) => {

  return (
    <div onClick={() => {}} className={styles.root}>
      <div className={styles.imag}>
      <ImageSearch active={true}/>
      </div>
      <p>{text}</p>
      <picture>
      <img width={30} height={30} src={productImg} alt="Product img" />
      </picture>
    </div>
  );
};

export { SearchItemAutocomplete };