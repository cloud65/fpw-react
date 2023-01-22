import React from "react";
import {Container, Row, Col } from 'react-bootstrap'
import {formatDate} from './formatDate'

const AppHeader=props=> {
    const {name, coord, population, timezone, sunrise, sunset} = props
    const {lon, lat} = coord || {}
    return (        
          <Container  fixed='top' className="header">
                <Row>
                    <Col md={4} xs={6} >Город: <span>{name}</span></Col>
                    <Col md={4} xs={6} >Население: <span>{population}</span></Col>
                    <Col md={4} xs={6} >lon:<span>{lon}</span> lat:<span>{lat}</span></Col>
                    <Col md={4} xs={6} >GMT <span>{(timezone>=0)? '+':''}{timezone/3600}</span> часов</Col>
                    <Col md={4} xs={6} >Восход: <span>{formatDate(sunrise+timezone)}</span></Col>                
                    <Col md={4} xs={6} >Закат: <span>{formatDate(sunset+timezone)}</span></Col>                
                </Row> 
          </Container>
    )
}

export default AppHeader