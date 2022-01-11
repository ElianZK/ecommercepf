import{
    CREATE_USER,
    GET_USERS,
    LOGIN,
    LOGOUT,
    ERROR_LOGIN,
    //RESET,
    RESET,
    UPDATE_USER,
    DELETE_USER,
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

    registerInfo: null
}

export function usersReducer(state = initialState, action){ 
    console.log(action);
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

            console.log(user)
            console.log(action.payload.from)

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
                ...state
            }
        }

        default:
            return state;
    }
}

