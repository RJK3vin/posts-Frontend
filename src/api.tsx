import axios from 'axios'

const BASE_URL1 =  "http://127.0.0.1:8000/posts/";

export const fetchPosts = async () => {
    try {
        const response = await axios.get(BASE_URL1)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createPost = async (comment: string) => {
    try {
        const response = await axios.post(BASE_URL1, { comment })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
