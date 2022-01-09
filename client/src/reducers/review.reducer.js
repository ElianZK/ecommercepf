import {
    CREATE_REVIEWS,
    GET_REVIEWS
} from '../actions/actionsTypes';

const initialState = {
    create_review :{},
    getreview:[]
}

export default function usersReducer(state = initialState, action){

    if (action.type ===CREATE_REVIEWS) {
        return {
            ...state,
            create_review:action.payload
        }
    }

    if (action.type ===GET_REVIEWS ) {
        console.log('object gget revi :>> ', action.payload);
        return {
            ...state,
            getreview: action.payload
        }
    }

    return state

}