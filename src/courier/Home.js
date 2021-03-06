import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom"
import moment from 'moment'

import SideBar from './SideBar'

import from from './../assets/from.svg'
import clock from './../assets/clock.svg'
import money from './../assets/money.svg'

function currencyFormat(price){
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function Home(props){
  let history = useHistory()
  const [courier] =useState(JSON.parse(localStorage.getItem('courier')))
  const [list,setList]=useState([])

  const goIncourse = (key) => {
    history.push("/courier/incourse/"+key)
  }
  useEffect(() => {
    const watchOrders = async ()=>{
      //if (this.state.key!=null) {
      props.database.ref('order').orderByChild('courier').equalTo(courier.phone).on("value", function(snapshot) {
        var flist=[]
        setList([])
        snapshot.forEach(function(data) {
          var childData = data.val()
          childData.id= data.key
          flist.push(childData)
          //console.log(data.key);
        })
        setList(flist)
      })
      //}
    }

    if (courier!=null) {
      watchOrders()
    }
  }, [])
  return(
    <div className="row">
      <div className="col s12">
        <h5><b>Pedido en curso</b></h5>
        {
          list.map((order,i)=>
            <div key={i} className="col s12 m6 l6">
              <div className="card">
                <div className="card-content">
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-road-to" src={from} alt={order.city}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h6 className="no-margin">{order.road.to.address}</h6>
                      <span className="grey-text text-darken-2">Dirección de entrega</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-purple" src={clock} alt={"hora de creación de la orden"}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h6 className="no-margin">{moment(order.tracking.dateCourierTakeOrder).format('hh:mm A')}</h6>
                      <span className="grey-text text-darken-2">Hora de recibido</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s2 l2">
                      <div className="circle">
                        <img className="responsive-img shadow-city" src={money} alt={order.paymentoffer}/>
                      </div>
                    </div>
                    <div className="col s4 l4">
                      <h6 className="no-margin">{currencyFormat(order.paymentoffer)}</h6>
                      <span className="grey-text text-darken-2">{order.pay}</span>
                    </div>
                  </div>
                  <div className="row">
                    <button onClick={()=>goIncourse(order.id)} className="btn primary waves-effect col s12">Ver</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
