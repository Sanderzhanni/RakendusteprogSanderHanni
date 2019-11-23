const basePath = "/api/v1";

export const getItems = () =>{
    return fetch(`${basePath}/items`)
        .then(res => {
            if(!res.ok) return throw "GetItems failed";
            return res.json();
        });
};

export const getItem = ({itemId}) =>{
    return fetch(`${basePath}/items/${itemId}`)
        .then(res => {
            if(!res.ok) return throw "GetItem failed";
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
            if(!res.ok) return throw "GetUser failed";
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
            if(!res.ok) return throw "addItemToCart failed";
            return res.json();
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
            if(!res.ok) return throw "removeItemFromCart failed";
            return res.json();
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
            if(!res.ok) return throw "login failed";
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
            if(!res.ok) return throw "signup failed";
            return res.json();
        });
};

