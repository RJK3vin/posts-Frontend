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

export const createPost = async (comment: string, token: string) => {
    try {
        const response = await axios.post(BASE_URL1, { comment }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data
    } catch (error) {
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
            throw new Error("Failed to create account.");
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
