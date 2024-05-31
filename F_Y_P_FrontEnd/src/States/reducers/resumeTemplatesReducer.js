export const addResumeTemplatesReducer = (state=[], action)=>{
    if(action.type === 'addResumeTemplates'){
        if(action.payload)
            return action.payload;
        return null
    }
    else {
        return state
    }
}