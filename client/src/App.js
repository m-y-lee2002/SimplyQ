import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage.js';
import UserLogin from './components/UserLogin.js';
import StaffLogin from './components/StaffLogin.js';
import UserRegister from './components/UserRegister.js';
import UserPage from './components/UserPage.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path = "/" element = {<MainPage/>}/>
            <Route path = "/UserLogin" element = {<UserLogin/>}/>
            <Route path = "/StaffLogin" element = {<StaffLogin/>}/>
            <Route path = "/UserRegister" element = {<UserRegister/>}/>
            <Route path = "/UserPage" element = {<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
