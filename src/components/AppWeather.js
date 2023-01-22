import React from "react";
import {Container, Row, Col, Image   } from 'react-bootstrap'
import {formatDate} from './formatDate'

const AppWeather=props=> {
    const {dt, main, wind, weather, visibility, rain, snow, full} = props
    if (!weather) return null
    const {description, icon} = weather[0]
    
    const sizeIcon = (full) ? '@2x' : ''    
    const urlIcon = `http://openweathermap.org/img/wn/${icon}${sizeIcon}.png`
    
    const {temp, feels_like, grnd_level, humidity} = main
    
    const strRain = (rain) ? `${rain['3h']}мм` : (snow) ? `${snow['3h']}мм` : ''
    
    const block=(<>
        <Container className='small'>
            {formatDate(dt, true)}
        </Container>
        { !full && <Container>
           <span>{temp}&#176;</span>
        </Container> }
        <Container>
            <Image src={urlIcon}/> 
        </Container>
    </>)
    
    if (!full) return block
    return (        
          <Container>
            <Row>
                <Col md={3} xs={3} className="text-center">
                    {block}                    
                    <Container>
                        {strRain}
                    </Container>
                </Col>
                <Col md={9} xs={9}>
                    <Container>
                        {description}
                    </Container>
                    <Container>
                        Температура: <span>{temp}&#176;</span>
                    </Container>
                    <Container>
                        Ощущаемая температура: <span>{feels_like}&#176;</span>
                    </Container>
                    <Container>
                        Давление: <span>{grnd_level}</span> гПа
                    </Container>
                    <Container>
                        Влажность: <span>{humidity}</span> %
                    </Container>
                    <Container>
                        Ветер: <span>{wind.speed}</span>м/с (пор. <span>{wind.gust}</span>м/с)
                    </Container>
                </Col>
            </Row>
          </Container>
    )
}

export default AppWeather;