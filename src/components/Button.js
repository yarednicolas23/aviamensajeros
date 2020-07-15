import React from 'react'

import motorcycle from './../assets/motorcycle.svg'
import moverTruck from './../assets/mover-truck.svg'
import envelope from './../assets/envelope.svg'
import box from './../assets/box.svg'
import globe from './../assets/globe.svg'
import fastDelivery from './../assets/fast-delivery.svg'
import calendar from './../assets/delivery-24.svg'
import money from './../assets/money.svg'

export default class Button extends React.Component{
  constructor(props){
    super(props)
    this.props=props
  }
  getImg(title){
    if (this.props.title==='Liviano'){return motorcycle}
    if (this.props.title==='Pesado'){return moverTruck}
    if (this.props.title==='Documentos'){return envelope}
    if (this.props.title==='Caja'){return box}
    if (this.props.title==='Agendar'){return calendar}
    if (this.props.title==='Ahora'){return fastDelivery}
    if (this.props.title==='Bogotá'){return globe}
    if (this.props.title==='Medellín'){return globe}
    if (this.props.title==='Efectivo'){return money}
  }
  handleClick(){
    /*
    this.props.onSelect({step:v+1})
    if (this.props.state.step===1){ this.props.state.summary.transport=this.props.title}
    if (this.props.state.step===2){ this.props.state.summary.package=this.props.title}
    if (this.props.state.step===3){ this.props.state.summary.city=this.props.title}
    if (this.props.state.step===5){ this.props.state.summary.when=this.props.title}
    */
  }
  render(){
    return (
      <div className="float-card" onClick={()=>this.props.handleClick()}>
        <img className="order-icon" src={this.getImg(this.props.title)} alt={this.props.title}/>
        <h3 className="thin">{this.props.title}</h3>
      </div>
    );
  }
}
