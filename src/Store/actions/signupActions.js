import CryptoJS from 'crypto-js';

import { AJAX_REQUEST_WITH_FILE, AJAX_SERVICE_LOGIN_REQUEST, AJAX_PUBLIC_REQUEST, SET_STORAGE, USER, GET_STORAGE, ENCRYPT_SECRET_KEY, SET_LOGIN_COOKIE } from '../../Constants/AppConstants';

import { SET_CURRENT_USER } from './actionTypes';

const config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function userSignupRequest(userData) {
    return dispatch => {
        const request_result = AJAX_PUBLIC_REQUEST("POST","user/registration",userData);
        request_result.then(results => {
            if(results.response.code===1000) {
                const user_data = results.response.data;
                user_data.remember = false;
                if(userData.remember === 'checked'){
                    // user_data.user_login = window.btoa(CryptoJS.AES.encrypt(userData.user_login, ENCRYPT_SECRET_KEY));
                    // user_data.password = window.btoa(CryptoJS.AES.encrypt(userData.password, ENCRYPT_SECRET_KEY));
                    user_data.remember = true;
                }

                SET_STORAGE(USER,JSON.stringify(user_data));
                SET_LOGIN_COOKIE(JSON.stringify(user_data));
                // setAuthorizationToken(results.response.data.token);
                const cur_storage2 = GET_STORAGE(USER);
                const cur_storage = JSON.parse(cur_storage2);
                dispatch(setCurrentUser(cur_storage));

                // Decrypt
                // console.log(cur_storage);
                // const bytes  = CryptoJS.AES.decrypt(window.atob(cur_storage.password).toString(), ENCRYPT_SECRET_KEY);
                // const plaintext = bytes.toString(CryptoJS.enc.Utf8);
                // console.log(plaintext);
            } else {
                // console.log(results);
                // history.push('/');
            }            
        });
        return request_result;
    }
}

// export function userTokenValidation(userData) {
//     console.log("action",userData);
//     return dispatch => {
//         SET_STORAGE(USER,JSON.stringify(userData));
//         // setAuthorizationToken(results.response.data.token);
//         const cur_storage2 = GET_STORAGE(USER);
//         const cur_storage = JSON.parse(cur_storage2);
//         console.log("dispatch",cur_storage);
//         dispatch(setCurrentUser(cur_storage));
//         console.log("dispatched");
//         // return request_result;
//     }
// }



export function serviceLoginRequest(userData) {
    return dispatch => {
        const request_result = AJAX_SERVICE_LOGIN_REQUEST("POST","user/details",userData);
        request_result.then(results => {
            if(results.response.code===1000) {
                const user_data = results.response.data;
                user_data.remember = false;
                if(userData.remember === 'checked'){
                    // user_data.user_login = window.btoa(CryptoJS.AES.encrypt(userData.user_login, ENCRYPT_SECRET_KEY));
                    // user_data.password = window.btoa(CryptoJS.AES.encrypt(userData.password, ENCRYPT_SECRET_KEY));
                    user_data.remember = true;
                }
                SET_STORAGE(USER,JSON.stringify(user_data));
                SET_LOGIN_COOKIE(JSON.stringify(user_data));
                const cur_storage2 = GET_STORAGE(USER);
                const cur_storage = JSON.parse(cur_storage2);
                dispatch(setCurrentUser(cur_storage));
            }           
        });
        return request_result;
    }
}

export function alertMessageRemoval() {
    return dispatch => {
        const cur_storage2 = GET_STORAGE(USER);
        const cur_storage = JSON.parse(cur_storage2);
        dispatch(setCurrentUser(cur_storage));
    }
}