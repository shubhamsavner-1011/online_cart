import * as Path from '../Routing/RoutePath';
import { Home } from '../Home/Home';
import { Products } from '../Products/Products';
import { Cart } from '../Cart/Cart';
import { Login } from '../Login/Login';
import { SignUp } from '../Sign-up/SignUp';
import { Profile } from '../Profile/Profile';
import { Category } from '../Category/Category';
import { ProductDetails } from '../Products/ProductDetails';
import { Address } from '../Profile/Address';
import { ForgetPassword } from '../Forget-password/ForgetPassword';
import {  StripePayment } from '../Stripe/StripePayment';
import { Success } from '../Stripe/Success';
import { Cancel } from '../Stripe/Cancel';
  export const publicRoutes = [
    
    { path: Path.DASHBOARD_PAGE, Component: Home },
    { path: Path.PRODUCT_PAGE, Component: Products },
    { path: Path.PRODUCT_DETAIL_PAGE+':id', Component: ProductDetails },
    { path: Path.LOGIN_PAGE, Component: Login },
    { path: Path.SIGNUP_PAGE, Component: SignUp },
    { path: Path.CATEGORY_PAGE, Component: Category },
    { path: Path.ADDRESS_PAGE, Component: Address },
    { path: Path.FORGET_PASSWORD, Component: ForgetPassword },
    { path: Path.STRIPE_PAYMENT, Component: StripePayment },
    { path: Path.STRIPE_SUCCSESS, Component: Success },
    { path: Path.STRIPE_CANCEL, Component: Cancel },
   
  ];
  export const privateRoutes = [
    { path: Path.CART_PAGE, Component: Cart },
    { path: Path.PROFILE_PAGE, Component: Profile },
  ];
  