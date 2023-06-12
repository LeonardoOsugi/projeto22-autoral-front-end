import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import UserContext from './constants/UserContext';
import { useState } from 'react';
import ProductIdPage from './pages/ProductIdPage/ProductIdPage';

function App() {
  const [userLogged, setUserLogged] = useState(null);
  return (
    <UserContext.Provider value={{userLogged, setUserLogged}}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/product/:id' element={<ProductIdPage/>}/>
          <Route path='/sign-up' element={<SignupPage/>}/>
          <Route path='/sign-in' element={<SigninPage/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
