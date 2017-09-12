import * as TYPES from '../constants/types';

const initialState = {
    hasNextPage: true,
    totalRecords: 0,
    pageSize: 20,
    pageNo: 0,
    data: [],
    isRefreshing: true,
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
export default function FirstList(state = initialState, action) {
    switch (action.type) {
        case TYPES.FIRST_LIST_LOADING:
            return {
                ...state,
                isRefreshing: true,
            };
        case TYPES.FIRST_LIST_ERROR:
            return {
                ...state,
                isRefreshing: false,
            };
        case TYPES.FIRST_LIST_NO_MORE:
            return {
                ...state,
                isRefreshing: false,
                hasNextPage: false,
            };
        case TYPES.FIRST_LIST_LOAD_DONE:
            return {
                ...state,
                isRefreshing: false,
                ...action.newData
            };
        
        default:
            return state;
    }
}