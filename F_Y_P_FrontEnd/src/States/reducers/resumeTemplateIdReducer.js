export const resumeReducer = (state = {
    "name":"David Watson"
}, action) => {
    if (action.type == 'addPersonalInfo') {
        state = { ...state, [action.payload.name]: action.payload.value }
        return state;
    }
    else {
        return state;
    }
}