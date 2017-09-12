import {combineReducers} from 'redux';
import User from './User';
import NavFirst from './NavFirst';
import NavSecond from './NavSecond';
import NavThird from './NavThird';
import FirstList from './FirstList';
import Tab from './Tab';

export default combineReducers({
    UserStore: User,
    NavFirstStore: NavFirst,
    NavSecondStore: NavSecond,
    NavThirdStore: NavThird,
    TabStore: Tab,
    FirstListStore: FirstList,
});