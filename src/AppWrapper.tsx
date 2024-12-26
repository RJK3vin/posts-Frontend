import React, { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { fetchPosts } from "./api";
import { setComments } from "./postSlice";

const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {    
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.post.authToken);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                if (token) {
                    const data = await fetchPosts(token)
                    dispatch(setComments(data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchComments();
    }, [dispatch, token]);

    return <>{children}</>;
}
export default AppWrapper;
