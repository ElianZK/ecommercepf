import{
    CREATE_USER,
    GET_USERS,
    LOGIN,
    LOGOUT,
    RESET,
    UPDATE_USER,
} from '../actions/actionsTypes'

const initialState = {
    loginInfo:{
        isVerified: false,
        user: {
            token: null,
        },
        lastUpdate: 0
    },

    registerInfo: null
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

        case CREATE_USER:
            return{
                ...state,
                registerInfo: action.payload
            }

        case GET_USERS:
                return{
                    ...state,
                    users: action.payload
                }

        case UPDATE_USER:{
            console.log("user en reducer " + action.payload)
            return{
                ...state
            }
        }

        default:
            return state;
    }
}

