import React from "react";
import { connect } from 'react-redux';
import {Dropdown, Form, Button} from 'react-bootstrap'


const SelectCity=props=> {
    const [textCity, setTextCity] = React.useState('');
    const [isShowList, setShowList] = React.useState(true);
    
    const listFilter=({capital})=>{
         return !capital || capital.toLowerCase().startsWith(textCity.toLowerCase())
    }
    
    React.useEffect(()=>setTextCity(props.city), [props.city]) //Обновляем state из props
    
    React.useEffect(()=>{
        const filtredItems = props.listCity.filter(listFilter);
        let isShowList = !!textCity;
        if (filtredItems.length==1 && filtredItems[0].capital===textCity.trim()){
            setTextCity(filtredItems[0].capital);
            props.setCity(filtredItems[0].capital);
            isShowList = false;
        }
        setShowList(isShowList); 
    }, [textCity]) //если совпадение только одно, то устанавливем значение
    
    const handleChange=({target})=>{
        setTextCity(target.value)
    };
    
    const handleClickFind=({target})=>{
        props.setCity(textCity);
        setShowList(false);         
    };
    

    const items = props.listCity.filter(listFilter).splice(0, 10).map( ({capital,id})=> {
        return <Dropdown.Item key={id} href="#"
                    onClick={()=>setTextCity(capital)}>
            {capital}
          </Dropdown.Item>
    });
    
    return (<div className="mb-3 app-field city-block">   
        <Dropdown autoClose={false} show={items.length && isShowList} >        
          <Form.Control 
              autoFocus
              className="mx-3 w-auto"
              placeholder="Поиск города"
              onChange={handleChange}
              value={textCity}
            />
        <Dropdown.Menu>
            {items}
        </Dropdown.Menu>
      </Dropdown> 
      <Button variant="outline-success" onClick={handleClickFind} disabled={!textCity}>
        Поиск
      </Button> 
      </div>      
 );   
}


const mapStateToProps = (store) => {    
  return {
    listCity: store.options.listCity,
    city: store.options.city,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCity: (city) => dispatch({type:'set_city', data: city}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCity);
