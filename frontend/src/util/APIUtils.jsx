import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';
import '../css/Main.css';
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function signIn(signInRequest) {

    return new Promise((resolve, reject) => {
        request({
            url: API_BASE_URL + "/signIn",
            method: 'POST',
            body: JSON.stringify(signInRequest)
        })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });

}
export function signUp(signupRequest) {
    return request({
        url: API_BASE_URL + "/signUp",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function createQna(formData) {
    return fetch(API_BASE_URL + "/api/board", {
        method: 'POST',
        body: formData,
        // headers를 설정하지 않습니다. FormData를 사용할 때는 브라우저가 자동으로 설정합니다.
    }).then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        return response.json();
    });
}



// 게시글 리스트 조회
export function readQna(keyword, viewNum, pageNum, boardNum) {
    const queryParams = new URLSearchParams({
        keyword: keyword,
        sortBy: viewNum,
        page: pageNum,
        size: boardNum,
    });

    const url = `${API_BASE_URL}/api/board?${queryParams.toString()}`;

    return request({
        url: url,
        method: 'GET'
    });
}

// 게시글 내용 조회
export function getQnaRead(id) {

    const url = `${API_BASE_URL}/api/board/${id}`;

    return request({
        url: url,
        method: 'GET'
    });
}

// 게시글 내용 삭제
export function deleteQna(id){

    const url = `${API_BASE_URL}/api/board/${id}`;

    return request({
        url: url,
        method: `DELETE`
    })
}

export function currentUser(){
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    })
}