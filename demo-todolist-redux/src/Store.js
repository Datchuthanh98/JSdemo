import Data from './Components/Data.json';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const noteInitialState = {
  listItems: [],
  hienthiformedit: false,
  hienthiformadd: false,
  itemedit: {}
};

const allItem = (state = noteInitialState, action) => {
  switch (action.type) {
    case "GET_ALL":
      return {...state, listItems: action.data}

    case "ADD":
      return { ...state, listItems: [action.data,...state.listItems] }

    case "GET_ADD":
      return { ...state, hienthiformadd: !state.hienthiformadd }


    case "EDIT":
      return { ...state, hienthiformedit: !state.hienthiformedit }

    case "GET_EDIT":
      return { ...state, itemedit: action.item }

    case "OK_EDIT":
      return {
        ...state, listItems: state.listItems.map(_todo => {
          if (_todo.id === action.data.id) {
            return action.data;
          }
          return _todo
        })
      }

    case "DEL":
      return { ...state, listItems: state.listItems.filter(item => item.id !== action.data) }

    default:
      return state
  }
}

const store = createStore(
  allItem,
  composeWithDevTools(applyMiddleware(thunk))
);
 
export default store;