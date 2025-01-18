import axios from 'axios'

const BASE_URL1 =  "http://127.0.0.1:8000/posts/";

export const fetchPosts = async (token: string) => {
    try {
        const response = await axios.get(BASE_URL1, {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createPost = async (post: string, caption: string, tags: string[], token: string) => {
    try {
        const response = await axios.post(BASE_URL1, { post, caption, tags }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data
    } catch (error) {
        alert("Couldn't create post")
        console.error(error)
        throw error
    }
}

export const logIn = async (username : string, password : string) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/token-auth/", {
            username,
            password,
        })
        return {
            token: response.data.token,
            username,
        }
    } catch (error) {
        alert("Try again")
        console.error(error)
        throw error
    }
}

export const createAccount = async(username : string, password : string) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/users/create/", {
            username,
            password,
        })
        if (response.status === 201) {
            console.log("Account successfully created.");
        } else {
            alert("Failed to create account")
        }
    } catch (error) {
        alert("Failed to create account")
        console.error(error)
        throw error
    }
}

export const fetchUsers = async (token : string) => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/users/", {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createComment = async(id: number, token : string, comment : string) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/posts/${id}/comments/create/`,{ comment }, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
