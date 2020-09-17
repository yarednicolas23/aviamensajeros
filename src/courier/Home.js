import React from 'react'
import SideBar from '../components/SideBar'

export default function Home(){
  return(
    <div className="row">
      <div className="col s2"><SideBar active="home"/></div>
      <div className="col s10">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <b>Pedido en curso</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
