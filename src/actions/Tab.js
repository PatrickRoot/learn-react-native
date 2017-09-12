import {TAB_CHANGE} from "../constants/types";

export function changeTab(tabName) {
    return {
        'type': TAB_CHANGE,
        'tabName': tabName,
    }
}