import axios from 'axios'

const BASE_URL1 =  "http://127.0.0.1:8000/posts/";

export const fetchPosts = async (token: string) => {
    try {
        const response = await axios.get(BASE_URL1, {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createPost = async (comment: string, token: string) => {
    try {
        const response = await axios.post(BASE_URL1, { comment }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
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
