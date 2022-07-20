import './App.css';
import { Routing } from './Components/Routing/Route';
// import { Cart } from './Components/Cart/Cart';
// import Header from './Components/Header/Header';
// import { Home } from './Components/Home/Home';
// import { Login } from './Components/Login/Login';
// import { Products } from './Components/Products/Products';
// import { Profile } from './Components/Profile/Profile';
// import { SignUp } from './Components/SignUp/SignUp';



function App() {
 
  return (
<>
{/* 
<Header name={userName} setUserName={setUserName}/>
<Routes>
<Route path='/' element={<Home name={userName}/>}/>
<Route path='product' element={<Products/> }/>
<Route path='login' element={<Login setUserName={setUserName}/> }/>
<Route path='signup' element={<SignUp/> }/>
<Route path='profile' element={<Profile/>}/>
<Route path='cart' element={<Cart/>}/>
</Routes>
*/}
<Routing/>
</>


  );
}

export default App;
