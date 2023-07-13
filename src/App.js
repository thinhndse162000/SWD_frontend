import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Protected from './component/Protected';
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Account from './pages/Login/profile';
import Orders from './pages/Orders';
import Login from './pages/Login/login';
import Products from './pages/Product';
import { AuthContextProvider } from './pages/Login/AuthContext';
import Data from './pages/Product/data';
import Ecommerce from './pages/DashBoard/Ecommerce';
import Details from './pages/Product/details';
import OrderDetails from './pages/Orders/details';
import UpdateOrder from './pages/Orders/update';

function App () {
  // const [page, setPage] = useState([]);
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          <AuthContextProvider>
          <div className='dashboard-body'>
              <Routes>
                  <Route path="/" element={<Ecommerce/>} />
                  <Route path="dashboard" element={<Ecommerce/>} />
                  <Route path="orders" element={< Orders/>} />
                  <Route path='orders/details' element={< OrderDetails/>}/>
                  <Route path='orders/update' element={< UpdateOrder/>}/>
                  <Route path="products" element={< Products/>} />
                  <Route path="products/data" element={< Data/>} />
                  <Route path='products/details' element={< Details/>}/>
                  <Route path="profile" element={
                              <Protected>
                                <Account />
                              </Protected>
                            } />
                  <Route path="login" element={< Login/>} />
              </Routes>
          </div>
          </AuthContextProvider>
      </div>
    </Router>
  )
}

export default App;