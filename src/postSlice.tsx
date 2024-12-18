import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostState {
    comments: string[];
}

const initialState: PostState = {
    comments: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setComments(state, action: PayloadAction<string>)  {
            state.comments.push(action.payload);
        },
    }
})

export const { setComments } = postSlice.actions;
export default postSlice.reducer;