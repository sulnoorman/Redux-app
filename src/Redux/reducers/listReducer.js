import { GET_ALL_LIST, GET_LIST, LIST_ERROR, CREATE_LIST, UPDATE_LIST, DELETE_LIST, CREATE_PHOTO } from "../actions/types";

const initialState = {
    data: [],
    detailList: [],
    deleteList: false,
    photo: "",
    status: "",
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_LIST:
            return{
                ...state,
                data: action.payload,
                detailList: []
            };
        case GET_LIST:
            return{
                ...state,
                data: [],
                detailList: action.payload
            }
        case LIST_ERROR:
            return{
                ...state,
                status: action.payload.status
            };
        case CREATE_LIST:
            return{
                ...state,
            }
        case CREATE_PHOTO:
            return{
                ...state,
                photo: action.payload
            }
        case UPDATE_LIST:
            return{
                ...state,
            }
        case DELETE_LIST:
            return{
                ...state,
                deleteList: true
            }
        default:
            return state;
    }
}

export default listReducer;