import React, { useState,useEffect } from 'react'
import * as firebase from "firebase/app"
import moment from 'moment'

import courierimg from '../assets/charters/ToyFaces_Colored_BG_29.jpg'

function currencyFormat(price){
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function OrderHistory() {
  const [list,setList]=useState([])
  const [courier] = useState(JSON.parse(localStorage.getItem('courier')))
  var [sales,setSales] = useState(0)
  var [comission,setComission] = useState(0)
  useEffect(() => {
    const getList = async()=>{
      firebase.database().ref('orderhistory').orderByChild('courier').equalTo(courier.phone).on("value", function(snapshot) {
        var flist=[]
        setList([])
        var sale=0
        setSales(0)
        snapshot.forEach(function(data) {
          var childData = data.val()
          sale = sale + parseInt(data.val().paymentoffer)
          childData.id= data.key
          flist.push(childData)
        })
        setList(flist)
        setSales(currencyFormat(sale.toString()))
        var coms = sale*0.01
        setComission(currencyFormat(coms.toString()))
      })
    }
    getList()
  }, [])
  return(
    <div className="row">
      <div className="col s12">
        <h5><b>Historial de pedidos</b></h5>
          <table>
          <thead>
            <tr>
                <th>Tipo de paquete</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tipo de pago</th>
                <th>Valor del pago</th>
                <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {
              list.map((order,i)=>
                <tr key={i}>
                  <td>{order.package}</td>
                  <td>{moment(order.creation).format('DD MMM YYYY')}</td>
                  <td>{moment(order.creation).format('hh:mm A')}</td>
                  <td>{order.pay}</td>
                  <td>{'$ '+currencyFormat(order.paymentoffer)}</td>
                  {order.step===4?<td className="green-text">Finalizado</td>:null}
                </tr>
              )
            }
          </tbody>
        </table>
        <h5><b>Reporte de pedidos del día</b></h5>
        <div className="row">
          <div className="col s1">
            <div className="col s12"><img className="responsive-img shadow-grey img-bordered" src={courierimg} alt={"foto del mensajero"}/></div>
            <div className="col s12 center"><h5>{courier.name}</h5></div>
          </div>
          <div className="col s2">
            <div className="col s12"><h5>{list.length}</h5></div>
            <div className="col s12 grey-text">Nº pedidos</div>
          </div>
          <div className="col s2">
            <div className="col s12"><h5>{'$ '+sales}</h5></div>
            <div className="col s12 grey-text">Dinero recaudado</div>
          </div>
          <div className="col s2">
            <div className="col s12"><h5>{'$ '+comission}</h5></div>
            <div className="col s12 grey-text">Comisión</div>
          </div>
        </div>
      </div>
    </div>
  )
}
