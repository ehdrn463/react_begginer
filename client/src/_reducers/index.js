import {combineReducers} from 'redux'
import user from './user_reducer';
// import comment from './comment_reducer';

const rootReducer = combineReducers({
    user
    // comment
    // .. 기능 계속 추가
})

export default rootReducer;