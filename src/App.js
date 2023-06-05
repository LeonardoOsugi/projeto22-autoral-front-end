import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
        <Route path='/sign-in' element={<SigninPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
