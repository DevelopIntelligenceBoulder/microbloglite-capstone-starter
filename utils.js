'use strict';

// NAV BAR STUFF
document.addEventListener('DOMContentLoaded', async (ev) => {
    const loginData = getLoginData();
    const user = loginData?.token ? await getUserByUsername(loginData.username) : null;
    const userNavBtn = document.querySelector("#nav-username");
    userNavBtn.textContent = user?.fullName || 'User'
})

// ACTUAL UTILS

const apiUrl = slashJoin(apiBaseURL, 'api');

function getQueryParams() {
    const qStr = new URLSearchParams(window.location.search);
    return Object.fromEntries(qStr.entries());
}

async function likePost(post) {
    return postJSON(slashJoin(apiUrl, `likes`), {postId: post._id});
}

async function removeLike(like) {
    return deleteJSON(slashJoin(apiUrl, `likes`, like._id));
}

async function createPost(text) {
    return postJSON(slashJoin(apiUrl, `posts`), {text});
}

async function getPosts(username) {
    let qStr = !!username ? `?username=${username}` : '';
    return getJSON(slashJoin(apiUrl, `posts${qStr}`));
}

async function deletePost(postId) {
    return deleteJSON(slashJoin(apiUrl, `posts`, postId));
}

async function getPostById(postId) {
    return getJSON(slashJoin(apiUrl, `posts`, postId));
}

async function getUserByUsername(username) {
    return getJSON(slashJoin(apiUrl, 'users', username));
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

async function deleteJSON(url) {
    const response = await authRequest(url, {
        method: 'DELETE'
    });
    return await response.json();
}

async function request(url, options={}) {
    const response = await fetch(url, options);
    if (!response.ok) {a
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
        logout();
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
async function updateUserProfile(username, profile) {
    try {
        const response = await putJSON(slashJoin(apiUrl, 'users', username), profile);
        return response;
    } catch (err) {
        console.error('Failed to update profile', err);
        throw new Error('Failed to update profile');
    }
}
