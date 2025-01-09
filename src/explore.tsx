import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { useEffect } from "react";
import { fetchPosts, createComment } from "./api";
import { setPosts } from "./postSlice";
import { useState } from "react";

export default function Explore() {
    const posts = useSelector((state : RootState) => state.post.posts)
    const token = useSelector((state: RootState) => state.post.authToken);
    const dispatch = useDispatch();
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                if (token) {
                    const data = await fetchPosts(token)
                    dispatch(setPosts(data))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPictures();
    }, [dispatch, token]);
    console.log(posts)

    return (
        <>
        <h1>Explore page</h1>
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <>
                        <p key={post.id}>{post.post} - posted by: {post.username}</p>
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
                    </>
                ))
            ) : (
                <p>Loading posts...</p>
            )}
        </div>
        <Link to ="/home">
            <button>Back to home page</button>
        </Link>
        <Link to ="/post">
            
        </Link>
        </>
    )
}