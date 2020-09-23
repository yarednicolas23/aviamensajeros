import React, { useState } from 'react'
import {
  Link
} from "react-router-dom"
//import { useCookies } from 'react-cookie'

import courierimg from '../assets/charters/ToyFaces_Colored_BG_29.jpg'
import userimg from '../assets/charters/ToyFaces_Colored_BG_56.jpg'

export default function NavBar() {
  //const [cookies/*, setCookie,removeCookie*/] = useCookies()
  //console.log(cookies.user)
  const [courier] = useState(JSON.parse(localStorage.getItem('courier')))
  const [user] = useState(localStorage.getItem('user'))
  return (
    <nav className="row white no-margin">
      <div className="nav-wrapper col s12">
        <Link to="/" className="brand-logo title black-text">aviamensajeros<span className="primary-text">.</span></Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            courier!=null?
            <li>
              <Link to="/courier/home" className="black-text">
                <img className="responsive-img img-profile" src={courierimg} alt={"foto del mensajero"}/>
                <span> {courier.name} </span>
                <div className="hide btn-floating btn-flat grey lighten-4"><i className="material-icons grey-text" style={{lineHeight:'inherit'}}>keyboard_arrow_down</i></div>
              </Link>
            </li>
            :
            user!=null?
            <>
            <li style={{marginRight:60}}>
              <Link to="/user/home" className="black-text">
                <img className="responsive-img img-profile" src={userimg} alt={"foto del usuario"}/>
                <span> {user.name} </span>
                <div className="hide btn-floating btn-flat grey lighten-4"><i className="material-icons grey-text" style={{lineHeight:'inherit'}}>keyboard_arrow_down</i></div>
              </Link>
            </li>
            </>
            :
            <>
            <li>
              <Link to="/register" className="grey-text">Registro</Link>
            </li>
            <li>
              <Link to="/login" className="btn primary">Iniciar sesión</Link>
            </li>
            </>
          }
        </ul>

      </div>
    </nav>
  )
}
