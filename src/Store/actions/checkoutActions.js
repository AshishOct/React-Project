import { API_URL, API_KEY, AJAX_REQUEST } from '../../Constants/AppConstants';

export function checkoutRequest(cartData) {
    return dispatch => {
        const request_result = AJAX_REQUEST("POST","order/create", cartData);
        request_result.then(results => {
            if(results.response.code===1000) {
                return results.response.data;
            } else {
                // console.log(results);
            }            
        });
        return request_result;
    }
}