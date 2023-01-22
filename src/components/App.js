import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";

import {Container, Row, Col, Navbar, Card } from 'react-bootstrap'

import SelectInterval  from './SelectInterval';
import SelectCity  from './SelectCity';
import AppHeader  from './AppHeader';
import AppWeather  from './AppWeather';
import AppWeatherList  from './AppWeatherList';

const apiKey = 'af5eb320b2b56adeb59238c27ad186ff'

//import {debugData} from '../const/debugData';

const handleResize=()=>{
    const row=document.getElementById('row-list')    
    if (row) document.body.style.setProperty("--app-row-list-top", (window.innerHeight-row.offsetTop)+'px');
}

const getWeather=async (city, interval, callback)=>{
    
    //callback(debugData); return
    
    //lat=44.34&lon=10.99
    //http://openweathermap.org/img/wn/10d@2x.png    
    
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${interval}&lang=ru&units=metric&appid=${apiKey}`    
    axios.get(url)
    .then(res=>{
        if (res.status===200) callback(res.data)
        handleResize()
    })
    .catch(err=>alert(err.message))
}





const App=props=> {
    const [enableFindButton, setEnableFindButton] = React.useState(false);
    
    React.useEffect(()=>{
        //getWeather(null, null, props.setWeather); //Отладка
        window.addEventListener("resize", handleResize);        
    }, [])
    
    
    React.useEffect(()=>{ //Если изменились критерии, но начинаем поиск
        if (!props.city) return;
        getWeather(props.city, props.interval, props.setWeather)
    }, [props.city, props.interval])
    
    
    handleResize()
    return (<>        
          <AppHeader {...props.cityData} />
          <Container fluid='lg'>
                <Col lg={12}>                
                        <Row className="app-field weather app-bar">
                            <Col md={5} xs={12}>
                                <Row style={{height: '100%'}}>
                                  <Col md={12} sm={6} className="app-field city">
                                     <SelectCity/>                                 
                                  </Col>
                                  <Col md={12} sm={6} className="app-field interval">
                                    <SelectInterval />
                                  </Col>
                                </Row>
                            </Col>
                            <Col md={7} xs={12} >
                                <div className="app-field weather">
                                    <AppWeather {...props.currentWeather } full/>
                                </div>
                            </Col>                        
                        </Row>
                        <Row id='row-list'>
                            <Col className="app-field weather-content" >
                                <AppWeatherList />
                            </Col> 
                        </Row>
                   
                </Col>
          </Container>
          {/*<Navbar  fixed='bottom' className="footer">
                0
          </Navbar >*/}
    </>)



    return (
        <Container fluid>
            <BlockOptions/>                
        </Container>);   
}


const mapStateToProps = (store) => {
  return {
    city: store.options.city,
    interval: store.options.interval,
    cityData: store.weather.city,
    currentWeather: store.weather.list[store.options.item]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWeather: (data) => dispatch({type:'set_weather', data: data}),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);