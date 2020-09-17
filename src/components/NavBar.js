import React from 'react'
import {
  Link
} from "react-router-dom"

import courier from '../assets/charters/ToyFaces_Colored_BG_29.jpg'

import { useCookies } from 'react-cookie'

export default function NavBar() {
  const [cookies/*, setCookie,removeCookie*/] = useCookies(['user'])
  //console.log(cookies.user)
  return (
    <nav className="row white">
      <div className="nav-wrapper col s12">
        <Link to="/" className="brand-logo title black-text">aviamensajeros<span className="primary-text">.</span></Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            cookies.user!=null?
            <li>
              <Link to="/" className="black-text">
                <img className="responsive-img img-profile" src={courier} alt={"foto del mensajero"}/>
                <span> {cookies.user.name} </span>
                <div className="btn-floating btn-flat grey lighten-4"><i className="material-icons grey-text" style={{lineHeight:'inherit'}}>keyboard_arrow_down</i></div>
              </Link>
            </li>
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
