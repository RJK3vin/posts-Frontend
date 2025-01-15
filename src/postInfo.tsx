import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { Post } from "./postSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from './store';
import { fetchPosts, createComment } from "./api";
import { setPosts } from "./postSlice";
import { useEffect } from "react";
import Toast from "./toast";
import './App.css'

export default function PostInfo() {
    const location = useLocation()
    const post = location.state?.post as Post
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.post.authToken);
    const posts = useSelector((state: RootState) => state.post.posts); 
    const dispatch = useDispatch();
    const updatedPost = posts.find((p) => p.id === post.id) || post;
    const [showToast, setShowToast] = useState(false);

    const postComment = async (id: number,comment: string) => {
        try {
            if (token) {
                await createComment(id, token, comment)
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setText("")
            }
        } catch (error) {
            setError("Failed to create comment, try again")
            console.log(error)
        }
    }

    useEffect(() => {
        const refetchPosts = async () => {
            try {
                if (token) {
                    const data = await fetchPosts(token)
                    dispatch(setPosts(data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (showToast) {
            refetchPosts()
        }
    }, [showToast, dispatch, token]);

    return (
        <>
        <h1>Post info</h1>
        <p>{updatedPost.post} - posted by {updatedPost.username}</p>
            {updatedPost.tags.length > 0 && (
                <p>Tags:  
                    {updatedPost.tags.map((tag, index) => {
                    if (index < updatedPost.tags.length - 1) {
                        return (
                            <span> @{tag}, </span>
                        )
                        } else {
                            return <span> @{tag}</span>
                        }
                    })}
                </p>
            )}
            {updatedPost.comments.length > 0 && (
                <p>Comments:
                    <br></br>
                    <br></br>
                    {updatedPost.comments.map((comment) => {
                        return (<>
                            <span key={comment.id}> {comment.comment} - commented by: {comment.username}</span>
                            <br></br>
                            <br></br>
                        </>)
                    })}
                </p>
            )}
        <input placeholder="Type comment" value={text} onChange={(event) => {setText(event.target.value)}}></input>
        <button onClick={() => postComment(post.id, text)}>Post Comment</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br></br>
        <br></br>
        <Link to="/explore">
            <button>Back to explore page</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/tag">
                <button>Back to posts your tagged in</button>
        </Link>
        <Toast message = "Comment successfully created!" show={showToast}/>
        </> 
    )
}