import {
    CREATE_REVIEWS,
    GET_REVIEWS,
    DELETE_REVIEW,
    UPDATE_REVIEW
} from '../actions/actionsTypes';

const initialState = {
    create_review :{},
    getreview:[],
    update_review:{}
}

export default function usersReducer(state = initialState, action){

    if (action.type ===CREATE_REVIEWS) {
        return {
            ...state,
            create_review:action.payload
        }
    }

    if (action.type ===GET_REVIEWS ) {
        // console.log('object gget revi :>> ', action.payload);
        return {
            ...state,
            getreview: action.payload
        }
    }

    if (action.type ===DELETE_REVIEW ) {
        // console.log('object gget revi :>> ', action.payload);
        return {
            ...state,
            getreview: state.getreview.filter(e=> e.idReviews!== action.payload.idReviews)
        }
    }
    // if (action.type ===UPDATE_REVIEW) {
    //     return {
    //         ...state,
    //         update_review:action.payload
    //     }
    // }

    return state

}