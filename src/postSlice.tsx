import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment{
    id : number;
    comment: string;
    username: string;
    tags: string[]
}

interface PostState {
    comments: Comment[]
    authToken: string | null
    authUser: string | null
}

const initialState: PostState = {
    comments: [],
    authToken: null,
    authUser: null
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
        }
    }
})

export const { setComments, setAuthToken, setAuthUser } = postSlice.actions;
export default postSlice.reducer;