import * as TYPES from '../constants/types';

const initialState = {
    isChecking: true,
    isLoggedIn: false,
    user: {},
    status: 'doing',
};

/**
 * reducer 处理... ...
 * 1. initialState定义了最开始的应用状态（未登录）
 * 2. 传入 action，传出 state
 * 3. 不同 action，返回不同
 *
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export default function User(state = initialState, action) {
    switch (action.type) {
        case TYPES.CHECK_LOGIN_ING:
            return {
                ...state,
                isChecking: true,
                status: 'doing',
            };
        case TYPES.CHECK_LOGIN_IN:
            return {
                ...state,
                isChecking: false,
                isLoggedIn: true,
                status: 'done',
            };
        case TYPES.CHECK_LOGIN_OUT:
            return {
                ...state,
                isChecking: false,
                isLoggedIn: false,
                status: 'done',
            };
        case TYPES.CHECK_LOGIN_ERROR:
            return {
                ...state,
                isChecking: false,
                isLoggedIn: false,
                status: 'done',
            };
    
    
        case TYPES.LOGGED_DOING:
            return {
                ...state,
                status: 'doing'
            };
    
        case TYPES.LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                status: 'done'
            };
    
        case TYPES.LOGGED_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                status: null
            };
        case TYPES.LOGGED_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                status: null
            };
        default:
            return state;
    }
}