import { API_BASE_URL } from "../config/api-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    console.log("ApiService --- called");
    let headers = new Headers({
        "Content-Type": "application/json",
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    console.log("options", options);
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
                    return Promise.reject(json);
                }
            return json;
            })
        )
        .catch((error) => {
           console.log(error.status);
            if (error.status === 403) { // Forbidden
                //window.location.href = "/login"; // redirect
                console.log(error.status === 403);
            }
           return Promise.reject(error);
        });
}

export function signin(userDto) {
    return call("/auth/signin", "POST", userDto)
        .then((response) => {
            if(response.token) {
                localStorage.setItem(ACCESS_TOKEN, response.token);
                window.location.href= "/";
            }
        });
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href= "/login";
}

export function signup(userDto) {
    return call("/auth/signup", "POST", userDto);
}