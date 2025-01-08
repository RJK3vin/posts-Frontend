import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post{
    id : number;
    post: string;
    username: string;
    tags: string[]
    comments: Comments[]
}

interface Users{
    id : number;
    username : string;
}

interface Comments{
    id : number;
    content : string;
    username : string;
}

interface PostState {
    posts: Post[]
    authToken: string | null
    authUser: string | null
    userList: Users[]
}

const initialState: PostState = {
    posts: [],
    authToken: null,
    authUser: null,
    userList: [],
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts(state, action)  {
            state.posts = action.payload
        },
        setAuthToken(state, action: PayloadAction<string | null>) {
            state.authToken = action.payload
        },
        setAuthUser(state, action: PayloadAction<string | null>) {
            state.authUser = action.payload
        },
        setUserList(state, action: PayloadAction<Users[]>) {
            state.userList = action.payload
        },
    }
})

export const { setPosts, setAuthToken, setAuthUser, setUserList} = postSlice.actions;
export default postSlice.reducer;