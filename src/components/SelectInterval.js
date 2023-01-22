import React from "react";
import { connect } from 'react-redux';
import {Nav} from 'react-bootstrap'

import SelectCity  from './SelectCity';

const SelectInterval=props=> {
    const handleSelect=(eventKey)=>{
        props.setInterval(Number(eventKey))
    }
    
    return (   
        <Nav fill  variant="pills" 
            defaultActiveKey={props.interval} 
            onSelect={handleSelect}>
              <Nav.Item>
                <Nav.Link eventKey="1">Сейчас</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="16">Два дня</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="40">Неделя</Nav.Link>
              </Nav.Item>
            </Nav>  
            
 );   
}


const mapStateToProps = (store) => {    
  return {
    interval: store.options.interval,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInterval: (interval) => dispatch({type:'set_interval', data: interval}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectInterval);
