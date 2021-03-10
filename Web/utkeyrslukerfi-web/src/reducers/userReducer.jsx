import { GET_USERS } from '../constants';

export default function (state = [], action) {
    switch (action.type) {
        case GET_USERS: return action.payload;
        default: return state;
    }
}