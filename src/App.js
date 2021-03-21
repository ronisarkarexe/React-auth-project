import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Header/Header'
import Home from './componentes/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Destination from './componentes/Destination/Destination';
import Login from './componentes/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './componentes/PrivateRoute/PrivateRoute';

export const UseContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UseContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
     <Header></Header>
     <Switch>
       <Route path="/home">
          <Home></Home>
       </Route>
       <Route path="/login">
         <Login></Login>
       </Route>
       <PrivateRoute path="/destination/:rideType">
          <Destination></Destination>
       </PrivateRoute>
       <Route exact path="/">
          <Home></Home>
       </Route>
       <Route path="*">
         
       </Route>
     </Switch>

    </Router>
    </UseContext.Provider>
  );
}

export default App;
