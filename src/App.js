import React , { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'
import './App.css'
import * as firebase from "firebase/app"
import "firebase/database"

//import Order from './components/Order'
import NavBar from './components/NavBar'
import Type from './components/Type'
import Package from './components/Package'
import City from './components/City'
import Where from './components/Where'
import How from './components/How'
import Pay from './components/Pay'
import PaymentOffer from './components/PaymentOffer'
import Resume from './components/Resume'
import OrderInCourse from './components/InCourse'

import Login from './containers/Login'

import LoginUser from './user/Login'
import Register from './user/Register'
import AssignPassword from './user/AssignPassword'
import MyOrders from './user/MyOrders'
import OrderHistoryUser from './user/OrderHistory'


import CourierHome from './courier/Home'
import InCourse from './courier/InCourse'
import Orders from './courier/Orders'
import OrderHistory from './courier/OrderHistory'

import OrderResume from './containers/OrderResume'
//import Administrator from './containers/Administrator'
import Home from './containers/Home'

const firebaseConfig = {
  apiKey: "AIzaSyCSLYO-Jw0oJTlsxbX4GykyE-j2hIKhg6s",
  authDomain: "aviamens.firebaseapp.com",
  databaseURL: "https://aviamens.firebaseio.com",
  projectId: "aviamens",
  storageBucket: "aviamens.appspot.com",
  messagingSenderId: "16851261794",
  appId: "1:16851261794:web:17b85b4ddbb16da6d4343b",
  measurementId: "G-DGS5PWGQYV"
};
firebase.initializeApp(firebaseConfig)
var database = firebase.database()

function App() {
  const [step] = useState(0)
  const [road,setRoad] = useState({
    from:{address:"",task:""},
    to:{address:"",task:""}
  })

  return (
    <Router>
      <div>
        <div className="App">
          <NavBar/>
        </div>

        { /* looks through its children <Route>s and renders the first one that matches the current URL. */ }
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/type">
            <header className="container">
              <Progress step={step}/>
              <Type/>
            </header>
          </Route>
          <Route path="/package">
            <header className="">
              <Package/>
            </header>
          </Route>
          <Route path="/city">
            <header className="container">
              <City/>
            </header>
          </Route>
          <Route path="/where">
            <header className="container">
              <Where road={road} setRoad={setRoad}/>
            </header>
          </Route>
          <Route path="/how">
            <header className="container">
              <How/>
            </header>
          </Route>
          <Route path="/pay">
            <header className="container">
              <Pay/>
            </header>
          </Route>
          <Route path="/paymentoffer">
            <header className="container">
              <PaymentOffer/>
            </header>
          </Route>
          <Route path="/resume">
            <Resume database={database}/>
          </Route>
          <Route path="/incourse/:order">
            <OrderInCourse database={database}/>
          </Route>
          <Route path="/courier/login">
            <Login/>
          </Route>

          <Route path="/courier/home">
            <CourierHome database={database}/>
          </Route>
          <Route path="/courier/orderhistory">
            <OrderHistory/>
          </Route>
          <Route path="/courier/orders">
            <header>
              <Orders database={database}/>
            </header>
          </Route>
          <Route path="/courier/order/:id">
            <header className="container">
              <OrderResume database={database}/>
            </header>
          </Route>
          <Route path="/courier/incourse/:id">
            <InCourse database={database}/>
          </Route>

          <Route path="/user/myorders">
            <MyOrders database={database}/>
          </Route>

          <Route path="/user/orderhistory">
            <OrderHistoryUser/>
          </Route>


          <Route path="/assignpassword/:phone">
            <AssignPassword />
          </Route>
          <Route path="/login">
            <LoginUser/>
          </Route>
          <Route path="/register">
            <Register database={database}/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
function Progress(props){
  return(
    <div>
      <h5 className="poppins grey-text text-darken-2">Paso {props.step} de 8</h5>
      <div className="progress">
        <div className="determinate" style={{width:props.step*1.25*10+'%'}}></div>
      </div>
    </div>
  )
}
export default App;
