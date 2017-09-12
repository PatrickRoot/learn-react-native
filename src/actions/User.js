import {
    Toast,
} from 'antd-mobile';
import {
    
    CHECK_LOGIN_ING, CHECK_LOGIN_IN, CHECK_LOGIN_OUT, CHECK_LOGIN_ERROR,
    LOGGED_DOING, LOGGED_IN, LOGGED_OUT, LOGGED_ERROR,
} from "../constants/types";

/**
 * 登录 action，action 是。。。 。。。
 * @param opt
 * @returns {function(*)}
 */
export function logIn(opt) {
    let formData = new FormData();
    formData.append("username", opt.username);
    formData.append("password", opt.password);
    
    var fetchOptions = {
        method: 'POST',
        headers: {
            'accessToken': '',
            'client': 'mobile',
            'version': '0.0.1',
            'deviceId': '1234567890',
            'latitude': '123',
            'longitude': '101',
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    };
    var url = "https://testbid.zcjb.com.cn/api/mem/login.htm";
    // var url = "http://192.168.1.62:8000/api/mem/login.htm";
    //
    // fetch(url, fetchOptions)
    //     .then((response) => response.text())
    //     .then((responseText) => {
    //         var data = JSON.parse(responseText);
    //         if (data.errCode == 1) {
    //             AsyncStorage.setItem("accessToken", data.accessToken, function (errs) {
    //                 if (errs) {
    //                     Toast.fail("保存登录信息失败", 1);
    //                 }
    //             });
    //             that.props.loginSuccess();
    //         } else {
    //             Toast.fail(data.errMsg, 1);
    //         }
    //     }).done();
    
    return (dispatch) => {
        dispatch({'type': LOGGED_DOING});
        let inner_get = fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                var data = JSON.parse(responseText);
                dispatch({
                    'type': LOGGED_IN,
                    user: data,
                });
            }).catch((e) => {
                Toast.fail(e.message, 1);
                dispatch({
                    'type': LOGGED_ERROR
                });
            })
    }
}

/**
 * 退出
 * @returns {{type}}
 */
export function logOut() {
    return {
        'type': LOGGED_OUT
    }
}

export function checkLogin() {
    let accessToken = globalStore.getState().UserStore.user.accessToken;
    if (accessToken) {
        return (dispatch) => {
            dispatch({'type': CHECK_LOGIN_ING});
            
            let inner_get = new Promise((resolve, reject) => {
                
                let formData = new FormData();
                formData.append("orderId", 1);
                
                var fetchOptions = {
                    method: 'POST',
                    headers: {
                        'accessToken': accessToken,
                        'client': 'mobile',
                        'version': '0.0.1',
                        'deviceId': '1234567890',
                        'latitude': '123',
                        'longitude': '101',
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                };
                var url = "https://testbid.zcjb.com.cn/api/mem/order/manage/viewOrder.htm";
                // var url = "http://192.168.1.62:8000/api/mem/order/manage/viewOrder.htm";
                
                fetch(url, fetchOptions)
                    .then((response) => response.text())
                    .then((responseText) => {
                        var data = JSON.parse(responseText);
                        if (data.errCode == 1 && data.errCode != 40000) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }).done();
            });
            
            inner_get.then((value) => {
                if (value) {
                    dispatch({
                        'type': CHECK_LOGIN_IN
                    });
                } else {
                    dispatch({
                        'type': CHECK_LOGIN_OUT
                    });
                }
            }).catch((e) => {
                Toast.fail(e.message, 1);
                dispatch({
                    'type': CHECK_LOGIN_ERROR
                });
            });
        }
    } else {
        return {
            'type': CHECK_LOGIN_OUT
        }
    }
}