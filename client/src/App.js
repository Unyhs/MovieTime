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
import MoviePage from './pages/Home/MoviePage';
import BookShow from './pages/Home/BookShow';
import ForgetPassword from './pages/Login/ForgetPassword';
import ResetPassword from './pages/Login/ResetPassword'


function App() {
  return (
    <Provider store={store}>
    <div className="App">  
      <BrowserRouter>
      <Routes>
        <Route path='/home' element={<ProtectedRoute ><Home /></ProtectedRoute>}></Route>
        <Route path='/Admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
        <Route path='/Partner' element={<ProtectedRoute><Partner /></ProtectedRoute>}></Route>
        <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path='/movies/:movieId/:currDate' element={<ProtectedRoute><MoviePage /></ProtectedRoute>}></Route>
        <Route path='/bookShow/:showId/:selectedDate' element={<ProtectedRoute><BookShow /></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/forgetPassword' element={<ForgetPassword />}></Route>
        <Route path='/resetPassword' element={<ResetPassword />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/loader' element={<Loader />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
