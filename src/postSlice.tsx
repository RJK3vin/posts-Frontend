import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment{
    id : number;
    comment: string;
    username: string;
    tags: string[]
}

interface Users{
    id : number;
    username : string;
}

interface PostState {
    comments: Comment[]
    authToken: string | null
    authUser: string | null
    userList: Users[]
}

const initialState: PostState = {
    comments: [],
    authToken: null,
    authUser: null,
    userList: [],
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setComments(state, action)  {
            state.comments = action.payload
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

export const { setComments, setAuthToken, setAuthUser, setUserList} = postSlice.actions;
export default postSlice.reducer;