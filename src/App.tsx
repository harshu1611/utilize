import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './global.css';
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { redirect } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import supabase from './utils/supabase';
import { getuser, orderLoading, useAppDispatch } from './redux/store';
import { updateUser } from './redux/states/user';
import { fetchOrders } from './redux/states/orders';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';


const App=()=>{
  const dispatch= useAppDispatch();
  const userData=useSelector(getuser)
  const [session, setSession] = useState<any>(null)
  const [uid,setUid]=useState<any>()
  const [user,setUser]=useState<any>()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

      if(session){
        setUid(session?.user.id)
      } else {
        setUid(null)
      }
      
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      dispatch(updateUser(session))
      dispatch(fetchOrders(userData?.user.id))
      
    });
    // console.log(session)

    // if (session && session.user) {
    //       setUid(session.user.id);
          
    //     }
    
    return () => subscription.unsubscribe(); 

    
  }, [session])
  const loader=useSelector(orderLoading);
  return(
    <div>
     
      <BrowserRouter>
    <Routes>

     {session && userData?
     
      <Route path='/' element={<Home/>}/>
     
    :
    <Route path='/' element={<Login/>}/>
  }
    </Routes>
     
    
    </BrowserRouter>
      
    
   </div>
  )
}
export default App;
