import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import UserContext from './context/UserContext';
import { useState } from 'react';
import ProductIdPage from './pages/ProductIdPage/ProductIdPage';
import CartPage from './pages/CartPage/CartPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ValueTotalContext from './context/ValueTotalContext';

function App() {
  const [userLogged, setUserLogged] = useState(null);
  const [valueTotal, setValueTotal] = useState();
  return (
    <UserContext.Provider value={{userLogged, setUserLogged}}>
      <ValueTotalContext.Provider value={{valueTotal, setValueTotal}}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/product/:id' element={<ProductIdPage/>}/>
            <Route path='/sign-up' element={<SignupPage/>}/>
            <Route path='/sign-in' element={<SigninPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/payment' element={<PaymentPage/>}/>
          </Routes>
        </Router>
      </ValueTotalContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
