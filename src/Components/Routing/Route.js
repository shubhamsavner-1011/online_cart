import React from 'react'
import { privateRoutes,publicRoutes } from './RoutingTypes'
import {useEffect,useState} from 'react'
import { auth } from '../../Firebase/Firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import { PrivateRoutes } from './PrivateRoutes';
import { Footer } from '../Footer/Footer';


export const Routing = () => {

 const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
       user.accessToken  ? setUserName(user.displayName) : setUserName('')
    });
  }, [userName]);
    return (
      <Router>
      <Header userName={userName} setUserName={setUserName}/>
      <Routes>
      {publicRoutes?.map((route, index) => {
        return <Route path={route.path} key={index} element={<route.Component userName={userName} setUserName={setUserName} />} />;
      })}
      {privateRoutes?.map((route, index) => {
        return (
          <Route
            path={route.path}
            key={index}
            element={<PrivateRoutes Component={route.Component}/>}
          />
        );
      })}
      </Routes>
      <Footer/>
      </Router>
    )
 
}



