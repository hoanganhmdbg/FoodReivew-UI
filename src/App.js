import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home/home';
import { createContext, useEffect, useState } from 'react';
import axios from './api/index';

import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";
import Detail from './components/Detail/Detail';
import Create from './pages/Create/Create'

export const AuthContext = createContext(); //named export

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios({
        url: '/api/auth/user',
        method: 'GET',
      })
      if (res.data.success) {
        console.log(res.data);
        setUser(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
   
    if(token) {
      console.log('oke');
      getUser();
      setLoading(false);
    }else {
      setUser(null);
      setLoading(false);
    }
  }, [])

  if(loading) return <div>Loading....</div>
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/create">
            <Create></Create>
          </Route>
          <Route path="/detail/:id">
            <Detail></Detail>
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
