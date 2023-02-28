import { ImageSearch } from '../ImageSearch';

import styles from './SearchItemAutocomplete.module.scss';

interface ISearchItemAutocomplete {
  text: string
  productImg: string
  id: string
  onClick: (value: string) => void
}

const SearchItemAutocomplete = ({text, productImg, id, onClick}: ISearchItemAutocomplete) => {

  return (
    <div onClick={() => console.log(id)} className={styles.root}>
    {/* <div onClick={() => onClick(id)} className={styles.root}> */}
      <div className={styles.imag}>
      <ImageSearch active={true}/>
      </div>
      <p>{text}</p>
      <img src={productImg} alt="Product img" />
    </div>
  );
};

export { SearchItemAutocomplete };