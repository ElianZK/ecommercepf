import{
    LOGIN,
    LOGOUT,
    ERROR_LOGIN,
    //RESET,
} from '../actions/actionsTypes'

const initialState = {
    loginInfo:{
        isVerified: false,
        user: {
            token: null,
        },
        lastUpdate: 0
    },
    error:null
}

export function usersReducer(state = initialState, action){   
    switch(action.type){
        case LOGIN:
            return{
                ...state, loginInfo: action.payload
            }
        
        case LOGOUT:
            return{
                ...initialState
            }
        case ERROR_LOGIN:
            return{
                ...state,
                error:action.payload
            }
        default:
            return state;
    }
}

