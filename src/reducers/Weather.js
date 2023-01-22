const initialState = {
    city: {name: '', population: 0, sunrise:0, sunset:0, timezone:0 },
    list: []
};

//const reducerWeather =


export const reducerWeather = (state = initialState, action) => {
    //console.log(state)
  switch (action.type) {
        case 'set_weather':
          return { ...state, ...action.data };
        

        default:
          return state;
    }
}