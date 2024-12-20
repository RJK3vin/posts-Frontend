import { createSlice } from '@reduxjs/toolkit';

interface Comment{
    comment: string;
}

interface PostState {
    comments: Comment[]
}

const initialState: PostState = {
    comments: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setComments(state, action)  {
            state.comments = action.payload
        },
    }
})

export const { setComments } = postSlice.actions;
export default postSlice.reducer;