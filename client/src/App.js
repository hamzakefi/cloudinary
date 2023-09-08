
import './App.css';
import ResponsiveAppBar from "./components/NavBar/ResponsiveAppBar"
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home"
import Error from './pages/Error/Error';
import ListContact from "./pages/ListFood/ListFood"
import LoginUser from "./pages/LoginUser/LoginUser"
import RegisterUser from "./pages/RegisterUser/RegisterUser"
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { current } from './JS/Actions/user';
import Successnotification from './components/Successnotification/Successnotification';
import Errornotification from './components/Errornotification/Errornotification';
import AddFood from './pages/AddFood/AddFood';
import EditFood from './pages/EditFood/EditFood';


function App() {

  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const usersuccess = useSelector((state) => state.userReducer.success);
  const erroruser = useSelector((state)=> state.userReducer.errors); 


  const dispatch = useDispatch()
  
  useEffect(()=> {
    if (localStorage.getItem("token")) {
      dispatch(current())
    } 
  },[dispatch])

  return (
    <div className="App">

    {usersuccess && usersuccess.map((el) => <Successnotification success={el}/>)}
    {erroruser && erroruser.map((el) => <Errornotification error={el} /> )}
    
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home/>}  />
          <Route path="/*" element={<Error/>}  />
          {isAuth && <Route path="/AddFood" element={<AddFood/>}  /> }
          
          <Route path="/listfood" element={<ListContact/>} /> 
          <Route path='/EditFood/:id' element={<EditFood/>}  />
          <Route path='/login' element={<LoginUser/>} />
          <Route path='/register' element={<RegisterUser/>} />
          {isAuth && <Route path="/updatepassword/:id" element={<UpdatePassword/>} />}
          
        </Routes>

    </div>
  );
}

export default App;
