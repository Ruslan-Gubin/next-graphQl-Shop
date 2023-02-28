import { SEARCH_PRODUCTS } from '@/apps/apollo/productRequest';
import { ISearchProduct } from '@/apps/types';
import { LoaderShop, SearchItemAutocomplete } from '@/shared';
import { useQuery } from '@apollo/client';
import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/router';

import styles from './LayoutAutoComplet.module.scss';

interface ILayoutAutoComplet {
searchValue: string
setModalActive: Dispatch<SetStateAction<boolean>>
setValue: Dispatch<SetStateAction<string>>
} 

const LayoutAutoComplet: FC<ILayoutAutoComplet> = ({searchValue, setModalActive, setValue}) => {
  const {data, loading} = useQuery<{searchProducts:ISearchProduct[]}>(SEARCH_PRODUCTS, {
    variables: {
      searchValue: searchValue.length > 2 ? searchValue : 'adfsfeasdfg'
    }
  })
  const router = useRouter()

  const handlerNavRouter = (id: string) => {
    setValue('')
    setModalActive(false)
    router.push(`/catalog/${id}`)
  }

  return (
    <div className={styles.root}>
      {loading && 
      <LoaderShop />
      }
      <ul className={styles.container}>

    {data?.searchProducts.map(item => (
      <li onClick={() => handlerNavRouter(item._id)} key={item._id}>
        <SearchItemAutocomplete
        id={item._id}
         onClick={handlerNavRouter}
        productImg={item.photo.images[0].url}
         text={item.name}/>
      </li>
    ))}

      </ul>
    </div>
  );
};

export  { LayoutAutoComplet };