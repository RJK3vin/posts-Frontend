import { Link } from "react-router-dom"
import { RootState } from "./store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "./api"
import { setPosts } from "./postSlice"
import './App.css'

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
        <div className="container">
            <h1>Posts You're Tagged In</h1>
            <div className="posts">
                {posts && posts.length > 0 ? (
                    posts.some((post) => user && post.tags.includes(user)) ? (
                        posts.map((post) => user && post.tags.includes(user) && (
                            <div className="post" key={post.id}>
                                <img src={post.post} alt="Tagged Post" style={{ width: "100px", height: "100px" }}/>
                                <Link to="/post" state={{ post }}>
                                    <p>{post.caption} - posted by: {post.username}</p>
                                </Link>
                            </div>
                        )
                    )
                ) : (
                    <p>No posts found where you're tagged.</p>
                )
            ) : (
                <p>Loading posts you're tagged in...</p>
            )}
            </div>
            <Link to="/home">
                <button>Back to Home Page</button>
            </Link>
        </div>
        </>
    )
}