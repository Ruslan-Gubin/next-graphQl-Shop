import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { updateOptionAction } from '../../libs/store';


import styles from './AdminUpdateProductHeader.module.scss';


const AdminUpdateProductHeader: FC = () => {
const dispatch = useDispatch()
const router = useRouter()

  return (
      <header className={styles.root}>
      <button
      className={styles.btn}
      onClick={() => {
        dispatch(updateOptionAction.getProductId({id: ''}))
        dispatch(updateOptionAction.setProductStatusUpdate({active: false}))
        router.push('/admin/all-products')
      }}
      >
        <div className={styles.btn_goback}></div>
      </button>
      </header>
  );
};

export { AdminUpdateProductHeader };