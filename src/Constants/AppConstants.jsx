import history from '../history';
import $ from 'jquery';
import Bowser from "bowser";

import CryptoJS from 'crypto-js';
import aes from 'crypto-js/aes';
import encHex from 'crypto-js/enc-hex';
import padZeroPadding from 'crypto-js/pad-zeropadding';
export const APP_VERSION = '2.5.0';
export const USE_BOWSER = true;
export const IS_DEMO_SITE = false;
export const ENABLE_MEAL = false;
export const DEMO_SITE_WARNING_TEXT = '"This is not a real site. It\'s development and testing site."';

//For staging server
// export const BASE_URL = 'https://staging-customer.prestigelabsaffs.com/';
// export const BASE_DOMAIN = '.prestigelabs.com';
// export const ECOM_URL = 'https://staging-manage.prestigelabsaffs.com/';
// export const API_URL = 'https://staging-api.prestigelabsaffs.com/';
// export const DISTRIBUTOR_URL = 'https://staging-affiliate.prestigelabsaffs.com/';
// export const CUSTOMER_URL = 'https://staging-customer.prestigelabsaffs.com/';
// export const REFER_URL = 'https://staging-refer.prestigelabsaffs.com/';
// export const PUBLIC_URL = 'https://staging-manage.prestigelabsaffs.com/';

//For development server
export const BASE_URL = 'https://dev-customer.prestigelabsaffs.com/';
export const BASE_DOMAIN = '.prestigelabs.com';
export const ECOM_URL = 'https://dev-manage.prestigelabsaffs.com/';
export const API_URL = 'https://dev-api.prestigelabsaffs.com/';
export const DISTRIBUTOR_URL = 'https://dev-affiliate.prestigelabsaffs.com/';
export const CUSTOMER_URL = 'https://dev-customer.prestigelabsaffs.com/';
export const REFER_URL = 'https://dev-refer.prestigelabsaffs.com/';
export const PUBLIC_URL = 'https://dev-manage.prestigelabsaffs.com/';
//For new production test server
/*
export const BASE_URL = 'https://p8-prod-customer.prestigelabs.com/';
export const BASE_DOMAIN = '.prestigelabs.com';
export const ECOM_URL = 'https://prestigelabs.com/';
export const API_URL = 'https://prod-api-p8.prestigelabs.com/';
export const DISTRIBUTOR_URL = 'https://p8-prod-affiliate.prestigelabs.com/';
export const CUSTOMER_URL = 'https://p8-prod-customer.prestigelabs.com/';
export const REFER_URL = 'https://p8-prod-refer.prestigelabs.com/';
export const PUBLIC_URL = 'https://prestigelabs.com/';
*/

//For development server
/*
export const BASE_URL = 'https://newdev-customer.protibimbo.com/';
export const BASE_DOMAIN = '.protibimbo.com';
export const ECOM_URL = 'https://newdev-public.protibimbo.com/';
export const API_URL = 'https://newdev-api.protibimbo.com/';
export const DISTRIBUTOR_URL = 'https://newdev-affiliate.protibimbo.com/';
export const CUSTOMER_URL = 'https://newdev-customer.protibimbo.com/';
export const REFER_URL = 'https://newdev-refer.protibimbo.com/';
export const PUBLIC_URL = 'https://newdev-public.protibimbo.com/';
*/


//For local server
/*
export const BASE_URL = 'https://localhost:3001/';
export const BASE_DOMAIN = '.localhost';
export const ECOM_URL = 'http://localhost:3003/';
export const API_URL = 'https://dev-api.prestigelabs.com/';
export const DISTRIBUTOR_URL = 'https://localhost:3000/';
export const CUSTOMER_URL = 'https://localhost:3001/';
export const REFER_URL = 'https://localhost:3002/';
export const PUBLIC_URL = 'http://localhost:3003/';
*/

export const API_KEY = 'cp/W?^,([{,O_+T';
export const SITE = 'customer';
export const DOWNTIME_ACCESS_CODE = 'wewillbeup';

export const SITEDOWN_DATA = {
    "downtime_status": 1,
    "server_down": 1,
    "downtime_access_validity": 'invalid',
    "downtime_message": '<h3>A technical error has occurred</h3><p>Please try again in a few minutes. Thanks!</p>',
};

export const SET_STORAGE = (name, value) => {
    return localStorage.setItem(name, value);
}
export const GET_STORAGE = (name) => {
    return localStorage.getItem(name);
}
export const REMOVE_STORAGE = (name) => {
    return localStorage.removeItem(name);
}
export const ENCRYPT_SECRET_KEY = '123456';
export const USER = 'plu';

export const CRYPTO_KEY = '0123456789abcdef0123456789abcdef';
export const IV_KEY = 'abcdef9876543210abcdef9876543210';

let COOKIE_EXP_DAY_P = 5;
if (GET_STORAGE('settings')) {
    const settings = JSON.parse(GET_STORAGE('settings'));
    COOKIE_EXP_DAY_P = (settings.cookie_exp_day) ? parseInt(settings.cookie_exp_day) : 7;
}
export const COOKIE_EXP_DAY = COOKIE_EXP_DAY_P;

export function SET_COOKIE(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (COOKIE_EXP_DAY * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function SET_LOGIN_COOKIE(data) {
    let expireAfter = new Date();
    //setting up cookie expire date after 10 minutes
    expireAfter.setMinutes(expireAfter.getMinutes() + 10)
    //now setup cookie
    document.cookie = USER + "=" + data + "; domain=" + BASE_DOMAIN + "; expires=" + expireAfter.toUTCString() + "; path=/";
}

export function DELETE_LOGIN_COOKIE() {
    let expireAfter = new Date();
    const exdays = -1;
    //setting up cookie expire date after 10 minutes
    expireAfter.setTime(expireAfter.getTime() + (exdays * 24 * 60 * 60 * 1000));
    //now setup cookie
    document.cookie = USER + "='data'; domain=" + BASE_DOMAIN + "; expires=" + expireAfter.toUTCString() + "; path=/";
}

export function GET_COOKIE(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function DELETE_COOKIE(cname) {
    var cvalue = '', exdays = -1;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export function CRYPTO_ENCRYPTION(data) {
    let key = encHex.parse(CRYPTO_KEY);
    let iv = encHex.parse(IV_KEY);
    let encrypted = aes.encrypt(data, key, { iv: iv, padding: padZeroPadding }).toString();
    return encrypted;
}

export const CURRENCY_FORMAT = (amount) => {
    if (typeof (amount) !== "undefined" && amount !== null) {
        if (Number(amount) <= 0) {
            amount = 0.00;
        }
        const settings = JSON.parse(GET_STORAGE('settings'));
        if (settings) {
            const c_format = settings.currency_format;
            const splietd = c_format.replace("{amount}", parseFloat(amount.toString().replace(',', '')).toFixed(2));
            return splietd;
        } else {
            return "$" + parseFloat(amount.toString().replace(',', '')).toFixed(2) + " USD";
        }
    } else {
        return "$ 0.00 USD";
    }
}

export const NEXT_MONTH = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

export const CART_SUB_TOTAL = () => {
    if (GET_STORAGE('cart')) {
        let cart = JSON.parse(GET_STORAGE('cart'));
        let subTotal = 0;
        cart.forEach(function (item, key) {
            if (item.subscription == "yes") {
                subTotal = Number(subTotal) + Number(item.cart_discount_price * item.quantity);
            } else {
                subTotal = Number(subTotal) + Number(item.cart_sale_price * item.quantity);
            }
        });
        return subTotal;
    }
    return 0;
}

export const RECURRING_CART_SUB_TOTAL = () => {
    if (GET_STORAGE('cart')) {
        let cart = JSON.parse(GET_STORAGE('cart'));
        let subTotal = 0;
        cart.forEach(function (item, key) {
            if (item.subscription == "yes") {
                subTotal = Number(subTotal) + Number(item.cart_discount_price * item.quantity);
            }
        });
        return subTotal;
    }
    return 0;
}

export const COUNT_SUBSCRIPTION = () => {
    let count = 0;
    if (GET_STORAGE('cart')) {
        let cart = JSON.parse(GET_STORAGE('cart'));
        cart.forEach(function (item, key) {
            if (item.subscription == "yes") {
                count = Number(count) + 1;
            }
        });
    }
    return count;
}

export const ITEM_COUNT = (e) => {
    if (GET_STORAGE('cart')) {
        return JSON.parse(GET_STORAGE('cart')).length;
    } else {
        return 0;
    }
}

export const ITEM_COUNT_SUSBSCRIPTION = (e) => {
    if (GET_STORAGE('subscriptionItem')) {
        return JSON.parse(GET_STORAGE('subscriptionItem')).length;
    } else {
        return 0;
    }
}

export const CHECK_STORAGE = () => {
    if (COUNT_SUBSCRIPTION() === 0) {
        REMOVE_STORAGE("firstRenewal");
        REMOVE_STORAGE("recurringCartTotal");
    }

    if (ITEM_COUNT() === 0) {
        REMOVE_STORAGE("cart");
        REMOVE_STORAGE("cartTotal");
        history.push("/");
    }
}

export const DESTROY_CART = () => {
    REMOVE_STORAGE("cart");
    REMOVE_STORAGE("cartMethodId");
    REMOVE_STORAGE("cartTotal");
    REMOVE_STORAGE("recurringCartMethodId");
    REMOVE_STORAGE("recurringCartTotal");
    REMOVE_STORAGE("firstRenewal");
    REMOVE_STORAGE("coupon");
    REMOVE_STORAGE("subscriptionItem");
    REMOVE_STORAGE("meals");

    AJAX_REQUEST("POST", "cart/emptySaveItems", {}).then(results => {
        if (results.response.code === 1000) {
            // console.log(results.response.message);
        }
    });

}

export const DESTROY_ALL_CART = () => {
    REMOVE_STORAGE("cart");
    REMOVE_STORAGE("cartMethodId");
    REMOVE_STORAGE("cartTotal");
    REMOVE_STORAGE("recurringCartMethodId");
    REMOVE_STORAGE("recurringCartTotal");
    REMOVE_STORAGE("firstRenewal");
    REMOVE_STORAGE("coupon");
    REMOVE_STORAGE("subscriptionItem");
    REMOVE_STORAGE("meals");
}

export function AJAX_REQUEST(type = 'GET', additional_url, data) {
    const c_user = JSON.parse(GET_STORAGE(USER));
    data.api_key = API_KEY;
    data.site = SITE;
    if (c_user) {
        // data.user_token = c_user.token;
    } else {
        history.push('/login');
    }

    let rdata = '';

    if (c_user) {
        let promise = $.Deferred();
        $.ajax({
            type: type,
            url: API_URL + additional_url,
            data: data,
            headers: {
                'Authorization': `Bearer ${c_user.token}`
            },
            timeout: 60000,
            success: function (resp) {
                if (resp) {
                    if (typeof (resp) === 'object') {
                        if (resp.hasOwnProperty('response')) {
                            if (resp.response.hasOwnProperty('code')) {
                                promise.resolve(resp);
                            } else {
                                const respo = {
                                    "response": {
                                        "code": 5000,
                                        "status": "success",
                                        "message": "Something went wrong. Please try again.",
                                    }
                                };
                                promise.resolve(respo);
                            }
                        } else {
                            const respo = {
                                "response": {
                                    "code": 5000,
                                    "status": "success",
                                    "message": "Something went wrong. Please try again.",
                                }
                            };
                            promise.resolve(respo);
                        }
                    } else {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                            }
                        };
                        promise.resolve(respo);
                    }
                } else {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please refresh the page again.",
                        }
                    };
                    promise.resolve(respo);
                }
            },
            error: function (resp, textStatus) {
                if (textStatus === 'timeout') {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Connection timeout. Please try again.",
                        }
                    };
                    promise.resolve(respo);
                } else {
                    if (resp.status === 500) {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                                "originalMessage": resp.responseText,
                            }
                        };
                        promise.resolve(respo);
                    } else {
                        SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                        history.push("/error");
                    }
                }
            }
        });
        rdata = promise.promise();

        // $.ajaxSetup({
        //     headers: {
        //       'Authorization': `Bearer ${c_user.token}`,
        //       'Access-Control-Allow-Headers': "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        //     }
        // });
        // rdata = $.ajax({
        //     type: type,
        //     // beforeSend: function (xhr) {
        //     //     xhr.setRequestHeader ("Authorization", `Bearer ${c_user.token}`);
        //     // },
        //     // header: {
        //     //     'Authorization':`Bearer ${c_user.token}`
        //     // },
        //     url: API_URL + additional_url,
        //     data: data
        // });
    } else {
        let promise = $.Deferred();
        $.ajax({
            type: type,
            url: API_URL + additional_url,
            data: data,
            timeout: 60000,
            success: function (resp) {
                if (resp) {
                    if (typeof (resp) === 'object') {
                        if (resp.hasOwnProperty('response')) {
                            if (resp.response.hasOwnProperty('code')) {
                                promise.resolve(resp);
                            } else {
                                const respo = {
                                    "response": {
                                        "code": 5000,
                                        "status": "success",
                                        "message": "Something went wrong. Please try again.",
                                    }
                                };
                                promise.resolve(respo);
                            }
                        } else {
                            const respo = {
                                "response": {
                                    "code": 5000,
                                    "status": "success",
                                    "message": "Something went wrong. Please try again.",
                                }
                            };
                            promise.resolve(respo);
                        }
                    } else {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                            }
                        };
                        promise.resolve(respo);
                    }
                } else {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please refresh the page again.",
                        }
                    };
                    promise.resolve(respo);
                }
            },
            error: function (resp, textStatus) {
                if (textStatus === 'timeout') {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Connection timeout. Please try again.",
                        }
                    };
                    promise.resolve(respo);
                } else {
                    if (resp.status === 500) {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                                "originalMessage": resp.responseText,
                            }
                        };
                        promise.resolve(respo);
                    } else {
                        SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                        history.push("/error");
                    }
                }
            }
        });
        rdata = promise.promise();

        // rdata = $.ajax({
        //     type: type,
        //     url: API_URL + additional_url,
        //     data: data
        // });
    }

    rdata.then(results => {
        const response = results.response;
        if ((parseInt(response.code) === 4001) || (parseInt(response.code) === 1001)) {
            history.push('/login');
            // const c_user = JSON.parse(GET_STORAGE(USER));
            // if(c_user){
            //     console.log(c_user);
            // }
        }
        // if(parseInt(response.code)===1004){
        //     if(history.goBack(1)){
        //         history.goBack(1);
        //     }else{
        //         history.push('/my-account');
        //     }
        // }
    });
    return rdata;
}

export function AJAX_REQUEST_WITH_FILE(type = 'GET', additional_url, data) {
    const c_user = JSON.parse(GET_STORAGE(USER));
    data.append('api_key', API_KEY);
    data.append('site', SITE);
    // if (c_user) {
    //     data.append('user_token', c_user.token);
    // }

    let promise = $.Deferred();
    if (c_user) {
        $.ajax({
            type: type,
            url: API_URL + additional_url,
            data: data,
            headers: {
                'Authorization': `Bearer ${c_user.token}`
            },
            dataType: "JSON",
            processData: false,
            contentType: false,
            timeout: 120000,
            success: function (resp) {
                if (resp) {
                    if (typeof (resp) === 'object') {
                        if (resp.hasOwnProperty('response')) {
                            if (resp.response.hasOwnProperty('code')) {
                                promise.resolve(resp);
                            } else {
                                const respo = {
                                    "response": {
                                        "code": 5000,
                                        "status": "success",
                                        "message": "Something went wrong. Please try again.",
                                    }
                                };
                                promise.resolve(respo);
                            }
                        } else {
                            const respo = {
                                "response": {
                                    "code": 5000,
                                    "status": "success",
                                    "message": "Something went wrong. Please try again.",
                                }
                            };
                            promise.resolve(respo);
                        }
                    } else {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                            }
                        };
                        promise.resolve(respo);
                    }
                } else {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please refresh the page again.",
                        }
                    };
                    promise.resolve(respo);
                }
            },
            error: function (resp, textStatus) {
                if (textStatus === 'timeout') {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Connection timeout. Please try again.",
                        }
                    };
                    promise.resolve(respo);
                } else {
                    if (resp.status === 500) {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                                "originalMessage": resp.responseText,
                            }
                        };
                        promise.resolve(respo);
                    } else {
                        SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                        history.push("/error");
                    }
                }
            }
        });
    } else {
        $.ajax({
            type: type,
            url: API_URL + additional_url,
            data: data,
            dataType: "JSON",
            processData: false,
            contentType: false,
            timeout: 120000,
            success: function (resp) {
                if (resp) {
                    if (typeof (resp) === 'object') {
                        if (resp.hasOwnProperty('response')) {
                            if (resp.response.hasOwnProperty('code')) {
                                promise.resolve(resp);
                            } else {
                                const respo = {
                                    "response": {
                                        "code": 5000,
                                        "status": "success",
                                        "message": "Something went wrong. Please try again.",
                                    }
                                };
                                promise.resolve(respo);
                            }
                        } else {
                            const respo = {
                                "response": {
                                    "code": 5000,
                                    "status": "success",
                                    "message": "Something went wrong. Please try again.",
                                }
                            };
                            promise.resolve(respo);
                        }
                    } else {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                            }
                        };
                        promise.resolve(respo);
                    }
                } else {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please refresh the page again.",
                        }
                    };
                    promise.resolve(respo);
                }
            },
            error: function (resp, textStatus) {
                if (textStatus === 'timeout') {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Connection timeout. Please try again.",
                        }
                    };
                    promise.resolve(respo);
                } else {
                    if (resp.status === 500) {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                                "originalMessage": resp.responseText,
                            }
                        };
                        promise.resolve(respo);
                    } else {
                        SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                        history.push("/error");
                    }
                }
            }
        });
    }

    return promise.promise();
    // return $.ajax({
    //     type: type,
    //     url: API_URL + additional_url,
    //     data: data,
    //     dataType: "JSON",
    //     processData: false,
    //     contentType: false
    // });
}

export function AJAX_SERVICE_LOGIN_REQUEST(type = 'GET', additional_url, data) {
    let new_data = new FormData();
    new_data.append('api_key', API_KEY);
    new_data.append('site', SITE);

    let promise = $.Deferred();
    $.ajax({
        type: type,
        url: API_URL + additional_url,
        // data: data,
        data: new_data,
        headers: {
            'Authorization': `Bearer ${data.user_token}`
        },
        dataType: "JSON",
        processData: false,
        contentType: false,
        timeout: 60000,
        success: function (resp) {
            if (resp) {
                if (typeof (resp) === 'object') {
                    if (resp.hasOwnProperty('response')) {
                        if (resp.response.hasOwnProperty('code')) {
                            promise.resolve(resp);
                        } else {
                            const respo = {
                                "response": {
                                    "code": 5000,
                                    "status": "success",
                                    "message": "Something went wrong. Please try again.",
                                }
                            };
                            promise.resolve(respo);
                        }
                    } else {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                            }
                        };
                        promise.resolve(respo);
                    }
                } else {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please try again.",
                        }
                    };
                    promise.resolve(respo);
                }
            } else {
                const respo = {
                    "response": {
                        "code": 5000,
                        "status": "success",
                        "message": "Something went wrong. Please refresh the page again.",
                    }
                };
                promise.resolve(respo);
            }
        },
        error: function (resp, textStatus) {
            if (textStatus === 'timeout') {
                const respo = {
                    "response": {
                        "code": 5000,
                        "status": "success",
                        "message": "Connection timeout. Please try again.",
                    }
                };
                promise.resolve(respo);
            } else {
                if (resp.status === 500) {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please try again.",
                            "originalMessage": resp.responseText,
                        }
                    };
                    promise.resolve(respo);
                } else {
                    SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                    history.push("/error");
                }
            }
        }
    });

    return promise.promise();
}

export function AJAX_PUBLIC_REQUEST(type = 'GET', additional_url, data) {
    data.api_key = API_KEY;
    data.site = SITE;

    let promise = $.Deferred();
    $.ajax({
        type: type,
        url: API_URL + additional_url,
        data: data,
        timeout: 60000,
        success: function (resp) {
            if (resp) {
                if (typeof (resp) === 'object') {
                    if (resp.hasOwnProperty('response')) {
                        if (resp.response.hasOwnProperty('code')) {
                            promise.resolve(resp);
                        } else {
                            const respo = {
                                "response": {
                                    "code": 5000,
                                    "status": "success",
                                    "message": "Something went wrong. Please try again.",
                                }
                            };
                            promise.resolve(respo);
                        }
                    } else {
                        const respo = {
                            "response": {
                                "code": 5000,
                                "status": "success",
                                "message": "Something went wrong. Please try again.",
                            }
                        };
                        promise.resolve(respo);
                    }
                } else {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please try again.",
                        }
                    };
                    promise.resolve(respo);
                }
            } else {
                const respo = {
                    "response": {
                        "code": 5000,
                        "status": "success",
                        "message": "Something went wrong. Please refresh the page again.",
                    }
                };
                promise.resolve(respo);
            }
        },
        error: function (resp, textStatus) {
            if (textStatus === 'timeout') {
                const respo = {
                    "response": {
                        "code": 5000,
                        "status": "success",
                        "message": "Connection timeout. Please try again.",
                    }
                };
                promise.resolve(respo);
            } else {
                if (resp.status === 500) {
                    const respo = {
                        "response": {
                            "code": 5000,
                            "status": "success",
                            "message": "Something went wrong. Please try again.",
                            "originalMessage": resp.responseText,
                        }
                    };
                    promise.resolve(respo);
                } else {
                    if (USE_BOWSER) {
                        const browser = Bowser.getParser(window.navigator.userAgent);
                        if (browser.getBrowserName() === 'Safari') {
                            const curl = window.location.href;
                            window.location.href = curl;
                        } else {
                            SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                            history.push("/error");
                        }
                    } else {
                        SET_STORAGE('settings', JSON.stringify(SITEDOWN_DATA));
                        history.push("/error");
                    }
                }
            }
        }
    });
    return promise.promise();

    // return $.ajax({
    //     type: type,
    //     url: API_URL + additional_url,
    //     data: data
    // });
}

export function AJAX_ACCOUNT_KIT_REQUEST(data) {

    const token_exchange_url = 'https://graph.accountkit.com/' + data.account_kit_api_version + '/access_token?grant_type=authorization_code&code=' + data.code + '&access_token=AA|' + data.facebook_app_id + '|' + data.account_kit_app_secret;

    return $.ajax({
        type: "GET",
        url: token_exchange_url,
        data: {}
    }).then(results => {
        const user_id = results.id;
        const user_access_token = results.access_token;
        const refresh_interval = results.token_refresh_interval_sec;

        const me_endpoint_url = 'https://graph.accountkit.com/' + data.account_kit_api_version + '/me?access_token=' + user_access_token;
        return $.ajax({
            type: "GET",
            url: me_endpoint_url,
            data: {}
        });
    });

}
