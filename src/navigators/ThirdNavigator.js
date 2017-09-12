import {
    StackNavigator,
} from 'react-navigation';

import FirstList from '../pages/first/FirstList';
import FirstDetail from "../pages/first/FirstDetail";

export default FirstNavigator = StackNavigator({
    FirstList: {
        screen: FirstList,
    },
    FirstDetail: {
        screen: FirstDetail,
    },
}, {
    initialRouteParams: {
        testParam: function (msg) {
            alert(msg)
        }
    }
});