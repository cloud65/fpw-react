import React from "react";
import { connect } from 'react-redux';
import {Container, Row, Col } from 'react-bootstrap'
import AppWeather  from './AppWeather';


const AppWeatherList=props=> {    
    const items = props.weatherList.map((e, i)=>{
        const cls = "text-truncate app-bar hovered " + ((props.item===i) ? "selected" : "")
        return <Col key={e.dt} md={2} sm={3} xs={6}  className="text-center small not-padding">
            <div  className={cls} onClick={()=>props.setItem(i)}>
            <AppWeather {...e} full={false}/>
            </div>
        </Col>
    })
    
    return (        
          <Container style={{height: 'var(--app-row-list-top)'}}>
                <Row className='scroll-list'>
                    {items}              
                </Row> 
          </Container>
    )
}


const mapStateToProps = (store) => {
  return {
    item: store.options.item,
    weatherList: store.weather.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setItem: (item) => dispatch({type:'set_item', data: item}),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(AppWeatherList);