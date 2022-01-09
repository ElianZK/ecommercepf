import{
    CREATE_USER,
    GET_USERS,
    LOGIN,
    LOGOUT,
    ERROR_LOGIN,
    //RESET,
    RESET,
    UPDATE_USER,
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
    switch(action.type){
        case LOGIN:
            // const {idUser, name, lastname, email, phone, image} = action.payload;

            const newState = {
                ...state,
                loginInfo: action.payload,
                // updateInfo: action.payload
            }

            console.log(newState)

            return newState;
        
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
            if(action.payload.from === "profile"){
                return{
                    ...state,
                    loginInfo: action.payload
                }
            }else{
                return{
                    ...state
                }
            }
        }

        default:
            return state;
    }
}

