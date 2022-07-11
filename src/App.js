import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Cart } from './Components/Cart/Cart';
import Header from './Components/Header/Header';
import { Home } from './Components/Home/Home';

function App() {
  return (
<>
<Header/>
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='cart' element={<Cart/>}></Route>
</Routes>
</>


  );
}

export default App;
