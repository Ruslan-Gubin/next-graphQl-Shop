import { useRouter } from 'next/router';
import { getOneProductUpdateViews,  graphQlFetch, sortProductSimilar } from "../../../../apps/api";
import { Error, LoaderShop } from "../../../../shared";
import { ProductDetailsPage, ShopLayout } from "../../../../widgets";
import { NextPageContext } from "next";
import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';


const ProductDetails = ({erroCode, product, department, subDepartment, similarProduct, product_id, departmentHrefName}) => {
const router = useRouter()

  if (erroCode) {
    return <Error statusCode={erroCode}/>
  }
  
  return (
    <ShopLayout title='ProductDetail' keywords='ProductDetail'>
      {router.isFallback ?
      <LoaderShop />
      :
      <ProductDetailsPage departmentHrefName={departmentHrefName} product={product} department={department} subDepartment={subDepartment} similarProduct={similarProduct} product_id={product_id} />
      }
    </ShopLayout>
  );
};

export const getServerSideProps = async ({query}: NextPageContext) => {
   try {
    const {id, label, name } = query

    let erroCode: number | boolean = false;
    const { data: product, error: errProduct } = await graphQlFetch({
      ...getOneProductUpdateViews,
      variables: { id },
    });

    if ( errProduct ) {
      erroCode = errProduct
      return {
        notFound: true,
      };
    }

    const productDetails = product.data.productDetail

    const { data: similarProduct, error: errSimilarProduct } = await graphQlFetch({
      ...sortProductSimilar,
      variables: { 
      department: productDetails.department,
      sub_department: label,
      category_id: productDetails.category_id,
      exception: id,
       },
    });

    if ( errSimilarProduct ) {
      erroCode = errSimilarProduct
      return {
        notFound: true,
      };
    } 
  
    const findDepartment = OPTIONS_DEPARTMENT.find(item => item.label === productDetails.department)
    const subDepartment = findDepartment?.subdepartment.find(item => item.label === productDetails.sub_department)

    return {
      props: { 
        erroCode,
        product: productDetails,
        departmentHrefName: name,
        similarProduct: similarProduct.data.sortSimilarProduct,
        department: {
          name: findDepartment?.value,
          href: findDepartment?.href,
        },
        subDepartment: {
          name: subDepartment?.value,
          href: label
        },
        product_id: id,
    },
    // revalidate: 1,
    };
  } catch {
    return {
      props: {
        product: null,
        similarProduct: null,
        product_id: null,
      },
    };
  }
};


export default ProductDetails;
