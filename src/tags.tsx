import { Link } from "react-router-dom"
import { RootState } from "./store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "./api"
import { setComments } from "./postSlice"

export default function Tags() {
    const comments = useSelector((state : RootState) => state.post.comments)
    const user = useSelector((state : RootState) => state.post.authUser)
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
            <h1>Posts your tagged in</h1>
            <div>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                    user && comment.tags.includes(user) && (
                    <div>
                        <p key={comment.id}>{comment.comment} - posted by: {comment.username}</p>
                        {comment.tags.length > 0 && (
                        <p>Tags: 
                            {comment.tags.map((tag, index) => (
                            <span key={index}>
                                @{tag}
                                {index < comment.tags.length - 1 ? ", " : ""}
                            </span>
                            ))}
                        </p>
                        )}
                    </div>
            )
          ))
        ) : (
          <p>Loading posts you're tagged in...</p>
        )}
      </div>
            <Link to ='/home'>
                <button>Back to home page</button>
            </Link>
        </>
    )
}