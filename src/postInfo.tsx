import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { Post } from "./postSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from './store';
import { fetchPosts, createComment } from "./api";
import { setPosts } from "./postSlice";

export default function PostInfo() {
    const location = useLocation()
    const post = location.state?.post as Post
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.post.authToken);
    const dispatch = useDispatch();

    const postComment = async (id: number,comment: string) => {
        try {
            if (token) {
                await createComment(id, token, comment)
                const data = await fetchPosts(token)
                dispatch(setPosts(data))
                setSuccessMessage("Comment sucessfully created")
                setText("")
            }
        } catch (error) {
            setError("Failed to create comment, try again")
            console.log(error)
        }

    }

    console.log(post)
    return (
        <>
        <h1>Post info</h1>
        <p>{post.post} - posted by {post.username}</p>
            {post.tags.length > 0 && (
                <p>Tags:  
                    {post.tags.map((tag, index) => {
                    if (index < post.tags.length - 1) {
                        return (
                            <span> @{tag}, </span>
                        )
                        } else {
                            return <span> @{tag}</span>
                        }
                    })}
                </p>
            )}
            {post.comments.length > 0 && (
                <p>Comments:
                    {post.comments.map((comment) => {
                        return (<span key={comment.id}> {comment.comment} - commented by: {comment.username}</span>)
                    })}
                </p>
            )}
        <input placeholder="Type comment" value={text} onChange={(event) => {setText(event.target.value)}}></input>
        <button onClick={() => postComment(post.id, text)}>Post Comment</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <br></br>
        <br></br>
        <Link to="/explore">
            <button>Back to explore page</button>
        </Link>
        </> 
    )
}