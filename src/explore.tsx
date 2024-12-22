import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { fetchPosts } from "./api";
import { setComments } from "./postSlice";
import { useEffect } from "react";

export default function Explore() {
    const dispatch = useDispatch()
    const comments = useSelector((state : RootState) => state.post.comments)
    const token = useSelector((state : RootState) => state.post.authToken)

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
        fetchComments()
    }, [dispatch, token])
    return (
        <>
        <h1>Explore page</h1>
        <div>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <>
                        <p key={index}>{comment.comment} Posted by {comment.username}</p>
                    </>
                
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