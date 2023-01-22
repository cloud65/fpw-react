import getListCity from '../const/getListCity';

const initialState = {
    interval: 1,
    listCity: getListCity().sort((a,b)=> a.capital>b.capital ? 1 : -1),
    city: '',
    item:0,
};


export const reducerOptions=(state = initialState, action) => {
    switch (action.type) {
        case 'set_city':
          return { ...state, city: action.data };
        case 'set_interval':
          return { ...state, interval: action.data };
        case 'set_item':
          return { ...state, item: action.data };

        default:
          return state;
    }
    
    
  return state;
}