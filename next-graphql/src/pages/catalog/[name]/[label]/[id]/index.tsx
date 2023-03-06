import { getOneProductUpdateViews,  graphQlFetch, sortProductSimilar } from "../../../../../apps/api";
import { Error,  } from "../../../../../shared";
import { ProductDetailsPage, ShopLayout } from "../../../../../widgets";
import { NextPageContext } from "next";
import { OPTIONS_DEPARTMENT } from '../../../../../apps/constants';


const ProductDetails = ({ product, department, subDepartment, similarProduct, product_id, departmentHrefName}) => {

  if (!product) {
    return <Error statusCode={'product id'}/>
  }
  
  return (
    <ShopLayout title='ProductDetail' keywords='ProductDetail'>
      <ProductDetailsPage departmentHrefName={departmentHrefName} product={product} department={department} subDepartment={subDepartment} similarProduct={similarProduct} product_id={product_id} />
    </ShopLayout>
  );
};

ProductDetails.getInitialProps = async ({query}: NextPageContext) => {
   try {
    const {id, label, name } = query

    const { data: product, error: errProduct } = await graphQlFetch({
      ...getOneProductUpdateViews,
      variables: { id },
    });

    if ( errProduct ) {
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
      return {
        notFound: true,
      };
    } 
  
    const findDepartment = OPTIONS_DEPARTMENT.find(item => item.label === productDetails.department)
    const subDepartment = findDepartment?.subdepartment.find(item => item.label === productDetails.sub_department)

    return {
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
    };
  } catch {
    return {
        product: null,
        similarProduct: null,
        product_id: null,
    };
  }
};


export default ProductDetails;
