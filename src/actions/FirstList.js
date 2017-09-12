import {
    Toast,
} from 'antd-mobile';
import {
    FIRST_LIST_ERROR, FIRST_LIST_LOAD_DONE, FIRST_LIST_LOADING, FIRST_LIST_NO_MORE,
    LOGGED_OUT
} from "../constants/types";

export function getFirstListOrders() {
    let accessToken = globalStore.getState().UserStore.user.accessToken;
    let store = globalStore.getState().FirstListStore;
    if (store.hasNextPage) {
        
        let formData = new FormData();
        formData.append("pageNo", store.pageNo + 1);
        formData.append("pageSize", store.pageSize);
        
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
        var url = "https://testbid.zcjb.com.cn/api/mem/order/manage/queryOrder.htm";
        // var url = "http://192.168.1.78:8000/api/mem/order/manage/queryOrder.htm";
        
        return (dispatch) => {
            dispatch({'type': FIRST_LIST_LOADING});
            let inner_get = fetch(url, fetchOptions)
                .then((response) => response.text())
                .then((responseText) => {
                    var data = JSON.parse(responseText);
                    if (data.errCode == 1) {
                        if (data.errCode == 40000) {
                            Toast.fail("登录失效", 1);
                            dispatch({'type': LOGGED_OUT});
                        } else {
                            let pageNo = data.pageInfo.pageNo;
                            let totalPages = data.pageInfo.totalPages;
                            let hasNextPage = true;
                            if (pageNo == totalPages) {
                                hasNextPage = false;
                            }
                            let oldData = store.data;
                            let newData = data.memInfoLinkList;
                            if (newData && newData.length > 0) {
                                // for (let obj of newData) {
                                //     obj.key = obj.orderCode;
                                // }
                                oldData.push.apply(oldData, newData);
                            }
                            
                            dispatch({
                                'type': FIRST_LIST_LOAD_DONE,
                                newData: {
                                    hasNextPage: hasNextPage,
                                    totalRecords: data.pageInfo.totalRecords,
                                    pageSize: data.pageInfo.pageSize,
                                    pageNo: data.pageInfo.pageNo,
                                    data: oldData,
                                }
                            });
                        }
                    } else {
                        Toast.fail("请求数据失败", 1);
                        dispatch({
                            'type': FIRST_LIST_ERROR,
                        });
                    }
                }).catch((e) => {
                    Toast.fail(e.message, 1);
                    dispatch({
                        'type': FIRST_LIST_ERROR
                    });
                })
        }
        
    } else {
        Toast.info("没有更多数据了", 1);
        return {
            'type': FIRST_LIST_NO_MORE
        }
    }
}