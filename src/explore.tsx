import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './store';
import { useEffect } from "react";
import { fetchPosts } from "./api";
import { setPosts } from "./postSlice";
import './App.css'

export default function Explore() {
    const posts = useSelector((state : RootState) => state.post.posts)
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
    console.log(posts)

    return (
        <>
        <div className="container">
            <h1>Explore Page</h1>
            <div className="posts">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <img src={post.post} alt="Post" style={{ width: "100px", height: "100px" }}/>
                            <Link to="/post" state={{ post }}>
                                <p> {post.caption} - posted by: {post.username}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Loading posts...</p>
                )}
            </div>
            <Link to="/home">
            <button>Back to Home Page</button>
            </Link>
        </div>
        </>
    )
}