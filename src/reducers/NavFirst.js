import React from 'react';
import {
    NavigationActions,
} from 'react-navigation';

import * as TYPES from '../constants/types';
import FirstNavigator from '../navigators/FirstNavigator';

const initialNavState = {
    index: 0,
    routes: [
        {key: 'FirstList', routeName: 'FirstList'},
    ],
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
export default function NavFirst(state = initialNavState, action) {
    switch (action.type) {
        case TYPES.NAV_1_LIST:
            return FirstNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'FirstList'}), state);
        
        case TYPES.NAV_1_DETAIL:
            return FirstNavigator.router.getStateForAction(NavigationActions.navigate({
                routeName: 'FirstDetail',
                params: {
                    order: action.order
                }
            }), state);
        
        case TYPES.NAV_1_BACK:
            return FirstNavigator.router.getStateForAction(NavigationActions.back(), state);
        
        default:
            return FirstNavigator.router.getStateForAction(action, state);
    }
}