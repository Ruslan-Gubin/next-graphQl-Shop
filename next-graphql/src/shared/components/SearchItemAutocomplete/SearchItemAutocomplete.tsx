import { ImageSearch } from '../ImageSearch';

import styles from './SearchItemAutocomplete.module.scss';

interface ISearchItemAutocomplete {
  text: string
}

const SearchItemAutocomplete = ({text}: ISearchItemAutocomplete) => {
  return (
    <div className={styles.root}>
      <div className={styles.imag}>
      <ImageSearch active={true}/>
      </div>
      <p>{text}</p>
    </div>
  );
};

export { SearchItemAutocomplete };