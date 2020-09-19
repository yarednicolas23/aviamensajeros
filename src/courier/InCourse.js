import React from 'react'
import { withRouter } from "react-router"
import moment from 'moment'
import M from 'materialize-css'

import SideBar from '../components/SideBar'

import motorcycle from './../assets/motorcycle.svg'
import moverTruck from './../assets/mover-truck.svg'
import envelope from './../assets/envelope.svg'
import box from './../assets/box.svg'
import globe from './../assets/globe.svg'
import fastDelivery from './../assets/fast-delivery.svg'
import calendar from './../assets/delivery-24.svg'
import money from './../assets/money.svg'
import location from './../assets/location.svg'
import from from './../assets/from.svg'
import distance from './../assets/distance.svg'
import timer from './../assets/timer.svg'
import clock from './../assets/clock.svg'
import packageDone from './../assets/package-done.svg'
import shield from './../assets/shield.svg'

import whats from './../assets/actions/whatsapp.svg'
import phone from './../assets/actions/phone.svg'

import courier from './../assets/charters/ToyFaces_Tansparent_BG_29.png'

function getImg(title){
  if (title==='Liviano'){return motorcycle}
  if (title==='Pesado'){return moverTruck}
  if (title==='Documentos'){return envelope}
  if (title==='Caja'){return box}
  if (title==='Agendar'){return calendar}
  if (title==='Ahora'){return fastDelivery}
  if (title==='Bogotá'){return globe}
  if (title==='Medellín'){return globe}
  if (title==='Efectivo'){return money}
  if (title==='location'){return location}
  if (title==='distance'){return distance}
}

class InCourse extends React.Component{
  constructor(props){
    super(props)
    this.state={
      order:{
        type:"",
        package:"",
        when:"",
        pay:"",
        paymentoffer:"",
        city:"",
        road:{from:{address:"",taks:""},to:{address:"",taks:""}},
        courier:0,
        user:0
      },
      user:{
        email:"",
        name:"",
        phone:""
      },
      courier:{
        email:"",
        name:"",
        phone:""
      },
      count:30,
      key:'',
      loader:{order:true,user:false}
    }
  }
  componentDidMount(){
    //var elems = document.querySelectorAll('.modal')
    //M.Modal.init(elems)
    const id = this.props.match.params.id
    if (id!=null) {
      this.state.key=id
      this.watchOrder()
    }
  }

  writeOrderData() {
    this.state.order.creation=new Date().toString()
    this.props.database.ref('order/').push(this.state.order).then((snap)=>{this.setState({key:snap.key});this.watchOrder()})
  }
  goToOrder = e => {
    this.props.history.push("/resume/"+e);
  };
  watchOrder(){
    if (this.state.key!=null) {
      this.props.database.ref('order/'+this.state.key).on('value',(snap)=>{
        if (snap.val()!=null) {
          if (snap.val().courier!==0) {
            //this.getCourier(snap.val().courier)
            this.getUser(snap.val().user)
            this.state.order=snap.val()
            this.state.loader.order=false
            this.setState(this.state)
            setTimeout(()=> {/*instance.close()*/}, 2000)
          }
        }
      })
    }
  }
  getCourier(id){
    this.props.database.ref('courier/'+id).on('value',(snapshot)=>{
      if(snapshot.val()!==null) {
        this.state.courier={mail:snapshot.val().mail,name:snapshot.val().name,phone:snapshot.val().phone}
        this.setState(this.state)
      }
    })
  }
  getUser(id){
    this.props.database.ref('user/'+id).on('value',(snapshot)=>{
      if(snapshot.val()!==null) {
        this.state.user=snapshot.val()
        this.setState(this.state)
      }
    })
  }
  updateStep(step){
    this.state.order.step=step
    this.props.database.ref('order/'+this.state.key).set(this.state.order)
    //this.setState(this.state)
  }
  currencyFormat(price){
    return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  render(){
    return(
      <div className="row">
        <div className="col s2"><SideBar active="home"/></div>
        <div className="col s10">
          <h5 className="poppins">Resumen del pedido:</h5>
          <div className="col s12 l6">
            <div className="row">
              <div className="card col s12">
                <div className="card-content">
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-city" src={getImg(this.state.order.city)} alt={this.state.order.city}/>
                      </div>
                    </div>
                    <div className="col s6">
                      <h5 className="no-margin">{this.state.order.city}</h5>
                      <span className="grey-text text-darken-2">Cuidad</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-road-from" src={from} alt={this.state.order.city}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h5 className="no-margin">{this.state.order.road.from.address}</h5>
                      <span className="grey-text text-darken-2">Dirección de recogida</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-road-to" src={getImg('distance')} alt={this.state.order.city}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h5 className="no-margin">{this.state.order.road.to.address}</h5>
                      <span className="grey-text text-darken-2">Dirección de entrega</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col s12">
                <div className="card-content">
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-type" src={getImg(this.state.order.package)} alt={this.state.order.package}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h5 className="no-margin">{this.state.order.package}</h5>
                      <span className="grey-text text-darken-2">Paquete {this.state.order.package==='Caja'?'maximo de 50x50x50 cm':''}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-type" src={getImg(this.state.order.when)} alt={this.state.order.when}/>
                      </div>
                    </div>
                    <div className="col s10">
                      <h5 className="no-margin">{this.state.order.when}</h5>
                      <span className="grey-text text-darken-2">Fecha</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s2">
                      <div className="circle">
                        <img className="responsive-img shadow-city" src={getImg(this.state.order.pay)} alt={this.state.order.paymentoffer}/>
                      </div>
                    </div>
                    <div className="col s6">
                      <h5 className="no-margin">{this.currencyFormat(this.state.order.paymentoffer)}</h5>
                      <span className="grey-text text-darken-2">{this.state.order.pay}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 l6">
            <div className="row">
              {
                this.state.order.user!==0?
                <div className="col s12">
                  <div className="card">
                    <div className="card-content">
                      <div className="row">
                        <div className="col s2">
                          <div className="circle">
                            <img className="responsive-img shadow-courier" src={courier} alt={"foto del mensajero"}/>
                          </div>
                        </div>
                        <div className="col s4 l6">
                          <h5 className="no-margin">{this.state.user.name}</h5>
                          <span className="grey-text text-darken-2">Cliente</span>
                        </div>
                        <div className="col s6 l4">
                          <a href={"tel:"+this.state.user.phone} className="col s6"><img className="responsive-img shadow-action" src={phone} alt={"foto del mensajero"}/></a>
                          <a href={"https://api.whatsapp.com/send?phone="+this.state.user.phone+"&text=Hola "+this.state.user.name+""} className="col s6"><img className="responsive-img shadow-action" src={whats} alt={"foto del mensajero"}/></a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s2">
                          <div className="circle">
                            <img className="responsive-img shadow-road-from" src={clock} alt={"foto del mensajero"}/>
                          </div>
                        </div>
                        <div className="col s8">
                          <h5 className="no-margin">{moment(this.state.order.creation).format('hh:mm A') }</h5>
                          <span className="grey-text text-darken-2">Hora del pedido</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s2">
                          <div className="circle">
                            <img className="responsive-img shadow-road-from" src={shield} alt={"foto del mensajero"}/>
                          </div>
                        </div>
                        <div className="col s8">
                          <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).format('hh:mm A') }</h5>
                          <span className="grey-text text-darken-2">Hora de tomado por mensajero</span>
                        </div>
                        <div className="col s2">
                          <div className={this.state.order.step>=1?"btn-floating btn-flat green accent-2":"btn-floating btn-flat grey lighten-4"}>
                            <i className={this.state.order.step>=1?"material-icons green-text":"material-icons grey-text"}>check</i>
                          </div>
                        </div>
                      </div>
                      <div className={this.state.order.step>=2?"row":"row opacity-1"}>
                        <div className="col s2">
                          <div className="circle">
                            <img className="responsive-img shadow-road-from" src={timer} alt={"foto del mensajero"}/>
                          </div>
                        </div>
                        <div className="col s8">
                          <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).add(20, 'minutes').format('hh:mm A') }</h5>
                          <span className="grey-text text-darken-2">Hora de llegada del mensajero</span>
                        </div>
                        <div className="col s2">
                          <div onClick={()=>this.updateStep(2)} className={this.state.order.step>=2?"btn-floating btn-flat green accent-2":"btn-floating btn-flat grey lighten-4"}>
                            <i className={this.state.order.step>=2?"material-icons green-text":"material-icons grey-text"}>check</i>
                          </div>
                        </div>
                      </div>
                      <div className={this.state.order.step>=3?"row":"row opacity-2"}>
                        <div className="col s2">
                          <div className="circle">
                            <img className="responsive-img shadow-road-from" src={motorcycle} alt={"mensajero en camino"}/>
                          </div>
                        </div>
                        <div className="col s8">
                          <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).add(30, 'minutes').format('hh:mm A') }</h5>
                          <span className="grey-text text-darken-2">Pedido en curso</span>
                        </div>
                        <div className="col s2">
                          <div onClick={()=>this.updateStep(3)} className={this.state.order.step>=3?"btn-floating btn-flat green accent-2":"btn-floating btn-flat grey lighten-4"}>
                            <i className={this.state.order.step>=3?"material-icons green-text":"material-icons grey-text"}>check</i>
                          </div>
                        </div>
                      </div>
                      <div className={this.state.order.step>=4?"row":"row opacity-3"}>
                        <div className="col s2">
                          <div className="circle">
                            <img className="responsive-img shadow-yellow" src={packageDone} alt={"foto del mensajero"}/>
                          </div>
                        </div>
                        <div className="col s6">
                          <h5 className="no-margin">{moment(this.state.order.tracking.dateCourierTakeOrder).add(50, 'minutes').format('hh:mm A') }</h5>
                          <span className="grey-text text-darken-2">Tiempo de entrega</span>
                        </div>
                      </div>
                      <div className={this.state.order.step>=3?"row":"row opacity-3"}>
                        <div onClick={()=>this.updateStep(4)} className={this.state.order.step>=3?"btn green accent-2 shadow-green waves-effect col s12":"btn primary disabled col s12"}>
                          Entregue el pedido
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(InCourse)
