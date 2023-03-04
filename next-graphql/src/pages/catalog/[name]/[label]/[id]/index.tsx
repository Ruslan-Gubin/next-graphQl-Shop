import { useRouter } from 'next/router';
import { GetStaticProps } from "next";
import { getAllProductId,  getOneProductUpdateViews,  graphQlFetch, sortProductSimilar } from "../../../../../apps/api";
import { OPTIONS_DEPARTMENT } from "../../../../../apps/constants";
import { Error, LoaderShop } from "../../../../../shared";
import { ProductDetailsPage, ShopLayout } from "../../../../../widgets";
import { GetStaticPaths } from 'next';
import { IDetailsProductPaths } from '../../../../../apps/types';

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

export const getStaticPaths: GetStaticPaths = async (): Promise<{paths: IDetailsProductPaths[] | null, fallback: boolean}> => {
  try {
    const { data: products } = await graphQlFetch({
      ...getAllProductId
    });

const paths: IDetailsProductPaths[] = products.data.products.map(item => {
  const findName = OPTIONS_DEPARTMENT.find(dep => dep.label === item.department)
 return {params: {id: item._id, label: item.sub_department, name: findName.department_href}}
})

    return {
      paths,
      fallback: false,
    };
  } catch {
    return {
      paths: null,
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { id, label, name } = context.params
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
