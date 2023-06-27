'use strict';

function getQueryParams() {
    const qStr = new URLSearchParams(window.location.search);
    return Object.fromEntries(qStr.entries());
}

async function createPost(text) {
    return postJSON(slashJoin(apiBaseURL, `api/posts`), {text});
}

async function getPosts(username) {
    let qStr = !!username ? `?username=${username}` : '';
    return getJSON(slashJoin(apiBaseURL, `api/posts${qStr}`));
}

async function getUserByUsername(username) {
    return getJSON(slashJoin(apiBaseURL, 'api/users', username));
}

async function getJSON(url) {
    const response = await authRequest(url)
    return await response.json();
}

async function postJSON(url, object) {
    const response = await authRequest(url, {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(object)
    });
    return await response.json();
}

async function putJSON(url, object) {
    const response = await authRequest(url, {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(object)
    });
    return await response.json();
}

async function request(url, options={}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorDetails = await response.json();
        throw errorDetails;
    }
    return response;
}

async function authRequest(url, options={}) {
    const loginData = getLoginData();
    if (!loginData?.token) {
        console.log("Unauthenticated. Sending normal request.");
        return request(url, options);
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${loginData.token}`,
            ...options?.headers || {}
        },
    });

    if (response.status == 401) {
        // Handle expired tokens
        console.log("Expired token. Logging out.");
        // logout();
        return;
    }

    if (!response.ok) {
        const errorDetails = await response.json();
        throw errorDetails;
    }
    return response;
}

function slashJoin(...strs) {
    return strs.join('/');
}