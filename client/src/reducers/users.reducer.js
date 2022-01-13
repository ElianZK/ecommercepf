import{
    CREATE_USER,
    GET_USERS,
    LOGIN,
    LOGOUT,
    ERROR_LOGIN,
    UPDATE_USER,
    DELETE_USER,
    GET_USER_INFO,
    FORGOT_PASSWORD,
    RESET_PASSWORD
} from '../actions/actionsTypes'

const initialState = {
    loginInfo:{
        isVerified: false,
        user: {
            idUser: null,
        },
        lastUpdate: 0,
        error: false
    },
    error:null,

    updateInfo: null,

    registerInfo: null,

    forgot_password:'',
    reset_password:''
}

export function usersReducer(state = initialState, action){ 
    switch(action.type){
        case LOGIN:
            return{
                ...state, 
                loginInfo: {...action.payload}
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
            const {user} = action.payload;
            if(action.payload.from === "profile"){
                return{
                    ...state,
                    loginInfo: {user}
                }
            }else{
                return{
                    ...state
                }
            }
        }

        case DELETE_USER:{
            return{
                ...state,
                users:action.payload
            }
        }
        case GET_USER_INFO:
            return{
                ...state,
                users:action.payload
            }
        

        case FORGOT_PASSWORD:{
            return{
                ...state,
                forgot_password:action.payload
            }
        }

        case RESET_PASSWORD:{
            return{
                ...state,
                reset_password:action.payload
            }
        }

        default:
            return state;
    }
}

