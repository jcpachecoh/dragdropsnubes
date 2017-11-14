import * as types from '../constants/ActionTypes';

const initialState = {
  trainsById: [
    {
      locomotive: 'Theodore Roosevelt',
      carriages: ['1','2','3',]
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_LOCOMOTIVE:
      return {
        ...state,
        trainsById: [
          ...state.trainsById,
          {
            locomotive: action.name,
            sex: action.sex
          }
        ],
      };
    case types.ADD_CARRIAGE:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => index !== action.id)
      };
 
    default:
      return state;
  }
}