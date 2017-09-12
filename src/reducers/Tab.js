import * as TYPES from '../constants/types';

const initialState = {
    selectTab: 'firstTab',
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
        case TYPES.TAB_CHANGE:
            return {
                ...state,
                selectTab: action.tabName,
            };
        
        default:
            return state;
    }
}