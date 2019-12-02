const basePath = "/api/v1";

export const getItems = () =>{
    return fetch(`${basePath}/items`)
        .then(res => {
            if(!res.ok) throw "GetItems failed";
            return res.json();
        });
};

export const getItem = ({itemId}) =>{
    return fetch(`${basePath}/items/${itemId}`)
        .then(res => {
            if(!res.ok) throw "GetItem failed";
            return res.json();
        });
};

export const getUser = ({userId, token}) =>{
    return fetch(`${basePath}/users/${userId}`, {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => {
            if(!res.ok) throw "GetUser failed";
            return res.json();
        });
};

export const addItemToCart = ({userId, itemId, token}) =>{
    return fetch(`${basePath}/users/${userId}/cart/${itemId}`, {
        method: "PUT",
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => {
            if(!res.ok) throw "addItemToCart failed";
            return true;
        });
};

export const addItemToLiked = ({userId, itemId, token}) =>{
    return fetch(`${basePath}/users/${userId}/liked/${itemId}`, {
        method: "PUT",
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => {
            if(!res.ok) throw "addItemToLiked failed";
            return true;
        });
};

export const removeItemFromCart = ({userId, itemId, token}) =>{
    return fetch(`${basePath}/users/${userId}/cart/${itemId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => {
            if(!res.ok) throw "removeItemFromCart failed";
            return true;
        });
};

export const removeItemFromLiked = ({userId, itemId, token}) =>{
    return fetch(`${basePath}/users/${userId}/liked/${itemId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => {
            if(!res.ok) throw "removeItemFromLiked failed";
            return true;
        });
};

export const login = ({password, email}) =>{
    return fetch(`${basePath}/auth/login`, {
        method: "POST",
        headers:{
            "Content-type": "Application/json"
        },
        body: JSON.stringify({password, email})
    })
        .then(res => {
            if(!res.ok) throw "login failed";
            return res.json();
        });
};

export const signup = ({password, email}) =>{
    return fetch(`${basePath}/auth/signup`, {
        method: "POST",
        headers:{
            "Content-type": "Application/json"
        },
        body: JSON.stringify({password, email})
    })
        .then(res => {
            if(!res.ok) throw "signup failed";
            return res.json();
        });
};

export const checkout = ({stripeToken, userId, token}) =>{
    return fetch(`${basePath}/users/${userId}/checkout`, {
        method: "POST",
        headers:{
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(stripeToken)
    })
        .then(res => {
            if(!res.ok) throw "checkout failed";
        });
};

export const getPayments = ({userId, token}) =>{
    return fetch(`${basePath}/users/${userId}/payments`, {
        method: "GET",
        headers:{
            "Authorization": `Bearer ${token}`
        },
    })
        .then(res => {
            if(!res.ok) throw "getPayments failed";
            return res.json();
        });
};

