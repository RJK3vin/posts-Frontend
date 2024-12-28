import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { useEffect } from "react";
import { fetchPosts } from "./api";
import { setComments } from "./postSlice";

export default function Explore() {
    const comments = useSelector((state : RootState) => state.post.comments)
    const token = useSelector((state: RootState) => state.post.authToken);
    const dispatch = useDispatch();

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

    return (
        <>
        <h1>Explore page</h1>
        <div>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <>
                        <p key={comment.id}>{comment.comment} - posted by: {comment.username}</p>
                        {comment.tags.length > 0 && (
                                <p>Tags:  
                                    {comment.tags.map((tag, index) => {
                                        if (index < comment.tags.length - 1) {
                                            return (
                                                <span> @{tag}, </span>
                                            )
                                        } else {
                                            return <span> @{tag}</span>
                                        }
                                    })}
                                </p>
                        )}
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