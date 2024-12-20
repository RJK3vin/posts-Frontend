import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { fetchPosts } from "./api";
import { setComments } from "./postSlice";
import { useEffect } from "react";

export default function Explore() {
    const dispatch = useDispatch()
    const comments = useSelector((state : RootState) => state.post.comments)
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await fetchPosts()
                dispatch(setComments(data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchComments()
    }, [dispatch])
    return (
        <>
        <h1>Explore page</h1>
        <div>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                <p key={index}>{comment.comment}</p>
                ))
            ) : (
                <p>Loading comments...</p>
            )}
        </div>
        <Link to ="/home">
            <button>Back to home page</button>
        </Link>
        </>
    )
    
}