import React , { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'
import './App.css'
import * as firebase from "firebase/app"
import "firebase/database"
//import Order from './components/Order'
import Type from './components/Type'
import Package from './components/Package'
import City from './components/City'
import Where from './components/Where'
import How from './components/How'
import Pay from './components/Pay'
import PaymentOffer from './components/PaymentOffer'
import Resume from './components/Resume'

import Administrator from './containers/Administrator'

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
  let history = useHistory();
  const [step, setStep] = useState(0)
  const [road,setRoad] = useState({
    from:{address:"",task:""},
    to:{address:"",task:""}
  })
  return (
    <Router>
      <div>
        <div className="App">
          <nav className="white col s12">
            <div className="nav-wrapper container">
              <Link to="/" className="brand-logo title black-text center">aviamensajeros</Link>
            </div>
          </nav>
        </div>

        { /* looks through its children <Route>s and renders the first one that matches the current URL. */ }
        <Switch>
          <Route path="/type">
            <header className="container">
              <Type/>
            </header>
          </Route>
          <Route path="/package">
            <header className="container">
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
            <header className="container">
              <Resume database={database}/>
            </header>
          </Route>
          <Route path="/administrator">
            <header className="container">
              <Administrator database={database}/>
            </header>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
