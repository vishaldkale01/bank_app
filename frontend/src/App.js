import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Client from './pages/client/Client';
import Admin from './pages/admin/Admin';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Navbar from './pages/Navbar';
import PageNotFound from './pages/PageNotFound';
import Welcome from './pages/Welcome';
function App() {
  return (
    <BrowserRouter>
            <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Welcome/>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/Client" element={<Client/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        {/* <Route path="" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
