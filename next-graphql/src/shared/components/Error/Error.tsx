import { ShopLayout } from "../../../widgets";
import { CustomLink } from "../CustomLink";


function Error({ statusCode }) {
  return (
    <ShopLayout title="Ошибка" keywords="Ошибка">

    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
    <CustomLink  href='/' name='Go Home' />

        </ShopLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export { Error };