import{
    LOGIN,
    LOGOUT,
} from '../actions/actionsTypes'

const initialState = {
    loginInfo:{
        isConnected: false,
        user: {
            name: "",
            email: ""
        }
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
                ...state,
                loginInfo: action.payload
            }
        default:
            return state;
    }
}

