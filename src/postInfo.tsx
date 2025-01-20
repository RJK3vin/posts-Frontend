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
        <div className="container">
            <h1>Post Info</h1>
            <div className="post">
                <img src={post.post} alt="Post" style={{ width: "100px", height: "100px" }}/>
                <p>{updatedPost.caption} - posted by {updatedPost.username}</p>
            </div>
            {updatedPost.tags.length > 0 && (
            <div>
                <p>Tags:</p>
                <div className="tags-container">
                    {updatedPost.tags.map((tag, index) => (
                        <span className="tag" key={index}>@{tag}
                        {index < updatedPost.tags.length - 1 && ", "}
                        </span>
                    ))}
                </div>
            </div>
            )}
            {updatedPost.comments.length > 0 && (
            <div>
                <p>Comments:</p>
                {updatedPost.comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.comment} - commented by: {comment.username}</p>
                </div>
                ))}
            </div>
            )}
            <input className="input" placeholder="Type comment" value={text} onChange={(event) => setText(event.target.value)}/>
            <button onClick={() => postComment(post.id, text)}>Post Comment</button>
            {error && <p className="error">{error}</p>}
            <Link to="/explore">
                <button>Back to Explore Page</button>
            </Link>
            <Link to="/tag">
                <button>Back to Posts You're Tagged In</button>
            </Link>
            <Toast message="Comment successfully created!" show={showToast} />
      </div>
        </> 
    )
}