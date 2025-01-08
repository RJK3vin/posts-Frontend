import { Link } from "react-router-dom"
import { RootState } from "./store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "./api"
import { setPosts } from "./postSlice"

export default function Tags() {
    const posts = useSelector((state : RootState) => state.post.posts)
    const user = useSelector((state : RootState) => state.post.authUser)
    const token = useSelector((state: RootState) => state.post.authToken);
    const dispatch = useDispatch();

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

    return (
        <>
            <h1>Posts your tagged in</h1>
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                    user && post.tags.includes(user) && (
                    <div>
                        <p key={post.id}>{post.post} - posted by: {post.username}</p>
                        {post.tags.length > 0 && (
                        <p>Tags: 
                            {post.tags.map((tag, index) => (
                            <span key={index}>
                                @{tag}
                                {index < post.tags.length - 1 ? ", " : ""}
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