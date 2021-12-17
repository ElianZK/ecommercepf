import{
    LOGIN,
    LOGOUT,
    RESET,
} from '../actions/actionsTypes'

const initialState = {
    loginInfo:{
        isVerified: false,
        user: {
            token: null,
        },
        lastUpdate: 0
    }
}

export function usersReducer(state = initialState, action){   
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                loginInfo: action.payload
            }
        
        case LOGOUT:
            return{
                ...initialState
            }
        default:
            return state;
    }
}

