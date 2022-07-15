import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Cart } from './Components/Cart/Cart';
import Header from './Components/Header/Header';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Products } from './Components/Products/Products';
import { Profile } from './Components/Profile/Profile';
import { SignUp } from './Components/SignUp/SignUp';


function App() {

  return (
<>
<Header/>
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/product' element={<Products/> }></Route>
<Route path='cart' element={<Cart/>}></Route>
<Route path='login' element={<Login/> }></Route>
<Route path='signup' element={<SignUp/> }></Route>
<Route path='profile' element={<Profile/>}></Route>
</Routes>
</>


  );
}

export default App;
