import { AdminProductManagment, AdminUpdateProduct } from "../../features";
import { AdminLayout } from "../../widgets/AdminLayout/components/AdminLayout";

const AllProducts = () => {

  return (
    <AdminLayout keywords="Product managment" title="All Products">
        <AdminProductManagment />
    </AdminLayout>
  );
};

export default AllProducts;
