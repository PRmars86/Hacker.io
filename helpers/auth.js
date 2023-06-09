import cookie from 'js-cookie'
import Router from 'next/router'
//set in cookie
export const setCookie = (key, value) => {
    if (typeof window) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

//remove from cookie
export const removeCookie = key => {
    if (typeof window) {
        cookie.remove(key)
    }
}

//get cookie as stored tokens
export const getCookie = key => {
    // if (typeof window) {
    //     return cookie.get(key);
    // }
    return typeof window ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
}

export const getCookieFromBrowser = key => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    //console.log('req.headers.cookie', req.headers.cookie);
    let token = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!token) {
        return undefined;
    }
    let tokenValue = token.split('=')[1];
    //console.log('getCookieFromServer', tokenValue);
    return tokenValue;
};

//set in localstorage
export const setLocalStorage = (key, value) => {
    if (typeof window) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localstorage
export const removeLocalStorage = key => {
    if (typeof window) {
        localStorage.removeItem(key)
    }
}

//authenticate user by passing data to cookie and localstorage
export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}

export const isAuth = () => {
    if (typeof window) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
};

export const logout = () => {
    removeCookie('token');
    removeLocalStorage('user');

    Router.push('/login');
};

export const updateUser = (user, next) => {
    if (typeof window) {
        if (localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));
            auth = user;
            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
};