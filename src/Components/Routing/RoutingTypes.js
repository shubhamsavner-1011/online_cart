import * as Path from '../Routing/RoutePath';
import { Home } from '../Home/Home';
import { Products } from '../Products/Products';
import { Cart } from '../Cart/Cart';
import { Login } from '../Login/Login';
import { SignUp } from '../SignUp/SignUp';
import { Profile } from '../Profile/Profile';
import { Category } from '../Category/Category';
import { ProductDetails } from '../Products/ProductDetails';
import { Address } from '../Profile/Address';
  export const publicRoutes = [
    
    { path: Path.DASHBOARD_PAGE, Component: Home },
    { path: Path.PRODUCT_PAGE, Component: Products },
    { path: Path.PRODUCT_DETAIL_PAGE+':id', Component: ProductDetails },
    { path: Path.LOGIN_PAGE, Component: Login },
    { path: Path.SIGNUP_PAGE, Component: SignUp },
    { path: Path.CATEGORY_PAGE, Component: Category },
    { path: Path.ADDRESS_PAGE, Component: Address },
   
  ];
  export const privateRoutes = [
    { path: Path.CART_PAGE, Component: Cart },
    { path: Path.PROFILE_PAGE, Component: Profile },
  ];
  