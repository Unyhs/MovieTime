//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/User'
import ProtectedRoute from './Components/protectedRoute';
import store from './Redux/store';
import {Provider} from 'react-redux'
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import Loader from './Components/loader';


function App() {
  return (
    <Provider store={store}>
    <div className="App">  
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute ><Home /></ProtectedRoute>}></Route>
        <Route path='/Admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
        <Route path='/Partner' element={<ProtectedRoute><Partner /></ProtectedRoute>}></Route>
        <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/loader' element={<Loader />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
