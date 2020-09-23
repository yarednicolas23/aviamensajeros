import React from 'react'
import { Link,useHistory } from "react-router-dom"
import { useCookies } from 'react-cookie'

export default function SideBar(props) {

  const [cookies,removeCookie] = useCookies()
  let history = useHistory()
  
  if (cookies.user==null) {
    history.push('/')
  }
  const closeSession =()=>{
    removeCookie('user')
    //history.push('/')
  }

  const active = props.active
  return (
    <table className="highlight">
      <tbody>
        <tr className={active==='myorders'?"grey lighten-4":null} style={{border:'none'}}>
          <td><i className={active==='myorders'?"material-icons-outlined indigo-text":"material-icons-outlined grey-text"}>moped</i></td>
          <td><Link to="/user/myorders" className={active==='myorders'?"indigo-text":"grey-text"}>My orders</Link></td>
        </tr>
        <tr className={active==='orderhistory'?"grey lighten-4":null} style={{border:'none'}}>
          <td><i className={active==='orderhistory'?"material-icons-outlined indigo-text":"material-icons-outlined grey-text"}>history</i></td>
          <td><Link to="/courier/orderhistory" className={active==='orderhistory'?"indigo-text":"grey-text"}>Order history</Link></td>
        </tr>
        <tr style={{border:'none'}}>
          <td><i className="material-icons grey-text">close</i></td>
          <td className="grey-text"><span onClick={()=>closeSession()}>Close session</span></td>
        </tr>
      </tbody>
    </table>
  )
}
