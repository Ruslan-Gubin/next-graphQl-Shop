import { ShopLayout } from '@/widgets/ShopLayout';
import React from 'react';

const widgetsBlock = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1674733790/Hits/witgets_cl7yb2.jpg';
const featureSliced = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1674733757/Hits/shared_cpgr0t.jpg';
const feature = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1674733725/Hits/features_qtgmu3.jpg';
const featureSlicedDesing = 'https://res.cloudinary.com/ds289tkqj/image/upload/v1674733721/Hits/feature-sliced-desing1_zbpjkz.jpg';


const Hits = () => {
  return (
    <ShopLayout title='Hits' keywords='Hits'>
      <span>
      <img style={{width: 900}} src={widgetsBlock} alt="widgetsBlock" />
      </span>
  <span>
      <img style={{width: 900}} src={featureSliced} alt="featureSliced" />
  </span>
     <span>
    <img style={{width: 900}} src={feature} alt="feature" />
     </span>
     <span>
      <img style={{width: 900}} src={featureSlicedDesing} alt="featureSlicedDesing" />
     </span>
     <p>1:app,2process,3pages,4widgets,5feature,6intites,7shared</p>
    </ShopLayout>
  );
};

export default Hits;