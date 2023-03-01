import { Dispatch, FC, SetStateAction,  useState } from 'react';
import { SEARCH_PRODUCTS } from '../../../../apps/apollo/productRequest';
import { CloseProductButton, LoaderShop } from '../../../../shared';
import { useQuery } from '@apollo/client';
import { ISearchProduct } from '../../../../apps/types';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './LayoutSearchMobile.module.scss';


interface ILayoutSearchMobile {
  setSearchMobileModal: Dispatch<SetStateAction<boolean>>
}

const LayoutSearchMobile: FC<ILayoutSearchMobile> = ({setSearchMobileModal}) => {
  const [input, setInput] = useState<string>('')
  const {data, loading} = useQuery<{searchProducts:ISearchProduct[]}>(SEARCH_PRODUCTS, {
    variables: {
      searchValue: input.length > 2 ? input : 'adfsfeasdfg'
    }
  })
  const router = useRouter()

  const handleNavClick = (id: string) => {
    router.push(`/catalog/${id}`)
    setSearchMobileModal(false)
  } 

  return (
    <div className={styles.root}>
      {loading && 
      <LoaderShop />
      }
      <>
      <section className={styles.header}>
        <input className={styles.header__input} type="text" value={input} onChange={(e) => setInput(e.target.value)} />
   {input.length > 0 && <div className={styles.header__cancel_input}>
     <CloseProductButton onClick={() => setInput('')}/>
    </div>}
      <button title='Закрыть' className={styles.header__close_btn} onClick={() => setSearchMobileModal(false)}>Отмена</button>
      </section>

      <ul className={styles.search__container}>
        {data && data.searchProducts.map(item => (
          <li onClick={() => handleNavClick(item._id)} key={item._id} className={styles.search__item}>
            <p>{item.name}</p>
            <Image width={40} height={40} src={item.photo.images[0].url} alt="img product" />
        </li>
          ))}
        </ul>

        </>
    </div>
  );
};

export { LayoutSearchMobile };