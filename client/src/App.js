import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage.js';
import UserLogin from './components/UserLogin.js';
import StaffLogin from './components/StaffLogin.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path = "/" element = {<MainPage/>}/>
            <Route path = "/UserLogin" element = {<UserLogin/>}/>
            <Route path = "/StaffLogin" element = {<StaffLogin/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
